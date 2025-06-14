'use client'
import useStore from '../../store/bugstore'
import Button from '../../Components/ui/Button'

export default function DashboardHeader() {
  const user = useStore(state => state.user)
  const logout = useStore(state => state.logout)
  const openTaskForm = useStore(state => state.openTaskForm)
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bug/Task Tracker</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
              {user?.role}
            </span>
            
            <Button onClick={() => openTaskForm()}>
              Create Task
            </Button>
            
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}