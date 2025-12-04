import { createFileRoute } from '@tanstack/react-router'

import {
  Item,
  ItemTitle,
  ItemContent,
  ItemDescription,
} from '@/features/abstractions/components/primitives/item'
import { signOutFn } from '@/features/users/functions/sign-out-fn'

export const Route = createFileRoute('/sign-out')({
  preload: false,
  loader: () => signOutFn(),
  component: RouteComponent,
})

function RouteComponent() {
  const { error, message } = Route.useLoaderData()

  if (error) {
    return (
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Sign out failed</ItemTitle>
          <ItemDescription>{message}</ItemDescription>
        </ItemContent>
      </Item>
    )
  }

  return (
    <section className="flex min-h-full flex-col items-center justify-center p-6">
      Signing out...
    </section>
  )
}
