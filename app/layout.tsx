import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BlockCMD - Smart Contract Read/Write',
  description: 'Read and Write to your smart contract with ease',
  metadataBase: new URL('https://www.blockcmd.com'),
  openGraph: {
    title: 'BlockCMD - Smart Contract Read/Write',
    description: 'Read and Write to your smart contract with ease',
    url: 'https://www.blockcmd.com',
    siteName: 'BlockCMD',
    images: [
      {
        url: '/blockcmd-tbn.png',
        width: 1200,
        height: 630,
        alt: 'og-image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlockCMD',
    description: 'Read and Write to your smart contract with ease',
    creator: '@zxstim',
    images: ['/blockcmd-tbn.png'],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
