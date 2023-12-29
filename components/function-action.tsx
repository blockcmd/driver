"use client"

import { useSearchParams } from "next/navigation"
import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import abi from '@/abi/ZxStim.json'
import { serialize, deserialize } from 'wagmi'
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function FunctionAction() {
  const searchParams = useSearchParams()
  const functionIndex: string | null = searchParams.get('functionIndex')

  // clear result when functionIndex changes
  useEffect(() => {
    setArgs([])
    setResult("n/a")
  }, [functionIndex])

  const functionObject = abi.filter((functionObject: any) => functionObject.type === 'function')
  const [fetch, setFetch] = useState<any>(false)
  const [prepareWrite, setPrepareWrite] = useState<any>(false)
  const [result, setResult] = useState<any>("n/a")
  const [args, setArgs] = useState<any>([])



  // useContractRead hook to read data from the contract
  const { data: readData, isError: readError, isLoading: readLoading } = useContractRead({
    address: '0x0614c46364aE6a98938d551bCa8d0CCA46e86576',
    abi: abi,
    functionName: functionIndex !== null ? functionObject[Number(functionIndex)].name : '',
    enabled: fetch,
    args: args,
    onSuccess(readData) {
      setResult(serialize(readData))
      setFetch(false)
      setArgs([])
    },
  })

  
  // useContractWrite hook to write data to the contract
  const { data: writeData, isLoading: writeLoading, isSuccess: writeSuccess, write } = useContractWrite({
    address: '0x0614c46364aE6a98938d551bCa8d0CCA46e86576',
    abi: abi,
    functionName: functionIndex !== null ? functionObject[Number(functionIndex)].name : '',
    args: args,
    onSuccess(writeData) {
      setResult(writeData.hash)
      setArgs([])
    }
  })
  
  // this function format the output for bigint types
  function formatOutput(data: any) {
    if (data.includes("#bigint.")) {
      return data.replace("#bigint.", "").replaceAll('"', '')
    }
    return data.replaceAll('"', '')
  }

  function clearData() {
    setResult("n/a")
    setArgs([])
  }

  // this function allows arguments to be added to the args state
  function handleArgsChange(e: any, index: number) {
    // create a copy of the inputs state
    const list = [...args]
    // update the list with the new value
    list[index] = e.target.value
    // update the state with the new list
    setArgs(list)
  }

  return (
    <div className="w-full border-2 p-4 rounded-md">
      {
        // show the functionObject at the functionIndex
        functionIndex !== null && functionObject[Number(functionIndex)] ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h3 id={functionObject[Number(functionIndex)].name} className="scroll-m-20 text-2xl font-semibold tracking-tight">{functionObject[Number(functionIndex)].name}</h3>
              <Separator />
              <h3>Inputs:</h3>
              {
                functionObject[Number(functionIndex)].stateMutability === 'view' && functionObject[Number(functionIndex)].inputs.length == 0 
                ? (
                  <div className="flex flex-col gap-4">
                    <p>No inputs required</p>
                    <Button onClick={() => setFetch(true)} className="w-fit font-mono">Read</Button>
                  </div>
                ) 
                : functionObject[Number(functionIndex)].stateMutability === 'view' && functionObject[Number(functionIndex)].inputs.length !== 0 
                ? (
                  <div className="flex flex-col gap-4">
                    {
                      functionObject[Number(functionIndex)].inputs.map((input: any, index: number) => (
                        <div key={index} className="grid grid-cols-5 gap-2 items-center">
                          <Label className="font-mono" htmlFor={input.name}>{input.name}</Label>
                          <Input
                            type="text"
                            id={input.name}
                            name={input.name}
                            placeholder={input.type}
                            className="col-span-4 border-2 p-2 rounded-md w-full"
                            onChange={(e: any) => handleArgsChange(e, index)}
                          />
                        </div>
                      ))
                    }
                    <Button onClick={() => setFetch(true)} className="w-fit font-mono">Read</Button>
                  </div>
                )
                : (
                  <div className="flex flex-col gap-4">
                    {
                      functionObject[Number(functionIndex)].inputs.map((input: any, index: number) => (
                        <div key={index} className="grid grid-cols-5 gap-2 items-center">
                          <Label className="font-mono" htmlFor={input.name}>{input.name}</Label>
                          <Input
                            type="text"
                            id={input.name}
                            name={input.name}
                            placeholder={input.type}
                            className="col-span-4 border-2 p-2 rounded-md w-full"
                            onChange={(e) => handleArgsChange(e, index)}
                          />
                        </div>
                      ))
                    }
                  <Button disabled={!write} onClick={() => write?.()} className="w-fit font-mono">Write</Button>
                </div>
                )
              }
              <Separator />
              <h3>Outputs:</h3>
              {
                functionObject[Number(functionIndex)].stateMutability === 'view'
                ? (
                    readLoading
                    ? <Skeleton className="h-4 w-[100px]" /> 
                    : (
                        <div className="flex flex-row gap-2 items-center">
                          <Badge className="h-fit w-fit font-mono">{functionObject[Number(functionIndex)]?.outputs?.[0]?.type ?? "n/a"}</Badge>
                          <Separator orientation="vertical" />
                          <p className="border-2 p-2 rounded-md w-full">{formatOutput(result)}</p>
                        </div>
                      )
                )
                : (
                  writeLoading
                  ? (
                    <div className="flex flex-row gap-2">
                      <Skeleton className="h-4 w-[70px]" />
                      <p>Please confirm the transaction with your connected wallet</p> 
                    </div>
                    
                  )
                  
                  : (
                      <div className="flex flex-row gap-2 items-center">
                        <Badge className="h-fit w-fit font-mono">hash</Badge>
                        <Separator orientation="vertical" />
                        <p className="border-2 p-2 rounded-md w-full">{result}</p>
                      </div>
                    )
                )
              }
              <Button onClick={clearData} className="w-fit font-mono">Clear</Button>
            </div>
          </div>
        ) : (
          <h3 className="scroll-m-20 text-md font-semibold tracking-tight">No function selected</h3>
        )
      }
    </div>
  )
}