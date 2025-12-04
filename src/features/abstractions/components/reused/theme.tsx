import { MoonIcon, SunIcon } from 'lucide-react'
import { Store, useStore } from '@tanstack/react-store'

import { cn } from '@/features/abstractions/lib/utils'
import { Button } from '@/features/abstractions/components/primitives/button'

export interface ThemeStoreState {
  theme: 'light' | 'dark'
}

export const themeStore = new Store<ThemeStoreState>({
  theme: 'dark', // 'light' | 'dark'
})

export function setTheme(theme: ThemeStoreState['theme']) {
  themeStore.setState((state) => ({ ...state, theme }))
}

export function Theme() {
  const theme = useStore(themeStore, (state) => state.theme)

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <MoonIcon className={cn(theme === 'dark' ? 'hidden' : 'block')} />
      <SunIcon className={cn(theme === 'light' ? 'hidden' : 'block')} />
    </Button>
  )
}

export function useTheme() {
  return useStore(themeStore, (state) => state.theme)
}
