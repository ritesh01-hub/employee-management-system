import { useAuth } from '../../hooks/useAuth'

function Header({ title }) {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500 text-sm">
          Hello, {user.name} ({user.role})
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
      >
        Log Out
      </button>
    </div>
  )
}

export default Header