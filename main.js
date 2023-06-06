import { validate as isUUID } from 'uuid'
import { browserAgent, vuePersistentComponent } from '@knowlearning/agents'
import player from './player.vue'
import editor from './editor.vue'

window.Agent = browserAgent()

async function initialize() {
  const id = window.location.pathname.slice(1)
  if (isUUID(id)) {
    const sequence = await Agent.download(id).then(r => r.json())
    vuePersistentComponent(player, sequence, id)
  }
  else {
    vuePersistentComponent(editor)
  }
}

initialize()
