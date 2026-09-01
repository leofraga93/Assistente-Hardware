import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Loader2, MonitorSmartphone } from 'lucide-react'
import Header from './components/Header'
import PassoBar from './components/PassoBar'
import StepOrcamento from './components/StepOrcamento'
import StepJogos from './components/StepJogos'
import StepMarca from './components/StepMarca'
import Resultado from './components/Resultado'
import ReceitasSection from './components/ReceitasSection'
import { getCatalogo, recomendar } from './api'

export default function App() {
  const [catalogo, setCatalogo] = useState(null)
  const [passo, setPasso] = useState(1)
  const [orcamento, setOrcamento] = useState(3000)
  const [jogosSel, setJogosSel] = useState([])
  const [marca, setMarca] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    getCatalogo()
      .then(setCatalogo)
      .catch(() => setCatalogo(null))
  }, [])

  const toggleJogo = useCallback((id) => {
    setJogosSel((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    )
  }, [])

  const montar = async () => {
    setCarregando(true)
    setErro('')
    try {
      const res = await recomendar({
        orcamento,
        jogoIds: jogosSel,
        marca,
      })
      setResultado(res)
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  const reiniciar = () => {
    setResultado(null)
    setPasso(1)
    setErro('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <Header />

      <main>
        <section className="mx-auto max-w-6xl px-4 pt-12 pb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-300">
            <MonitorSmartphone className="h-3.5 w-3.5" />
            Simples para quem nao entende de hardware
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Monte o computador{' '}
            <span className="bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent">
              ideal para o seu bolso
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Informe quanto quer gastar e o que vai fazer. Montamos uma configuracao compativel,
            otimizada e com links para comprar cada peca.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-8">
          <div className="card p-6 sm:p-8">
            {resultado ? (
              <Resultado recomendacao={resultado} onReiniciar={reiniciar} />
            ) : (
              <>
                <PassoBar atual={passo} />

                <div className="min-h-[260px]">
                  {passo === 1 && (
                    <StepOrcamento valor={orcamento} onChange={setOrcamento} />
                  )}
                  {passo === 2 && (
                    <StepJogos
                      jogos={catalogo?.jogos || []}
                      selecionados={jogosSel}
                      onToggle={toggleJogo}
                    />
                  )}
                  {passo === 3 && <StepMarca marca={marca} onChange={setMarca} />}
                </div>

                {erro && (
                  <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {erro}
                  </p>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => setPasso((p) => Math.max(1, p - 1))}
                    disabled={passo === 1}
                    className="btn-ghost disabled:opacity-0"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </button>

                  {passo < 3 ? (
                    <button onClick={() => setPasso((p) => p + 1)} className="btn-primary">
                      Avancar
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={montar}
                      disabled={carregando}
                      className="btn-primary bg-gradient-to-r from-brand-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500"
                    >
                      {carregando ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Montando...
                        </>
                      ) : (
                        <>
                          Montar meu PC
                          <MonitorSmartphone className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </section>

        <ReceitasSection receitas={catalogo?.receitas} />
      </main>

      <footer className="border-t border-slate-800/60 py-8 text-center text-xs text-slate-500">
        Os precos exibidos sao estimativas. Links de compra podem gerar comissao de afiliado.
      </footer>
    </div>
  )
}
