<template>
  <div>
    <h1>Sequence Editor</h1>
    <ul>
      <li
        v-for="_, index in sequence.tasks"
        :key="index"
      >
        <input v-model="sequence.tasks[index]" />
        <button @click="removeTask(index)">x</button>
      </li>
      <li>
        <button @click="sequence.tasks.push('')">+</button>
      </li>
    </ul>
    <button @click="save">save</button>
    <hr>
    <ul>
      <li v-for="id, index in sequences">
        {{ id }}
        <button @click="edit(id)">edit</button>
        <button @click="remove(index)">x</button>
      </li>
      <li>
        <button @click="createNew">+</button>
      </li>
    </ul>
  </div>
</template>

<script>
  const defaultSequence = () => ({
    tasks: []
  })

  export default {
    data() {
      return {
        sequence: defaultSequence(),
        sequences: []
      }
    },
    methods: {
      removeTask(index) {
        this.sequence.tasks.splice(index, 1)
      },
      async edit(id) {
        this.sequence = await Agent.download(id).then(r => r.json())
      },
      async save() {
        const name = prompt('Enter Name')
        if (!name) return

        const data = JSON.stringify(this.sequence, null, 4)
        const id = await Agent.upload(name, 'application/json', data)
        this.sequences.push(id)
      },
      createNew() {
        this.sequence = defaultSequence()
      }
    }
  }
</script>

<style scoped>
</style>
