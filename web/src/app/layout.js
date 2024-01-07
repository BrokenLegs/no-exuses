import { Inter } from 'next/font/google'
import './globals.css'
import NavMenu from '@/components/NavMenu'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (

    <main className="app-container min-h-screen max-w-2xl mx-auto bg-background text-primary-text relative">
      {children}
      <NavMenu />
    </main>

  )
}
