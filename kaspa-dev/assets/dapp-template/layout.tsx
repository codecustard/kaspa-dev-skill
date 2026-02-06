import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kaspa dApp',
  description: 'A Kaspa blockchain dApp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
