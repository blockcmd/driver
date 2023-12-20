"use client"

import { useState } from "react"
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

export default function FunctionDialogReadWithArgs({ functionObject }: { functionObject: any }) {


  // create state for inputs based on functionObject.inputs.length so for example, if the functionObjects.inputs.length is 2, then the state will be an array of 2 empty strings
  const [inputs, setInputs] = useState(['0x0000000000000000000000000000000000000000'])

  const { data, isError, isLoading } = useContractRead({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: abi,
    functionName: functionObject.name,
    args: inputs
  })
  //0x321ded1fabaa2cce3887175d63623de999dc10ea
  //0x47f09C6079A82Ad25aF75037819a4Edf3291Ef7f

  // Function to handle the button click
  const handleClick = async () => {
    try {
        console.log(data); // Set the data state with the response
    } catch (error) {
        console.error('Error reading data from the contract:', error);
    }
  };

  function handleInputChange(e: any, index: number) {
    // create a copy of the inputs state
    setInputs(Array(e.target.value))
  }

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
                    id={index.toString()}
                    placeholder={input.type}
                    className="col-span-4 font-mono"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              ))
            ) : (
              <p>No inputs</p>
            )
          }
        </div>
        <DialogFooter>
          <Button onClick={handleClick} variant="secondary">Read</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}