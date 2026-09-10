import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Landing from '@/pages/Landing'
import Login from '@/pages/auth/Login'
import Dashboard from '@/pages/Dashboard'
import ProtectedRoute from '@/routes/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Landing />} />
          <Route path="auth/login" element={<Login />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute roles={['mahasiswa', 'asisten']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
