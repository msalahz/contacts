import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        Contacts App
      </section>
    </div>
  )
}
