<script setup>
  import { reactive, computed } from 'vue'
  import { vueEmbedComponent } from '@knowlearning/agents/vue.js'
  import { useKeyboardEvents } from './composables/keyboard.js'

  const { registerKey } = useKeyboardEvents()
  const props = defineProps({ uuid: String })

  registerKey('Escape', () => Agent.close())

  const content = JSON.parse(JSON.stringify(await Agent.state(props.uuid)))
  const runstate = reactive(await Agent.state(`run-state/${props.uuid}`))

  if (runstate.current === undefined) {
    runstate.current = 0
  }

  const currentId = computed(() => content.items[runstate.current].id)

  runstate.xapi = {
    verb: { id: "http://adlnet.gov/expapi/verbs/started" }
  }
  runstate.xapi = {
    verb: { id: "http://adlnet.gov/expapi/verbs/started" },
    context: [currentId.value]
  }

  window.addEventListener("beforeunload", () => {
    runstate.xapi = {
      verb: { id: "http://adlnet.gov/expapi/verbs/closed" }
    }
  })

  function handleMutate(mutation) {
    if (mutation.before.currentlyCorrect !== mutation.after.currentlyCorrect) { 
      return {
        "verb": {
          "id": "http://adlnet.gov/expapi/verbs/answered"
        },
        "result": {
            "success": !!mutation.after.currentlyCorrect,
            "completion": true
        }
      }
    }

  }
</script>

<template>
  <div id="player">
    <div id="header">
      <button
        v-for="item, index in content.items"
        :key="index"
        :class="{
          selected: index === runstate.current
        }"
        @click="runstate.current = index"
      >
        {{ index + 1 }}
      </button>
    </div>
    <div id="body">
      <vueEmbedComponent
        v-if="currentId"
        :id="currentId"
        @mutate="handleMutate"
      />
      <span v-else>No content id specified</span>
    </div>
  </div>
</template>

<style scoped>
  #player {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #header {
    text-align: center;
  }

  #body {
    flex-grow: 1;
  }

  button.selected {
    background: chartreuse;
  }

</style>