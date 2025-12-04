import { Link } from '@tanstack/react-router'
import { Button } from '@/features/abstractions/components/primitives/button'

export function NotFound() {
  return (
    <section className="relative py-20 px-6 text-center overflow-hidden">
      <div>Not Found</div>
      <Button asChild>
        <Link to="/">Go to Home</Link>
      </Button>
    </section>
  )
}
