<template>
  <div class="parent-wrapper">
    <div
      class="header"
      @click.shift="showRunState = !showRunState"
    >
      <span
        v-for="_, i in tasks"
        :key="i"
        @click="index = i"
      >
        <span
          :class="{ selected: i === index, 'task-number': true }"
        >
          {{ i + 1 }}
        </span>
        <span>
          &rarr;
        </span>
      </span>
      <span
        :class="{ selected: tasks.length === index, 'task-number': true }"
        @click="index = tasks.length"
      >
        {{ tasks.length + 1 }}
      </span>
    </div>
    <div class="content-wrapper">
      <div
        class="iframe-wrapper"
      >
        <content
          v-if="index < tasks.length"
          :key="index"
          :id="tasks[index]"
        />
        <SequenceDashboard
          v-else
          :scopes="this.tasks.map(this.idToScope)"
        />
      </div>
      <div
        v-if="showRunState && activeScope"
        class="data-wrapper"
      >
        <RunStateViewer
          :key="activeScope"
          :scope="activeScope"
        />
      </div>

    </div>
  </div>
</template>

<script>
  import idToScope from './id-to-scope.js'
  import RunStateViewer from './run-state-viewer.vue'
  import SequenceDashboard from './sequence-dashboard.vue'

  export default {
    components: {
      RunStateViewer,
      SequenceDashboard
    },
    props: {
      tasks: Array
    },
    data() {
      return {
        index: 0,
        showRunState: false
      }
    },
    methods: {
      idToScope
    },
    computed: {
      activeScope() {
        if (this.index >= this.tasks.length) return null
        return idToScope(this.tasks[this.index])
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
    display: flex;
  }

  .iframe-wrapper {
    flex-grow: 1;
    position: relative;
  }

  iframe
  {
    display: block;
  }

  .data-wrapper
  {
    background: #FDF6E3;
    position: relative;
    width: 33vw;
    height: 100%;
    border-left: 1px solid #888888;
  }

</style>
