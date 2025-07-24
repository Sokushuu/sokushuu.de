import { Hono } from 'hono'
import { KVClient } from './utils/kv'
import { createStatisticsController } from './controllers/statistics'

const app = new Hono()

// Initialize KV client
const kv = new KVClient(
  process.env.CLOUDFLARE_ACCOUNT_ID!,
  process.env.KV_NAMESPACE_ID!,
  process.env.CLOUDFLARE_API_TOKEN!
)

// Mount statistics controller
const statisticsController = createStatisticsController(kv)
app.route('/api/statistics', statisticsController)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
