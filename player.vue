<template>
  <div class="parent-wrapper">
    <div class="header">
      <span
        v-for="_, i in tasks"
        :key="i"
        @click="index = i"
      >
        <span
        :class="{ selected: i === index, 'task-number': true }"
        >
          {{ i }}
        </span>
        <span v-if="i < tasks.length - 1">
          &rarr;
        </span>
      </span>
    </div>
    <div class="content-wrapper">
      <content
        :key="index"
        :id="tasks[index]"
      />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tasks: Array
    },
    data() {
      return {
        index: 0
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  .header {
    text-align: center;
    background: #EEEEEE;
    border-bottom: 1px solid#AAAAAA;
    padding: 16px;
    font-size: 1.5em;
  }

  .task-number {
    cursor: pointer;
    background: #EEEEEE;
    border-radius: 50%;
    padding: 0 0.3em;
    border: 2px solid #888;
  }

  .task-number.selected {
    background: chartreuse;
  }

  .parent-wrapper {
    display: flex;
    font-family: Roboto;
    position: absolute;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .content-wrapper {
    flex-grow: 1;
    position: relative;
  }

  iframe
  {
    display: block;
  }

</style>
