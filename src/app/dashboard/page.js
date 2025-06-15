'use client'
import { useEffect } from 'react'
import useStore from '@/store/bugstore'
import TaskList from '@/Components/dashboard/TaskList'
import TaskForm from '@/Components/dashboard/TaskForm'
import TaskChart from '@/Components/dashboard/TaskChart'

export default function DashboardPage() {
  const tasks = useStore(state => state.tasks)
  const user = useStore(state => state.user)
  const filterTasks = useStore(state => state.filterTasks)
  
  useEffect(() => {
    // Initialize with default filter
    filterTasks({ status: 'all', priority: 'all' })
  }, [filterTasks])
  
  const stats = {
    total: tasks.length,
    open: tasks.filter(t => t.status === 'open').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    closed: tasks.filter(t => t.status === 'closed').length,
    pendingApproval: tasks.filter(t => t.status === 'pending-approval').length
  }
  
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Open</h3>
          <p className="text-3xl font-bold text-red-600">{stats.open}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Closed</h3>
          <p className="text-3xl font-bold text-green-600">{stats.closed}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Pending Approval</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.pendingApproval}</p>
        </div>
      </div>
      
      {/* Chart */}
      <TaskChart />
      
      {/* Task List */}
      <TaskList />
      
      {/* Task Form Modal */}
      <TaskForm />
    </div>
  )
}