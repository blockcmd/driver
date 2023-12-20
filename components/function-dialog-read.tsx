"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContractRead } from 'wagmi'
import abi from '@/abi/Wagmigotchi.json'

export default function FunctionDialogRead({ functionObject }: { functionObject: any }) {

  const { data, isError, isLoading } = useContractRead({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: abi,
    functionName: functionObject.name,
  })

  // Function to handle the button click
  const handleClick = async () => {
    try {
        console.log(data); // Set the data state with the response
    } catch (error) {
        console.error('Error reading data from the contract:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Read</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-3/4 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{functionObject.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {
            functionObject.inputs.length !== 0 ? (
              functionObject.inputs.map((input: any, index: number) => (
                <div key={index} className="flex flex-col gap-4">
                  <Label htmlFor="name" className="font-mono">
                    {input.name}
                  </Label>
                  <Input
                    id="name"
                    placeholder={input.type}
                    className="col-span-4 font-mono"
                  />
                </div>
              ))
            ) : (
              <p>No inputs</p>
            )
          }
        </div>
        <DialogFooter>
          {
            functionObject.stateMutability === "nonpayable" ? (
              <Button variant="secondary">Write</Button>
            ) : 
            functionObject.stateMutability === "payable" ? (
              <Button variant="secondary">Write</Button>
            ) :
            (
              <Button onClick={handleClick} variant="secondary">Read</Button>
            )
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}