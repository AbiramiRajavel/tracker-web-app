    'use client'
import { useState } from 'react'
import useStore from '../../store/bugstore'
import TaskCard from './TaskCard'
import Select from '../../Components/ui/Select'

export default function TaskList() {
  const filteredTasks = useStore(state => state.filteredTasks)
  const filterCriteria = useStore(state => state.filterCriteria)
  const filterTasks = useStore(state => state.filterTasks)
  const user = useStore(state => state.user)
  
  const handleFilterChange = (key, value) => {
    filterTasks({ ...filterCriteria, [key]: value })
  }
  
  const visibleTasks = user?.role === 'manager' 
    ? filteredTasks 
    : filteredTasks?.filter(task => task.assignee === user?.name || task.createdBy === user?.name)
  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Tasks & Bugs ({visibleTasks?.length})
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              value={filterCriteria?.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'open', label: 'Open' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'closed', label: 'Closed' },
                { value: 'pending-approval', label: 'Pending Approval' }
              ]}
            />
            
            <Select
              value={filterCriteria?.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              options={[
                { value: 'all', label: 'All Priority' },
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'critical', label: 'Critical' }
              ]}
            />
          </div>
        </div>
      </div>
      
      <div className="divide-y">
        {visibleTasks?.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500">Create your first task to get started.</p>
          </div>
        ) : (
          visibleTasks?.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  )
}