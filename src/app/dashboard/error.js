'use client'

export default function DashboardError({ error, reset }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Error</h3>
        <p className="text-gray-600 mb-4">Unable to load dashboard data.</p>
        <button onClick={reset} className="btn-primary">
          Retry
        </button>
      </div>
    </div>
  )
}