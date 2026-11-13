import { useAuth } from './hooks/useAuth'
import Login from './components/Auth/Login'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'

function App() {
  const { user } = useAuth()

  if (!user) return <Login />
  if (user.role === 'admin') return <AdminDashboard />

  return <EmployeeDashboard />
}

export default App