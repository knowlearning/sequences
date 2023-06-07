<template>
  <pre v-if="state">{{ state }}</pre>
</template>

<script>
  export default {
    props: {
      scope: String
    },
    data() {
      return {
        state: null
      }
    },
    async created() {
      this.state = await (
        Agent
          .state(this.scope)
          .watch(({ state }) => {
            this.state = JSON.parse(JSON.stringify(state))
          })
      )
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

  .content-wrapper,
  .data-wrapper {
    flex-grow: 1;
    position: relative;
  }

  iframe
  {
    display: block;
  }

  .data-wrapper
  {
    border-top: 1px solid #888888;
  }

</style>
