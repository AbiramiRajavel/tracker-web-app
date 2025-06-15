'use client'
import { useState, useEffect } from 'react'
import useStore from '@/store/bugstore'
import Button from '@/Components/ui/Button'

export default function TimeTracker({ taskId }) {
  const activeTimers = useStore(state => state.activeTimers)
  const timeEntries = useStore(state => state.timeEntries)
  const startTimer = useStore(state => state.startTimer)
  const stopTimer = useStore(state => state.stopTimer)
  
  const [currentTime, setCurrentTime] = useState(0)
  const isActive = activeTimers[taskId]
  const totalTime = timeEntries[taskId] || 0
  
  useEffect(() => {
    let interval = null
    
    if (isActive) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - isActive)
      }, 1000)
    } else {
      setCurrentTime(0)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive])
  
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  
  const handleToggleTimer = () => {
    if (isActive) {
      stopTimer(taskId)
    } else {
      startTimer(taskId)
    }
  }
  
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="text-sm">
        <span className="font-medium">Time: </span>
        {isActive ? (
          <span className="text-blue-600 font-mono">
            {formatTime(totalTime + currentTime)} (running)
          </span>
        ) : (
          <span className="font-mono">
            {formatTime(totalTime)}
          </span>
        )}
      </div>
      
      <Button
        size="sm"
        variant={isActive ? 'danger' : 'primary'}
        onClick={handleToggleTimer}
      >
        {isActive ? 'Stop' : 'Start'}
      </Button>
    </div>
  )
}