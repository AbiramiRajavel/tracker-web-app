'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '@/store/bugstore'
import LoginForm from '@/Components/auth/LoginForm'

export default function HomePage() {
  const router = useRouter()
  const isAuthenticated = useStore(state => state.isAuthenticated)
  console.log('HomePage isAuthenticated:', isAuthenticated);
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])
  
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bug/Task Tracker</h1>
          <p className="text-gray-600">Sign in to manage your tasks and bugs</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}