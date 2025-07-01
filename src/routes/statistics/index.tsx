import { StatisticsPanel } from '@/page'
import { authGuard } from '@/shared'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/statistics/')({
  component: StatisticsPanel,
  //beforeLoad: authGuard
})

