<script setup lang="ts">
  const model = defineModel<string>({default: ''});
  const emit = defineEmits<{search: [value: string]}>();

  const search = () => {
    emit('search', model.value);
  }
</script>

<template>
  <input
  v-model="model"
  placeholder="search certificate number"
  @keyup.enter="search"/>

  <button @click="search">Search</button>
</template>

<style scoped>

</style>