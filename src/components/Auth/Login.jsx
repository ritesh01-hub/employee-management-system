import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

function Login() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      return setError('Please enter both email and password')
    }

    const result = login(formData.email, formData.password)
    if (!result.success) {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-1">Welcome Back</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Sign in to your account
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Sign In
        </button>

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-600">
          <p className="font-semibold mb-1">Demo credentials</p>
          <p>Admin: admin@gmail.com / 123</p>
          <p>Employee: employee1@gmail.com / 123</p>
        </div>
      </form>
    </div>
  )
}

export default Login