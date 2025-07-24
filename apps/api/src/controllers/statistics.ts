import { Hono } from 'hono'
import { KVClient } from '../utils/kv'

export function createStatisticsController(kv: KVClient) {
  const app = new Hono()

  // Get launch date endpoint
  app.get('/launch-date', async (c) => {
    try {
      console.log('[STATS] Fetching launch date from KV...')
      
      const launchDate = await kv.get('SOKUSHUU_LANDING_PAGE_LAUNCH_DATE')
      
      if (launchDate === null) {
        console.log('[STATS] Launch date not found in KV, using fallback (current date)')
        const fallbackDate = new Date().toISOString()
        
        return c.json({
          launch_date: fallbackDate,
          source: 'fallback',
          timestamp: new Date().toISOString()
        })
      }
      
      console.log('[STATS] Launch date found in KV:', launchDate)
      
      return c.json({
        launch_date: launchDate,
        source: 'kv',
        timestamp: new Date().toISOString()
      })
      
    } catch (error) {
      console.error('[STATS] Error fetching launch date:', error)
      
      // Fallback on error
      const fallbackDate = new Date().toISOString()
      
      return c.json({
        launch_date: fallbackDate,
        source: 'fallback_error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    }
  })

  // Get waiting list total endpoint
  app.get('/waiting-total', async (c) => {
    try {
      console.log('[STATS] Fetching waiting list total from KV...')
      
      const waitingTotal = await kv.get('SOKUSHUU_LANDING_PAGE_WAITING_TOTAL')
      
      if (waitingTotal === null) {
        console.log('[STATS] Waiting total not found in KV, using fallback (0)')
        
        return c.json({
          waiting_total: 0,
          source: 'fallback',
          timestamp: new Date().toISOString()
        })
      }
      
      console.log('[STATS] Waiting total found in KV:', waitingTotal)
      
      // Parse the value as a number, fallback to 0 if not a valid number
      const totalNumber = parseInt(waitingTotal, 10)
      const finalTotal = isNaN(totalNumber) ? 0 : totalNumber
      
      return c.json({
        waiting_total: finalTotal,
        source: 'kv',
        raw_value: waitingTotal,
        timestamp: new Date().toISOString()
      })
      
    } catch (error) {
      console.error('[STATS] Error fetching waiting total:', error)
      
      // Fallback on error
      return c.json({
        waiting_total: 0,
        source: 'fallback_error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    }
  })

  return app
}
