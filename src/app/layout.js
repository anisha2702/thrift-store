import './globals.css'

import AuthProvider from '@/components/AuthProvider'
import { CartProvider } from '@/context/CartContext'
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose weights you need
  display: "swap",
});

export const metadata = {
  title: 'Thrifnix',
  description: 'Buy and sell thrifted fashion from all over India.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${montserrat.variable} font-sans`}>
        <CartProvider>
        <AuthProvider>
          
        

        
        <main className="">{children}</main>
        </AuthProvider>
        </CartProvider>
      </body>
    </html>
  )
}
