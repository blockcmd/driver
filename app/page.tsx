'use client'

import abi from '@/abi/ZxStim.json'
import FunctionDashboard from '@/components/function-dashboard'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { mainnet, sepolia, klaytn, klaytnBaobab } from 'wagmi/chains'
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


export default function Home() {
  const [alchemyId, setAlchemyId] = useState("")
  const [walletConnectProjectId, setWalletConnectProjectId] = useState("")
  const [complete, setComplete] = useState("")
  
  useEffect(() => {
    const COMPLETE_STATUS = localStorage.getItem("COMPLETE_STATUS") || ""
    setComplete(COMPLETE_STATUS)
  }, [])

  if (complete !== "true") {
    return (
      <main className="flex min-h-screen flex-col p-24">
        <div className="flex flex-col gap-10 max-w-full w-full text-sm">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Welcome to BlockCMD</h1>
            <p className="text-lg">To get started, please enter your credentials below.</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="alchemyId" className="text-md">Alchemy ID</Label>
              <Input name="alchemyId" type="text" value={alchemyId} onChange={(e) => setAlchemyId(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="walletConnectProjectId" className="text-md">WalletConnect Project ID</Label>
              <Input name="walletConnectProjectId" type="text" value={walletConnectProjectId} onChange={(e) => setWalletConnectProjectId(e.target.value)} />
            </div>
            <Button onClick={() => {
              localStorage.setItem("ALCHEMY_ID", alchemyId)
              localStorage.setItem("WALLETCONNECT_PROJECT_ID", walletConnectProjectId)
              localStorage.setItem("COMPLETE_STATUS", "true")
              window.location.reload()
            }}>Save</Button>
          </div>
        </div>  
      </main>
    )
  }
  // Choose which chains you'd like to show
  const chains = [mainnet, sepolia, klaytn, klaytnBaobab];

  const config = createConfig(
    getDefaultConfig({
      // Required API Keys
      alchemyId: localStorage.getItem("ALCHEMY_ID") ?? '', // or infuraId
      walletConnectProjectId: localStorage.getItem("WALLETCONNECT_PROJECT_ID") ?? '',
      chains,
      // Required
      appName: "BlockCMD",

      // Optional
      appDescription: "Read and write to smart contracts with ease",
      appUrl: "https://blockcmd.com", // your app's url
      appIcon: "https://blockcmd.com/blockcmd-logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
  )

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <main className="flex min-h-screen flex-col p-24">
          <div className="flex flex-col gap-10 max-w-full w-full text-sm">
            <Link href="/" className="text-2xl font-bold underline">Home</Link>
            <div className="self-end">
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
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
