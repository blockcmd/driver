'use client'

import abi from '@/abi/ZxStim.json'
import FunctionDashboard from '@/components/function-dashboard'
import Link from 'next/link'
import { ConnectKitButton } from 'connectkit'



export default function Home() {

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex flex-col gap-10 max-w-full w-full text-sm">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4">
            <Link href="#functions" className="text-2xl font-bold underline">Functions</Link>
            {/* <Link href="#events" className="text-2xl font-bold underline">Events</Link> */}
          </div>
          <ConnectKitButton />
        </div>
        <div className="flex flex-col gap-8">
          <h1 id="functions" className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Functions</h1>
          <div className="flex flex-col gap-4">
            <FunctionDashboard abi={abi} />
          </div>
        </div>
      </div>
    </main>
  )
}
