'use client'
import useStore from '@/store/bugstore'
import Button from '@/Components/ui/Button'
import TimeTracker from './TimeTracker'

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800', 
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
}

const statusColors = {
  open: 'bg-red-100 text-red-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  closed: 'bg-green-100 text-green-800',
  'pending-approval': 'bg-purple-100 text-purple-800'
}

export default function TaskCard({ task }) {
  const user = useStore(state => state.user)
  const updateTask = useStore(state => state.updateTask)
  const deleteTask = useStore(state => state.deleteTask)
  const openTaskForm = useStore(state => state.openTaskForm)
  
  const canEdit = user?.role === 'developer' && (task.assignee === user?.name || task.createdBy === user?.name)
  const canApprove = user?.role === 'manager'
  const canClose = user?.role === 'developer' && task.assignee === user?.name
  
  const handleStatusChange = (newStatus) => {
    updateTask(task.id, { status: newStatus })
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }
  
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {task.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
              {task.status.replace('-', ' ')}
            </span>
          </div>
          
          <p className="text-gray-600 mb-3 line-clamp-2">{task.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span><strong>Type:</strong> {task.type}</span>
            <span><strong>Assignee:</strong> {task.assignee}</span>
            <span><strong>Created:</strong> {formatDate(task.createdAt)}</span>
            {task.dueDate && (
              <span><strong>Due:</strong> {formatDate(task.dueDate)}</span>
            )}
            {task.timeSpent > 0 && (
              <span><strong>Time:</strong> {formatTime(task.timeSpent)}</span>
            )}
          </div>
          
          {user?.role === 'developer' && task.assignee === user?.name && (
            <div className="mt-3">
              <TimeTracker taskId={task.id} />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          {canEdit && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => openTaskForm(task)}
            >
              Edit
            </Button>
          )}
          
          {canClose && task.status !== 'closed' && task.status !== 'pending-approval' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleStatusChange('pending-approval')}
            >
              Close Task
            </Button>
          )}
          
          {canApprove && task.status === 'pending-approval' && (
            <div className="flex gap-1">
              <Button
                size="sm"
                onClick={() => handleStatusChange('closed')}
              >
                Approve
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleStatusChange('open')}
              >
                Reopen
              </Button>
            </div>
          )}
          
          {canEdit && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                if (confirm('Are you sure you want to delete this task?')) {
                  deleteTask(task.id)
                }
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}