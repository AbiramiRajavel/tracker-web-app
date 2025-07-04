'use client'

export default function Input({ 
  label, 
  error, 
  className = '', 
  required = false,
  ...props 
}) {
  return (
    <div className="w-full" >
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
       style={{border: '1px solid black', borderRadius: '0.375rem' }}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}