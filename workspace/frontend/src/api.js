const API_BASE = ''

async function handle(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.mensagem || 'Erro ao se comunicar com o servidor.')
  }
  return data
}

export async function getCatalogo() {
  const res = await fetch(`${API_BASE}/api/catalogo`)
  return handle(res)
}

export async function recomendar({ orcamento, jogoIds, marca }) {
  const res = await fetch(`${API_BASE}/api/recomendacoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orcamento, jogoIds, marca }),
  })
  return handle(res)
}
