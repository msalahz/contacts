import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { auth } from '@/integrations/better-auth/auth'

export const findSessionFn = createServerFn({ method: 'GET' }).handler(() => {
  const request = getRequest()
  return auth.api.getSession({ headers: request.headers })
})
