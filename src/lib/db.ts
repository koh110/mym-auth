import { MongoClient, Collection, ObjectID } from 'mongodb'
import { MONGODB_URI } from '../config'
import logger from './logger'

export const collections: {
  users: Collection<User>
  removed: Collection<Removed>
} = { users: null, removed: null }

export const connect = async () => {
  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const db = client.db('auth')
  collections.users = db.collection('users')
  collections.removed = db.collection('removed')

  logger.info('[db] connected mongodb')

  return client
}

export type User = {
  _id: ObjectID
  twitterId?: string
  twitterUserName?: string
  githubId?: string
  githubUserName?: string
}

export type Removed = User & {
  originId: ObjectID
}
