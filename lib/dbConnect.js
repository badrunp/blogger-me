import url from '../constant/url'
import mongoose from 'mongoose'

const connection = {}

async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  connection.isConnected = db.connections[0].readyState
}

export default dbConnect