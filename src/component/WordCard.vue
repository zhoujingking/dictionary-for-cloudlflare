<template>
  <div class="word-card">
    <div class="content" @click="onTransClick">
      <h1>{{ data.word }}</h1>
      <div v-if="showTrans">{{ data.trans }}</div>
    </div>
    <div class="footer">
      <button :class="{ marked: markedWordDic[data.itemId] }" @click="onMarkClick">Mark</button>
      <button @click="onNotRememberClick">Not Remember</button>
    </div>
  </div>
</template>

<script setup>
import { FORGOTTEN_WORDS, MARK_WORDS } from '@/constants';
import { onMounted, ref } from 'vue'
const props = defineProps(['data'])
const showTrans = ref(false)
const markedWordDic = ref({})
const onTransClick = () => {
  showTrans.value = !showTrans.value
}

const onMarkClick = () => {
  if (markedWordDic.value[props.data.itemId]) {
    markedWordDic.value[props.data.itemId] = undefined
  } else {
    markedWordDic.value[props.data.itemId] = true
  }
  localStorage.setItem(MARK_WORDS, JSON.stringify(markedWordDic.value));
}

const onNotRememberClick = () => {
  const jsonStr = localStorage.getItem(FORGOTTEN_WORDS) || '{}';
  const forgottenWordDict = JSON.parse(jsonStr);
  forgottenWordDict[props.data.itemId] = true;
  localStorage.setItem(FORGOTTEN_WORDS, JSON.stringify(forgottenWordDict));
  onTransClick();
}

onMounted(() => {
  const jsonStr = localStorage.getItem(MARK_WORDS) || '{}';
  markedWordDic.value = JSON.parse(jsonStr);
})

</script>

<style scoped>
.word-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  padding: 20px;
  border: solid 1px grey;
  border-radius: 8px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
}

.marked {
  background-color: #ede60c;
}
</style>
