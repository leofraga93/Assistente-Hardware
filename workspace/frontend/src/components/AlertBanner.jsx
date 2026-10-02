import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { formatBRL } from '../format'

export default function AlertBanner({ total, orcamento }) {
  const diff = Number(total) - Number(orcamento)
  if (diff <= 0) return null

  const severo = Number(orcamento) > 0 && diff / Number(orcamento) > 0.1

  return (
    <aside
      className={`mb-6 flex items-start gap-3 rounded-xl border p-4 ${severo
          ? 'border-brand-500/40 bg-brand-600/10'
          : 'border-slate-700 bg-slate-900/70'
        }`}
      role="alert"
    >
      <span
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${severo
            ? 'bg-brand-600/15 text-brand-accessible'
            : 'bg-slate-800 text-slate-400'
          }`}
      >
        <FontAwesomeIcon icon={faTriangleExclamation} className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-100">
          {severo ? 'Montagem acima do orçamento' : 'Orçamento ultrapassado'}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          O total de <strong className="font-semibold text-slate-200">{formatBRL(total)}</strong>{' '}
          ultrapassa o teto de <strong className="font-semibold text-slate-200">{formatBRL(orcamento)}</strong>{' '}
          em <strong className="font-semibold text-slate-200">{formatBRL(diff)}</strong>.
          {severo && ' Considere trocar uma peça ou ajustar o orçamento.'}
        </p>
      </div>
      <span
        className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${severo
            ? 'border-brand-500/40 text-brand-accessible'
            : 'border-slate-700 text-slate-400'
          }`}
      >
        {severo ? 'Acima de 10%' : 'Atenção'}
      </span>
    </aside>
  )
}
