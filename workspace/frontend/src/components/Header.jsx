import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

export default function Header({ darkMode, onToggleTheme }) {
  return (
    <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 shadow-lg shadow-brand-600/30">
            <FontAwesomeIcon icon={faMicrochip} className="h-5 w-5 text-on-brand" />
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight text-slate-100">
              Assistente de Hardware
            </span>
            <span className="block text-xs text-slate-400">Monte o PC ideal para você</span>
          </span>
        </a>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            role="switch"
            aria-checked={darkMode}
            aria-label="Tema escuro"
            title={darkMode ? 'Tema escuro ativo' : 'Tema claro ativo'}
            className="theme-switch group relative flex h-10 w-[4.5rem] items-center rounded-full border border-slate-700 p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <FontAwesomeIcon icon={faSun} aria-hidden="true" className="absolute left-2 h-3.5 w-3.5 text-slate-500" />
            <FontAwesomeIcon icon={faMoon} aria-hidden="true" className="absolute right-2 h-3.5 w-3.5 text-slate-500" />
            <span className={`theme-switch-thumb relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-on-brand shadow transition-transform duration-200 ${darkMode ? 'translate-x-8' : 'translate-x-0'}`}>
              <FontAwesomeIcon icon={darkMode ? faMoon : faSun} aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
