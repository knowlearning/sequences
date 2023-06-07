<template>
  <div class="dashboard-wrapper">
    <table>
      <thead>
        <th>Item</th>
        <th>Result</th>
      </thead>
      <tbody>
        <tr
          v-for="scope, index in scopes"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ states[scope] && states[scope].correct ? '👍' : '💩' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      scopes: Array
    },
    data() {
      return {
        states: {}
      }
    },
    async created() {
      this.scopes.forEach(async scope => {
        this.states[scope] = await Agent.state(scope)
      })
    }
  }
</script>

<style scoped>

table {
  margin: auto;
}

.dashboard-wrapper {
  margin: 2em auto;
}

</style>
