import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      
      // Tasks state
      tasks: [],
      filteredTasks: [],
      filterCriteria: { status: 'all', priority: 'all' },
      
      // Time tracking
      timeEntries: {},
      activeTimers: {},
      
      // UI state
      isTaskFormOpen: false,
      editingTask: null,
      
      // Auth actions
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // Task actions
      addTask: (task) => {
        const newTask = {
          ...task,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'open',
          timeSpent: 0
        }
        set(state => ({
          tasks: [...state.tasks, newTask],
          filteredTasks: [...state.tasks, newTask]
        }))
      },
      
      updateTask: (taskId, updates) => {
        set(state => {
          const updatedTasks = state.tasks.map(task =>
            task.id === taskId 
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          )
          return {
            tasks: updatedTasks,
            filteredTasks: updatedTasks
          }
        })
      },
      
      deleteTask: (taskId) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== taskId),
          filteredTasks: state.filteredTasks.filter(task => task.id !== taskId)
        }))
      },
      
      filterTasks: (criteria) => {
        set(state => {
          let filtered = state.tasks
          
          if (criteria.status !== 'all') {
            filtered = filtered.filter(task => task.status === criteria.status)
          }
          
          if (criteria.priority !== 'all') {
            filtered = filtered.filter(task => task.priority === criteria.priority)
          }
          
          return {
            filterCriteria: criteria,
            filteredTasks: filtered
          }
        })
      },
      
      // Time tracking actions
      startTimer: (taskId) => {
        set(state => ({
          activeTimers: {
            ...state.activeTimers,
            [taskId]: Date.now()
          }
        }))
      },
      
      stopTimer: (taskId) => {
        const state = get()
        const startTime = state.activeTimers[taskId]
        if (startTime) {
          const timeSpent = Date.now() - startTime
          const currentTime = state.timeEntries[taskId] || 0
          
          set(state => ({
            timeEntries: {
              ...state.timeEntries,
              [taskId]: currentTime + timeSpent
            },
            activeTimers: {
              ...state.activeTimers,
              [taskId]: null
            }
          }))
          
          // Update task with new time
          get().updateTask(taskId, { 
            timeSpent: (state.timeEntries[taskId] || 0) + timeSpent 
          })
        }
      },
      
      // UI actions
      openTaskForm: (task = null) => set({ 
        isTaskFormOpen: true, 
        editingTask: task 
      }),
      closeTaskForm: () => set({ 
        isTaskFormOpen: false, 
        editingTask: null 
      })
    }),
    {
      name: 'bug-tracker-storage'
    }
  )
)

export default useStore
