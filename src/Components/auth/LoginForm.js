'use client'
import { useState } from 'react'
import useStore from '@/store/bugstore'
import Button from '@/Components/ui/Button'
import Input from '@/Components/ui/Input'

const MOCK_USERS = [
  { id: 1, username: 'developer', password: 'dev123', role: 'developer', name: 'John Developer' },
  { id: 2, username: 'manager', password: 'mgr123', role: 'manager', name: 'Jane Manager' }
]

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const login = useStore(state => state.login)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Mock authentication
    const user = MOCK_USERS.find(
      u => u.username === credentials.username && u.password === credentials.password
    )
    
    if (user) {
      login(user)
    } else {
      setError('Invalid username or password')
    }
    
    setLoading(false)
  }
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <div>
          <Input
            label="Username"
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            required
          />
        </div>
        
        <div>
          <Input
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
            required
          />
        </div>
        
        <Button style={{border: '1px solid black', borderRadius: '0.375rem' }} type="submit" className="w-full" loading={loading}>
          Sign In
        </Button>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
          <p className="font-medium text-gray-700 mb-2">Demo Credentials:</p>
          <p><strong>Developer:</strong> developer / dev123</p>
          <p><strong>Manager:</strong> manager / mgr123</p>
        </div>
      </form>
    </div>
  )
}