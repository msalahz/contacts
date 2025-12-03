import { createFileRoute } from '@tanstack/react-router'

import { authMiddleware } from '@/integrations/better-auth/middleware'

export const Route = createFileRoute('/console/')({
  server: {
    middleware: [authMiddleware],
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/console/"!</div>
}
