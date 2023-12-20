import { Button } from '@/components/ui/button'
import { useAccount, useBalance, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import type { Address } from 'wagmi'


export default function ConnectWallet () {
  const { address, isConnected } = useAccount()
  const { data, isError, isLoading } = useBalance({
    address,
  })
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const { disconnect } = useDisconnect()

  return (
    <div className="flex flex-col gap-4">
      {
        isConnected ? (
          <div className="flex flex-col gap-2">
            <Button className="place-self-end w-fit">Connected: {ensName ?? address}</Button>
            <Button variant="outline" className="place-self-end w-fit">{data?.formatted} {data?.symbol}</Button>
            <Button variant="destructive" onClick={() => disconnect()} className="place-self-end w-fit">Disconnect</Button>        
          </div>
        ) : (
          <Button onClick={() => connect()} className="place-self-end w-fit">Connect wallet</Button>
        )
      }
    </div>
  )
}