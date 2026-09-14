import { initSimpleSearch } from 'fumadocs-core/search/server'
import indexes from '../../src/generated/search-index.json'

const server = initSimpleSearch({ indexes })

export async function onRequestGet({ request }: { request: Request }): Promise<Response> {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')
  if (!query) return Response.json([])

  const results = await server.search(query, {
    tag: url.searchParams.get('tag')?.split(',') ?? undefined,
    locale: url.searchParams.get('locale') ?? undefined,
  })
  return Response.json(results)
}
