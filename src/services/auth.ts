import { api, getToken, removeToken, setToken } from './api'

export interface User {
  id: number
  nama: string
  nim: number
  surel: string | null
  angkatan: number | null
  is_asisten: boolean
  role: 'mahasiswa' | 'asisten'
}

interface LoginResponse {
  user: User
  token: string
}

interface MeResponse {
  user: User
}

export const authService = {
  async login(nim: string, password: string): Promise<User> {
    const response = await api<LoginResponse>('/api/client/login', {
      method: 'POST',
      body: JSON.stringify({ nim, password }),
    })
    setToken(response.token)
    return response.user
  },

  async getUser(): Promise<User> {
    const response = await api<MeResponse>('/api/client/me')
    return response.user
  },

  async logout(): Promise<void> {
    try {
      if (getToken()) {
        await api('/api/client/logout', { method: 'POST' })
      }
    } finally {
      removeToken()
    }
  },
}
