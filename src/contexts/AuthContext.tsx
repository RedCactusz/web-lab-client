import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authService, getToken } from '@/services'
import type { User } from '@/services'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (nim: string, password: string) => Promise<void>
  logout: () => Promise<void>
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(() => getToken() !== null)

  useEffect(() => {
    if (!getToken()) return
    authService
      .getUser()
      .then(setUser)
      .catch(() => authService.logout())
      .finally(() => setIsLoading(false))
  }, [])

  const login = useCallback(async (nim: string, password: string) => {
    const user = await authService.login(nim, password)
    setUser(user)
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
    window.location.href = '/auth/login'
  }, [])

  const hasRole = useCallback((role: string) => user?.role === role, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
