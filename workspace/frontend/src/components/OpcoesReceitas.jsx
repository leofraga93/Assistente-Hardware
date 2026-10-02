import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMicrochip,
  faGaugeHigh,
  faCircleCheck,
  faWrench,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { formatBRL } from '../format'

export default function OpcoesReceitas({ opcoes, carregando, erro, onSelecionar, onVoltar }) {
  if (carregando) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-slate-400">
        <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 animate-spin text-brand-600" />
        <span>Calculando as melhores opcoes para o seu orcamento...</span>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="space-y-4 text-center">
        <p className="rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-3 text-sm text-slate-100">
          {erro}
        </p>
        <button onClick={onVoltar} className="btn-ghost">
          Voltar para o questionario
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-slate-100">Escolha sua base</h3>
        <p className="mt-1 text-sm text-slate-400">
          Duas opcoes validas para o seu caso. Apos escolher, voce pode trocar cada peca.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {opcoes.map((op) => (
          <div
            key={op.plataforma}
            className="card flex flex-col overflow-hidden"
          >
            <div
              className="flex items-center justify-between bg-slate-800 px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faMicrochip} className="h-6 w-6 text-brand-600" />
                <div>
                  <span className="block font-bold text-slate-100">
                    {op.plataforma.startsWith('AMD') ? 'Recomendado AMD' : 'Recomendado Intel'}
                  </span>
                  <span className="block text-xs text-slate-400">{op.plataforma}</span>
                </div>
              </div>
              {op.receitaNome && (
                <span className="hidden rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 sm:block">
                  {op.receitaNome}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-800/50 p-3 text-center">
                  <span className="block text-xs text-slate-400">Total estimado</span>
                  <span className="price-value price-value--recommended text-lg">
                    {formatBRL(op.total)}
                  </span>
                </div>
                <div className="rounded-xl bg-slate-800/50 p-3 text-center">
                  <span className="flex items-center justify-center gap-1 text-xs text-slate-400">
                    <FontAwesomeIcon icon={faGaugeHigh} className="h-3.5 w-3.5" /> Desempenho
                  </span>
                  <span className="block text-lg font-bold text-slate-100">
                    {op.pesoGeralCalculado}
                  </span>
                </div>
              </div>

              <ul className="space-y-1.5 text-sm">
                {op.itens.slice(0, 3).map((item) => (
                  <li key={item.id} className="flex items-center gap-2 text-slate-300">
                    <span className="value-mark flex h-5 w-5 shrink-0 rounded-full">
                      <FontAwesomeIcon icon={faCircleCheck} className="h-3 w-3" />
                    </span>
                    <span className="truncate">{item.nome}</span>
                  </li>
                ))}
                {op.itens.length > 3 && (
                  <li className="text-xs text-slate-500">
                    + {op.itens.length - 3} outras pecas
                  </li>
                )}
              </ul>

              <button
                onClick={() => onSelecionar(op)}
                className="btn-primary mt-auto w-full"
              >
                <FontAwesomeIcon icon={faWrench} className="h-4 w-4" />
                Selecionar e Customizar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={onVoltar} className="btn-ghost">
          Refazer questionario
        </button>
      </div>
    </div>
  )
}
