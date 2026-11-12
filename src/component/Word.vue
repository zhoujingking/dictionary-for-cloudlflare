<template>
  <div>
    <a class="word" :href="`https://www.oxfordlearnersdictionaries.com/definition/english/${data.word}`" target="_blank">{{ data.word }}</a>
    <!-- <div class="phone">/ {{ data.usphone }} /</div> -->
    <!-- <div class="trans">/ {{ data.trans }} /</div> -->
  </div>
</template>

<script setup>
const props = defineProps(['data']);


</script>

<style lang="css" scoped>
.word {
  text-decoration: none;
}
.phone {
  margin: 0 12px;
}
</style>