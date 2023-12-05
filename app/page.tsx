'use client'

import { Button } from '@/components/ui/button'
// import { createPublicClient, http } from 'viem'
import { goerli } from 'viem/chains'
import { useState } from 'react'
import abi from '@/abi/Marketplace.json'
import FunctionCard from '@/components/function-card'
import Link from 'next/link'
import { useAccount, useBalance, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import type { Address } from 'wagmi'

export default function Home() {

  const { address, isConnected } = useAccount()
  // const { data, refetch } = useBalance({
  //   address,
  //   watch: true,
  // })
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const { disconnect } = useDisconnect()

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex flex-col gap-10 max-w-5xl w-full text-sm">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4">
            <Link href="#functions" className="text-2xl font-bold underline">Functions</Link>
            <Link href="#events" className="text-2xl font-bold underline">Events</Link>
          </div>

            {
            isConnected ? (
              <div className="flex flex-row gap-2">
                <Button className="place-self-end w-fit">Connected: {ensName ?? address}</Button>
                <Button variant="destructive" onClick={() => disconnect()} className="place-self-end w-fit">Disconnect</Button>        
              </div>
            ) : (
              <Button onClick={() => connect()} className="place-self-end w-fit">Connect wallet</Button>
            )
          }
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
        <div className="flex flex-col gap-8">
          <h1 id="events" className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">Events</h1>
          <div className="flex flex-col gap-4">
            {
              abi.filter((functionObject) => functionObject.type === 'event').map((functionObject, index) => (
                <FunctionCard key={index} functionObject={functionObject} />
              ))
            }
          </div>
        </div>
      </div>
    </main>
  )
}
