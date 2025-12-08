import { MoonIcon, SunIcon } from 'lucide-react'
import { Store, useStore } from '@tanstack/react-store'

import { createServerFn, useServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { useMutation } from '@tanstack/react-query'
import { cn, noop } from '@/features/abstractions/lib/utils'
import { Button } from '@/features/abstractions/components/primitives/button'

export const themeSchema = z.union([z.literal('light'), z.literal('dark')])

export type Theme = z.infer<typeof themeSchema>

export interface ThemeStoreState {
  theme: Theme
}

export const defaultThemeState: ThemeStoreState = { theme: 'dark' }

export const setThemeCookieFn = createServerFn()
  .inputValidator(themeSchema)
  .handler(({ data }) => {
    setCookie('theme', data, {
      path: '/',
      maxAge: 365 * 24 * 60 * 60, // 1 year
    })
  })

export const getThemeCookieFn = createServerFn().handler(() => {
  const theme = getCookie('theme')
  return themeSchema.safeParse(theme).data
})

export function ThemeToggle({
  theme,
  onChange = noop,
}: {
  theme: Theme
  onChange?: (theme: Theme) => void
}) {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => onChange(theme === 'light' ? 'dark' : 'light')}
    >
      <MoonIcon className={cn(theme === 'light' ? 'hidden' : 'block')} />
      <SunIcon className={cn(theme === 'dark' ? 'hidden' : 'block')} />
    </Button>
  )
}

export function useTheme(initialState?: ThemeStoreState) {
  const setThemeCookie = useServerFn(setThemeCookieFn)
  const { mutate } = useMutation({
    mutationKey: ['set-theme-cookie'],
    mutationFn: setThemeCookie,
  })

  const store = new Store<ThemeStoreState>(initialState ?? defaultThemeState)
  const theme = useStore(store, (state) => state.theme)

  function setTheme(newTheme: Theme) {
    mutate({ data: newTheme })
    store.setState((state) => ({ ...state, theme: newTheme }))
  }

  return { store, theme, setTheme }
}
