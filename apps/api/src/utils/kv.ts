export class KVClient {
  private accountId: string
  private namespaceId: string
  private apiToken: string

  constructor(accountId: string, namespaceId: string, apiToken: string) {
    this.accountId = accountId
    this.namespaceId = namespaceId
    this.apiToken = apiToken
  }

  async get(key: string): Promise<string | null> {
    try {
      const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}/values/${key}`
      
      console.log('[KV DEBUG] GET request:')
      console.log('URL:', url)
      console.log('Headers:', {
        'Authorization': `Bearer ${this.apiToken.substring(0, 8)}...`,
      })
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
        },
      })
      
      console.log('[KV DEBUG] Response status:', response.status, response.statusText)
      
      if (response.status === 404) {
        console.log('[KV DEBUG] Key not found')
        return null
      }
      
      if (!response.ok) {
        const errorBody = await response.text()
        console.log('[KV DEBUG] Error response body:', errorBody)
        throw new Error(`KV API error: ${response.status} ${response.statusText} - ${errorBody}`)
      }
      
      const result = await response.text()
      console.log('[KV DEBUG] Success response:', result.substring(0, 100) + (result.length > 100 ? '...' : ''))
      return result
    } catch (error) {
      console.error('[KV ERROR] Get operation failed:', error)
      throw error
    }
  }
}
