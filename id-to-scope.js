import { validate as isUUID } from 'uuid'

export default function idToScope(id) {
  if (isUUID(id)) return id
  else {
    try {
      const { host, pathname } = new URL(id)
      if (isUUID(pathname.slice(1))) return pathname.slice(1)
      else return host
    }
    catch (error) {
      return null
    }
  }
}