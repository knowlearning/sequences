<template>
  <h1>Player</h1>
  <ul>
    <li v-for="id in tasks">
      <content :id="id" />
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      tasks: Array
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>
</style>
