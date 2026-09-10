import { useAuth } from '@/contexts/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user && (
        <div className="mt-6 rounded-lg border bg-white p-6">
          <p className="text-lg font-semibold">{user.nama}</p>
          <p className="mt-1 text-sm text-gray-600">
            NIM: {user.nim} · Role: {user.role}
          </p>
        </div>
      )}
    </section>
  )
}
