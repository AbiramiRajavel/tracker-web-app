'use client'
import { useMemo } from 'react'
import useStore from '../../store/bugstore'

export default function TaskChart() {
  const tasks = useStore(state => state.tasks)
  
  const chartData = useMemo(() => {
    // Get last 7 days
    const today = new Date()
    const days = []
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      days.push({
        date: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        tasks: 0
      })
    }
    
    // Count tasks created each day
    tasks.forEach(task => {
      const taskDate = new Date(task.createdAt).toISOString().split('T')[0]
      const dayIndex = days.findIndex(day => day.date === taskDate)
      if (dayIndex !== -1) {
        days[dayIndex].tasks++
      }
    })
    
    const maxTasks = Math.max(...days.map(d => d.tasks), 1)
    
    return days.map(day => ({
      ...day,
      percentage: (day.tasks / maxTasks) * 100
    }))
  }, [tasks])
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Task Creation Trend (Last 7 Days)</h3>
      
      <div className="flex items-end justify-between h-32 gap-2">
        {chartData.map((day, index) => (
          <div key={day.date} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-200 rounded-t flex items-end justify-center min-h-[100px]">
              {day.tasks > 0 && (
                <div
                  className="w-full bg-blue-500 rounded-t flex items-end justify-center text-white text-xs font-medium"
                  style={{ height: `${Math.max(day.percentage, 15)}%` }}
                >
                  {day.tasks}
                </div>
              )}
            </div>
            <div className="text-xs text-gray-600 mt-2 text-center">
              {day.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}