import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/move/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/move/$slug"!</div>
}
