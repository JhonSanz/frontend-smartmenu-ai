

import { Inter } from 'next/font/google'
import Providers from '@/components/providers'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'smartmenu-ai',
  description: 'Manage your buissines with smartmenu-ai!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: "0px" }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
