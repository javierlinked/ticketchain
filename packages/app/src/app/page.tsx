import { redirect } from 'next/navigation'

/**
 * Home page redirects to tickets page
 * This provides a cleaner separation and allows for a potential
 * landing page in the future without affecting the tickets route
 */
export default function Home() {
  redirect('/tickets')
}
