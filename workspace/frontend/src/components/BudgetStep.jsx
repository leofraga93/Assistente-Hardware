import { formatBRL } from '../format'

const chips = [2000, 4000, 6000, 9000, 12000]

export default function BudgetStep({ valor, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-100">Qual e o seu teto de orcamento?</h3>
        <p className="mt-1 text-sm text-slate-400">
          Use como teto maximo: montamos a melhor configuracao possivel abaixo desse valor.
        </p>
      </div>

      <div className="text-center">
        <span className="budget-value text-5xl font-extrabold tracking-tight">
          {formatBRL(valor)}
        </span>
        <span className="ml-2 text-sm text-slate-500">/ maximo</span>
      </div>

      <input
        type="range"
        min={2000}
        max={15000}
        step={100}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Orcamento maximo em reais"
      />

      <div className="flex flex-wrap justify-center gap-2">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            aria-pressed={valor === c}
            className={`budget-chip rounded-full border px-4 py-1.5 text-sm font-medium transition ${valor === c ? 'budget-chip--active' : ''}`}
          >
            {formatBRL(c)}
          </button>
        ))}
      </div>
    </div>
  )
}
