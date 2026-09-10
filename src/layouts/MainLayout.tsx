import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="text-lg font-bold">
            Lab SGG
          </Link>
          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <span className="text-sm text-gray-500">{user?.nama}</span>
                <button
                  onClick={() => void logout()}
                  className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-700"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t bg-white py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Lab SGG
      </footer>
    </div>
  )
}
