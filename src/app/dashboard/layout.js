'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '../../store/bugstore'
import DashboardHeader from '../../Components/dashboard/DashboardHeader'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const isAuthenticated = useStore(state => state.isAuthenticated)
  
  useEffect(() => {
    if (!isAuthenticated) {
      // router.push('/')
    }
  }, [isAuthenticated, router])
  
  // if (!isAuthenticated) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
  //         <p className="mt-4 text-gray-600">Loading...</p>
  //       </div>
  //     </div>
  //   )
  // }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}