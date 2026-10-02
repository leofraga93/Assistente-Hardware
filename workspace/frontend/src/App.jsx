import { useCallback, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop, faArrowLeft, faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Header from './components/Header'
import PassoBar from './components/PassoBar'
import PeripheralsStep from './components/PeripheralsStep'
import ObjectiveStep from './components/ObjectiveStep'
import GamesStep from './components/GamesStep'
import BudgetStep from './components/BudgetStep'
import OpcoesReceitas from './components/OpcoesReceitas'
import Configurator from './components/Configurator'
import CatalogoStatus from './components/CatalogoStatus'
import { getCatalogo, receitasRecomendadas } from './api'

const THEME_STORAGE_KEY = 'assistente_tech_theme'

function getSavedDarkMode() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark'
  } catch {
    return false
  }
}

export default function App() {
  const [darkMode, setDarkMode] = useState(getSavedDarkMode)
  const [catalogo, setCatalogo] = useState(null)
  const [statusCatalogo, setStatusCatalogo] = useState('carregando')
  const [fase, setFase] = useState('wizard')
  const [passo, setPasso] = useState(1)
  const [incluiPerifericos, setIncluiPerifericos] = useState(false)
  const [objetivosSel, setObjetivosSel] = useState([])
  const [jogosSel, setJogosSel] = useState([])
  const [orcamento, setOrcamento] = useState(4000)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [opcoes, setOpcoes] = useState([])
  const [build, setBuild] = useState(null)
  const themeTransitionTimeout = useRef(null)

  const alternarTema = useCallback(() => {
    const root = document.documentElement
    root.classList.add('theme-transitioning')
    window.clearTimeout(themeTransitionTimeout.current)
    themeTransitionTimeout.current = window.setTimeout(() => {
      root.classList.remove('theme-transitioning')
      themeTransitionTimeout.current = null
    }, 480)
    setDarkMode((current) => !current)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light')
    } catch { }
  }, [darkMode])

  useEffect(() => () => {
    window.clearTimeout(themeTransitionTimeout.current)
    document.documentElement.classList.remove('theme-transitioning')
  }, [])

  const carregarCatalogo = useCallback(() => {
    setStatusCatalogo('carregando')
    getCatalogo()
      .then((dados) => {
        setCatalogo(dados)
        setStatusCatalogo('ok')
      })
      .catch(() => {
        setCatalogo(null)
        setStatusCatalogo('erro')
      })
  }, [])

  useEffect(() => {
    carregarCatalogo()
  }, [carregarCatalogo])

  const objetivos = (catalogo?.jogos || []).filter((j) => j.tipo === 'OBJETIVO')
  const jogosLista = (catalogo?.jogos || []).filter((j) => j.tipo === 'JOGO')
  const catalogoIndisponivel = statusCatalogo !== 'ok'

  const toggle = useCallback((setter) => (id) => {
    setter((prev) => (prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]))
  }, [])

  const gerarOpcoes = async () => {
    setCarregando(true)
    setErro('')
    try {
      const res = await receitasRecomendadas({
        orcamento,
        jogoIds: [...objetivosSel, ...jogosSel],
        incluiPerifericos,
      })
      setOpcoes(res)
      setFase('opcoes')
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  const selecionarBuild = (op) => {
    setBuild(op)
    setFase('config')
  }

  const substituir = useCallback((itemId, novoItem) => {
    setBuild((prev) => {
      if (!prev) return prev
      const itens = prev.itens.map((i) => (i.id === itemId ? novoItem : i))
      const total = itens.reduce((acc, i) => acc + Number(i.preco), 0)
      return { ...prev, itens, total: Math.round(total * 100) / 100 }
    })
  }, [])

  const reiniciar = () => {
    setFase('wizard')
    setPasso(1)
    setErro('')
    setOpcoes([])
    setBuild(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <Header darkMode={darkMode} onToggleTheme={alternarTema} />

      <main>
        {fase === 'wizard' && (
          <>
            <section className="mx-auto max-w-6xl px-4 pt-12 pb-10 text-center">
              <h1 className="mx-auto mt-0 max-w-2xl text-4xl font-extrabold tracking-tight text-slate-100 sm:text-5xl">
                Monte o computador{' '}
                <span className="text-brand-600">
                  ideal para o seu bolso
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Responda 4 perguntas rapidas. Entregamos duas opcoes compativeis (AMD e Intel) e
                voce pode trocar qualquer peca.
              </p>
            </section>

            <section className="mx-auto max-w-3xl px-4 pb-8">
              <div className="card p-6 sm:p-8">
                <PassoBar atual={passo} />

                {passo !== 2 && passo !== 3 && statusCatalogo === 'erro' && (
                  <div className="mb-6">
                    <CatalogoStatus status="erro" onTentar={carregarCatalogo} />
                  </div>
                )}

                <div className="min-h-[240px]">
                  {passo === 1 && (
                    <PeripheralsStep valor={incluiPerifericos} onChange={setIncluiPerifericos} />
                  )}
                  {passo === 2 && (
                    <ObjectiveStep
                      objetivos={objetivos}
                      selecionados={objetivosSel}
                      onToggle={toggle(setObjetivosSel)}
                      statusCatalogo={statusCatalogo}
                      onTentarCatalogo={carregarCatalogo}
                    />
                  )}
                  {passo === 3 && (
                    <GamesStep
                      jogos={jogosLista}
                      selecionados={jogosSel}
                      onToggle={toggle(setJogosSel)}
                      statusCatalogo={statusCatalogo}
                      onTentarCatalogo={carregarCatalogo}
                    />
                  )}
                  {passo === 4 && <BudgetStep valor={orcamento} onChange={setOrcamento} />}
                </div>

                {erro && (
                  <p className="mt-4 rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-3 text-sm text-slate-100">
                    {erro}
                  </p>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => setPasso((p) => Math.max(1, p - 1))}
                    disabled={passo === 1}
                    className="btn-ghost disabled:opacity-0"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                    Voltar
                  </button>

                  {passo < 4 ? (
                    <button onClick={() => setPasso((p) => p + 1)} className="btn-primary">
                      Avancar
                      <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={gerarOpcoes}
                      disabled={carregando || catalogoIndisponivel}
                      className="btn-primary"
                    >
                      {carregando ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
                          Calculando...
                        </>
                      ) : (
                        <>
                          Ver minhas opcoes
                          <FontAwesomeIcon icon={faDesktop} className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {fase === 'opcoes' && (
          <section className="mx-auto max-w-5xl px-4 pt-10 pb-12">
            <OpcoesReceitas
              opcoes={opcoes}
              carregando={carregando}
              erro={erro}
              onSelecionar={selecionarBuild}
              onVoltar={reiniciar}
            />
          </section>
        )}

        {fase === 'config' && build && (
          <section className="mx-auto max-w-4xl px-4 pt-6 pb-12">
            <Configurator
              build={build}
              orcamento={orcamento}
              onSubstituir={substituir}
              onVoltar={() => setFase('opcoes')}
              onReiniciar={reiniciar}
            />
          </section>
        )}
      </main>

      <footer className="border-t border-slate-800/60 py-8 text-center text-xs text-slate-500">
        Os precos exibidos sao estimativas. Links de compra podem gerar comissao de afiliado.
      </footer>
    </div>
  )
}
