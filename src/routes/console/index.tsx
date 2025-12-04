import { createFileRoute } from '@tanstack/react-router'

import { authRequestMiddleware } from '@/integrations/better-auth/auth-request-middleware'

export const Route = createFileRoute('/console/')({
  server: {
    middleware: [authRequestMiddleware],
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/console/"!</div>
}
