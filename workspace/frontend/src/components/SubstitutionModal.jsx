import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faSpinner,
  faArrowRight,
  faCircleCheck,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons'
import CategoriaIcon from './CategoriaIcon'
import { formatBRL } from '../format'
import { isMonitor } from '../labels'

export default function SubstitutionModal({ item, alternativas, carregando, erro, onSelecionar, onFechar }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-800 bg-slate-900 px-5 py-4">
          <div>
            <h3 className="font-bold text-slate-100">Substituir por mais barata</h3>
            <p className="text-xs text-slate-400">{item.destaque}: {item.nome}</p>
          </div>
          <button
            onClick={onFechar}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            aria-label="Fechar"
          >
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {carregando ? (
            <div className="flex flex-col items-center gap-3 py-10 text-slate-400">
              <FontAwesomeIcon icon={faSpinner} className="h-7 w-7 animate-spin text-brand-600" />
              <span>Buscando alternativas compativeis...</span>
            </div>
          ) : erro ? (
            <p className="rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-3 text-sm text-slate-100">
              {erro}
            </p>
          ) : alternativas.length === 0 ? (
            <p className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-6 text-center text-sm text-slate-400">
              Nao ha peca mais barata compativel com esta configuracao.
            </p>
          ) : (
            <ul className="space-y-2">
              {alternativas.map((alt) => (
                <li key={alt.id}>
                  <button
                    onClick={() => onSelecionar(alt)}
                    className="group flex w-full items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/40 p-3 text-left transition hover:border-brand-500 hover:bg-brand-600/10"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-brand-600">
                      <CategoriaIcon categoria={alt.categoria} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-slate-100">{alt.nome}</span>
                      <span className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                        <FontAwesomeIcon icon={faShieldHalved} className="h-3 w-3" />
                        Validado pelo backend
                        {isMonitor(alt) && ' (Monitor)'}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="price-value">
                        {formatBRL(alt.preco)}
                      </span>
                      <span className="substitution-use mt-1 flex items-center justify-end gap-1 text-xs font-semibold">
                        <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 group-hover:translate-x-0.5 transition" />
                        Usar
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!carregando && alternativas.length > 0 && (
          <div className="flex items-center gap-2 border-t border-slate-800 px-5 py-3 text-xs text-slate-400">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-500 text-brand-600">
              <FontAwesomeIcon icon={faCircleCheck} className="h-3 w-3" />
            </span>
            Todas as opcoes respeitam a compatibilidade (plataforma, memoria e fonte).
          </div>
        )}
      </div>
    </div>
  )
}
