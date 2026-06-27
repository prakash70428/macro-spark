import { redirect } from 'next/navigation'

// Canonical URL is /markets — redirect wrong variants
export default function MarketRedirect() {
  redirect('/markets')
}
