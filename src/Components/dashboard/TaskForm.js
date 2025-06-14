    'use client'
import { useState, useEffect } from 'react'
import useStore from '../../store/bugstore'
import Modal from '../../Components/ui/Modal'
import Input from '../../Components/ui/Input'
import Select from '../../Components/ui/Select'
import Button from '../../Components/ui/Button'

export default function TaskForm() {
  const isTaskFormOpen = useStore(state => state.isTaskFormOpen)
  const editingTask = useStore(state => state.editingTask)
  const closeTaskForm = useStore(state => state.closeTaskForm)
  const addTask = useStore(state => state.addTask)
  const updateTask = useStore(state => state.updateTask)
  const user = useStore(state => state.user)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'task',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    status: 'open'
  })
  
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        type: editingTask.type || 'task',
        priority: editingTask.priority || 'medium',
        assignee: editingTask.assignee || '',
        dueDate: editingTask.dueDate || '',
        status: editingTask.status || 'open'
      })
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'task',
        priority: 'medium',
        assignee: '',
        dueDate: '',
        status: 'open'
      })
    }
    setErrors({})
  }, [editingTask, isTaskFormOpen])
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.assignee.trim()) {
      newErrors.assignee = 'Assignee is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const taskData = {
      ...formData,
      createdBy: user?.name,
      updatedBy: user?.name
    }
    
    if (editingTask) {
      updateTask(editingTask.id, taskData)
    } else {
      addTask(taskData)
    }
    
    closeTaskForm()
  }
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }
  
  return (
    <Modal isOpen={isTaskFormOpen} onClose={closeTaskForm} title={editingTask ? 'Edit Task' : 'Create New Task'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              error={errors.title}
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={`input-field h-24 resize-none ${errors.description ? 'border-red-500' : ''}`}
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
          
          <Select
            label="Type"
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            options={[
              { value: 'task', label: 'Task' },
              { value: 'bug', label: 'Bug' },
              { value: 'feature', label: 'Feature' },
              { value: 'improvement', label: 'Improvement' }
            ]}
          />
          
          <Select
            label="Priority"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
              { value: 'critical', label: 'Critical' }
            ]}
          />
          
          <Input
            label="Assignee"
            value={formData.assignee}
            onChange={(e) => handleChange('assignee', e.target.value)}
            error={errors.assignee}
            placeholder="Enter assignee name"
            required
          />
          
          <Input
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
          />
          
          {editingTask && (
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              options={[
                { value: 'open', label: 'Open' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'closed', label: 'Closed' },
                { value: 'pending-approval', label: 'Pending Approval' }
              ]}
            />
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={closeTaskForm}>
            Cancel
          </Button>
          <Button type="submit">
            {editingTask ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}