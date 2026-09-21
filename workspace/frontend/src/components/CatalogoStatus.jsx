import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function CatalogoStatus({ status, onTentar, children }) {
  if (status === 'carregando') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 animate-spin text-brand-400" />
        <p className="text-sm text-slate-400">Carregando o catalogo...</p>
      </div>
    )
  }

  if (status === 'erro') {
    return (
      <div
        className="rounded-xl border border-amber-500/30 bg-amber-950/40 px-4 py-5 text-center"
        role="alert"
      >
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="mx-auto h-7 w-7 text-amber-300"
        />
        <p className="mt-3 text-sm font-medium text-amber-100">
          Nao foi possivel carregar objetivos e jogos.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          Este site precisa da API (Spring Boot) no ar. Na Vercel so o visual esta publicado;
          sem o servidor, o catalogo nao chega. Se estiver no seu computador, inicie o backend
          na porta 8080 e tente de novo.
        </p>
        {onTentar && (
          <button type="button" onClick={onTentar} className="btn-primary mt-4 px-4 py-2 text-sm">
            Tentar novamente
          </button>
        )}
      </div>
    )
  }

  return children
}
