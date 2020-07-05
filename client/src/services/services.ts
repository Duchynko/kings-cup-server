import io from 'socket.io-client'
import axios from 'axios'

const production = process.env.VUE_APP_ENV === 'production'
const serverUrl = production ? process.env.VUE_APP_URL : 'http://localhost:3000'

export const connectSocket = () => {
  return io(serverUrl)
}

export const submitLogin = async (name: string, logo: string, room: string) => {
  const res = await axios.post(`${serverUrl}/join`, {
    user: {
      name,
      logo
    },
    roomName: room
  })

  return res
}
