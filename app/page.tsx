'use client'

import abi from '@/abi/Wagmigotchi.json'
import FunctionCard from '@/components/function-card'
import Link from 'next/link'
import { ConnectKitButton } from 'connectkit'



export default function Home() {

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex flex-col gap-10 max-w-5xl w-full text-sm">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4">
            <Link href="#functions" className="text-2xl font-bold underline">Functions</Link>
            {/* <Link href="#events" className="text-2xl font-bold underline">Events</Link> */}
          </div>
          <ConnectKitButton />
        </div>

        {/* <div className="flex flex-col fixed border-2 rounded-md right-2 top-2 p-4 overflow-auto">
          <h2>Menu</h2>
          {
            abi.map((functionObject, index) => (
              <a href={`#${functionObject.name}`} key={index}>{functionObject.name}</a>
            ))
          }
        </div> */}

        <div className="flex flex-col gap-8">
          <h1 id="functions" className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Functions</h1>
          <div className="flex flex-col gap-4">
            {
              abi.filter((functionObject) => functionObject.type === 'function').map((functionObject, index) => (
                <FunctionCard key={index} functionObject={functionObject} />
              ))
            }
          </div>
        </div>
        {/* <div className="flex flex-col gap-8">
          <h1 id="events" className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">Events</h1>
          <div className="flex flex-col gap-4">
            {
              abi.filter((functionObject) => functionObject.type === 'event').map((functionObject, index) => (
                <FunctionCard key={index} functionObject={functionObject} />
              ))
            }
          </div>
        </div> */}
      </div>
    </main>
  )
}
