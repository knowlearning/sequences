<script setup>
  import YAML from 'yaml'
  import { compare, applyPatch } from 'fast-json-patch'
  import { computed } from 'vue'
  
  const props = defineProps({ uuid: String })
  const state = await Agent.state(props.uuid)

  const stateString = computed({
    get() {
      return YAML.stringify(state)
    },
    set(newStateString) {
      try {
        const jsObj = YAML.parse(newStateString)
        applyPatch(state, compare(state, jsObj))
      }
      catch (error) {
        console.log('ERROR PARSING YAML', error)
      }
    }
  })

</script>

<template>
  <textarea v-model="stateString" />
</template>