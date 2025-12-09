import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { HeadContent, Link, Scripts, createRootRouteWithContext } from '@tanstack/react-router'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import type { Session } from '@/integrations/better-auth/auth-client'
import type { Theme } from '@/features/abstractions/components/reused/theme'
import {
  ThemeToggle,
  getThemeCookieFn,
  useTheme,
} from '@/features/abstractions/components/reused/theme'

import { cn } from '@/features/abstractions/lib/utils'
import { findSessionFn } from '@/features/users/functions/find-session-fn'
import { Footer } from '@/features/abstractions/components/reused/footer'
import { Toaster } from '@/features/abstractions/components/primitives/sonner'
import { NotFound } from '@/features/abstractions/components/reused/not-found'
import { Button } from '@/features/abstractions/components/primitives/button'
import {
  Header,
  HeaderActions,
  HeaderLogo,
  HeaderSignOutButton,
} from '@/features/abstractions/components/reused/header'

interface MyRouterContext {
  queryClient: QueryClient
  session: Session | null
  theme?: Theme
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    const theme = await getThemeCookieFn()
    const session = await findSessionFn()
    return {
      theme,
      session,
    }
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { title: 'Contacts App' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    ],
  }),
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { session, theme: hydratedTheme = 'light' } = Route.useRouteContext()
  const { theme, setTheme } = useTheme({ theme: hydratedTheme })

  return (
    <html lang="en">
      <head>
        <meta rel="icon" />
        <HeadContent />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          'bg-background text-foreground grid h-screen grid-rows-[auto_1fr] overflow-hidden',
          theme === 'dark' ? 'dark' : '',
        )}
      >
        <Header className="h-15">
          <HeaderLogo />
          <HeaderActions session={session}>
            {session?.user ? (
              <>
                <span className="hidden italic lg:block">Welcome, {session.user.name}</span>
                <HeaderSignOutButton />
                <Button asChild className="min-w-25">
                  <Link to="/console">My Contacts</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="min-w-25">
                  <Link to="/signin">Signin</Link>
                </Button>

                <Button asChild className="min-w-25">
                  <Link to="/signup">Signup</Link>
                </Button>
              </>
            )}

            <ThemeToggle theme={theme} onChange={setTheme} />
          </HeaderActions>
        </Header>

        <main className="flex min-h-0 flex-col overflow-auto">
          <div className="flex-1">{children}</div>

          <Footer className="mt-auto w-full">
            <Footer.Copyrights />
          </Footer>
        </main>

        <Toaster closeButton richColors theme="light" />

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
