import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FunctionCard({ functionObject }: { functionObject: any }) {
  return (
    <div className="flex flex-col gap-4 w-full border-2 p-4 rounded-md">
      <div className="flex flex-row justify-between items-center">
        <h3 id={functionObject.name} className="scroll-m-20 text-2xl font-semibold tracking-tight">{functionObject.name}</h3>
        <Dialog>
          <DialogTrigger asChild>
            {
              functionObject.stateMutability === "nonpayable" ? (
                <Button variant="secondary">Write</Button>
              ) : 
              functionObject.stateMutability === "payable" ? (
                <Button variant="secondary">Write</Button>
              ) :
              (
                <Button variant="secondary">Read</Button>
              )
            }
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] h-3/4 overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>{functionObject.name}</DialogTitle>
              {/* <DialogDescription>
                Make changes to your profile here.
              </DialogDescription> */}
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
                  <Button variant="secondary">Read</Button>
                )
              }
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Inputs</h4>
      <div className="flex flex-col gap-2">
        {
          functionObject.inputs.length !== 0 ? (
            functionObject.inputs.map((input: any, index: number) => (
              <div key={index} className="flex flex-row gap-2">
                {
                  input.name ? (
                    <p className="ml-4 font-mono">{input.name}</p>
                  ) : (
                    <p className="ml-4 font-mono">_____</p>
                  )
                }
                
                <Badge className="font-mono">{input.type}</Badge>
              </div>
            ))
          ) : (
            <p className="ml-4 font-mono">No inputs</p>
          )
        }
      </div>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Outputs</h4>
      <div className="flex flex-col gap-2">
        {
          functionObject.inputs.length !== 0 ? (
            functionObject.inputs.map((input: any, index: number) => (
              <div key={index} className="flex flex-row gap-2">
                {
                  input.name ? (
                    <p className="ml-4 font-mono">{input.name}</p>
                  ) : (
                    <p className="ml-4 font-mono">_____</p>
                  )
                }
                
                <Badge className="font-mono">{input.type}</Badge>
              </div>
            ))
          ) : (
            <p className="ml-4 font-mono">No outputs</p>
          )
        }
      </div>      
    </div>
  )
}