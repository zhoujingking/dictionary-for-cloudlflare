<script setup>
import { computed, onMounted, ref } from 'vue';
import { getWordList } from './rest';
import Word from './component/Word.vue'
import WordCard from './component/WordCard.vue'
import { FORGOTTEN_WORDS, MARK_WORDS } from './constants';

const originalWordList = ref([])
const interWordList = ref([])
const searchText = ref('')

const finalWordList = computed(() => {
  if (!searchText.value) {
    return interWordList.value;
  }
  return interWordList.value.filter(item => {
    const reg = new RegExp(searchText.value, 'ig');
    return reg.test(item.word) || reg.test(item.trans)
  })
})

const onReset = () => {
  searchText.value = ''
  interWordList.value = originalWordList.value;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // 生成一个 0 到 i 之间的随机索引
    const j = Math.floor(Math.random() * (i + 1));

    // 交换元素
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const onShuffle = () => {
  interWordList.value = shuffleArray([...originalWordList.value])
}

const onSort = () => {
  interWordList.value = [...originalWordList.value].sort((a, b) => a.word > b.word ? 1 : -1);
}

const onMark = () => {
  const jsonStr = localStorage.getItem(MARK_WORDS) || '{}';
  const markedWordDict = JSON.parse(jsonStr);
  interWordList.value = Object.keys(markedWordDict).map(wordId => {
    return originalWordList.value.find(word => word.itemId === wordId);
  })
  
}

const onForgotten = () => {
  const jsonStr = localStorage.getItem(FORGOTTEN_WORDS) || '{}';
  const forgottenWordDict = JSON.parse(jsonStr);
  interWordList.value = Object.keys(forgottenWordDict).map(wordId => {
    return originalWordList.value.find(word => word.itemId === wordId);
  })
}

const isCardMode = ref(false)
const onModeSwitch = () => {
  isCardMode.value = !isCardMode.value
}

const currIndex = ref(0)
const onPre = () => {
  currIndex.value = (currIndex.value - 1) % originalWordList.value.length
  if (currIndex.value < 0) {
    currIndex.value = 0
  }
}

const onNext = () => {
  currIndex.value = (currIndex.value + 1) % originalWordList.value.length
}

const currentWord = computed(() => {
  return originalWordList.value[currIndex.value]
})

onMounted(() => {
  getWordList().then(list => {
    originalWordList.value = list;
    interWordList.value = list;
  })
})

</script>

<template>
  <div class="filter">
    <template v-if="!isCardMode">
      <input type="text" v-model="searchText">
      <button @click="onReset">reset</button>
      <button @click="onShuffle">shuffle</button>
      <button @click="onSort">asc</button>
      <button @click="onMark">mark</button>
      <button @click="onForgotten">lost</button>
    </template>
    <button @click="onModeSwitch">switch</button>
  </div>
  <div class="word-container" v-if="!isCardMode">
    <Word v-for="(word, index) in finalWordList" :key="index" :data="word"></Word>
  </div>

  <div class="card-contaner" v-else>
    <WordCard :key="currentWord.itemId" :data="currentWord" />
    <button class="pre-btn" @click="onPre">pre</button>
    <button class="next-btn" @click="onNext">next</button>
  </div>


</template>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: sticky;
  top: 0;
  margin-bottom: 16px;
}

.word-container {
  display: grid;
  grid-template-columns: repeat(8, 12%);
  row-gap: 16px;
}

.card-container {
  position: relative;
}

.pre-btn {
  position: absolute;
  bottom: 10vh;
  left: 20px;
}

.next-btn {
  position: absolute;
  bottom: 10vh;
  right: 20px;
}

@media print {
  .filter {
    display: none;
  }
}

@media screen and (min-width: 0px) and (max-width: 600px) {
  .word-container {
    font-size: 22px;
    grid-template-columns: repeat(2, 50%);
  }
}

@media screen and (min-width: 600px) and (max-width: 1000px) {
  .word-container {
    font-size: 22px;
    grid-template-columns: repeat(4, 25%);
  }
}
</style>
