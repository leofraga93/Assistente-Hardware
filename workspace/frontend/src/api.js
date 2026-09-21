const API_BASE = String(import.meta.env.VITE_API_BASE || '').replace(/\/$/, '')

const MSG_API_FORA =
  'Nao foi possivel conectar a API. O catalogo (objetivos e jogos) vem do Spring Boot, que precisa estar no ar.'

async function handle(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(MSG_API_FORA)
    }
    throw new Error(data.mensagem || MSG_API_FORA)
  }
  return data
}

async function pedir(path, opcoes) {
  let res
  try {
    res = await fetch(`${API_BASE}${path}`, opcoes)
  } catch {
    throw new Error(MSG_API_FORA)
  }
  return handle(res)
}

export async function getCatalogo() {
  return pedir('/api/catalogo')
}

export async function receitasRecomendadas({ orcamento, jogoIds, incluiPerifericos }) {
  return pedir('/api/receitas/recomendadas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orcamento, jogoIds, incluiPerifericos }),
  })
}

export async function substitutos(produtoId, montagemIds) {
  return pedir('/api/montagens/substitutas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ produtoId, montagemIds }),
  })
}
