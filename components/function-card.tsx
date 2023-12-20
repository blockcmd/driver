"use client"

import { Badge } from "@/components/ui/badge"
import FunctionDialogRead from "./function-dialog-read"
import FunctionDialogReadWithArgs from "./function-dialog-read-with-args"

export default function FunctionCard({ functionObject }: { functionObject: any }) {


  return (
    <div className="flex flex-col gap-4 w-1/3 border-2 p-4 rounded-md">
      <div className="flex flex-row justify-between items-center">
        <h3 id={functionObject.name} className="scroll-m-20 text-lg font-semibold tracking-tight">{functionObject.name}</h3>
        {/* <FunctionDialog functionObject={functionObject} /> */}
        {
          functionObject.stateMutability === 'view' && functionObject.inputs.length == 0 ? (
            <FunctionDialogRead functionObject={functionObject} />
          ) : (
            <FunctionDialogReadWithArgs functionObject={functionObject} />
          )
        }
      </div>    
    </div>
  )
  
  // return (
  //   <div className="flex flex-col gap-4 w-full border-2 p-4 rounded-md">
  //     <div className="flex flex-row justify-between items-center">
  //       <h3 id={functionObject.name} className="scroll-m-20 text-2xl font-semibold tracking-tight">{functionObject.name}</h3>
  //       {/* <FunctionDialog functionObject={functionObject} /> */}
  //       {
  //         functionObject.stateMutability === 'view' && functionObject.inputs.length == 0 ? (
  //           <FunctionDialogRead functionObject={functionObject} />
  //         ) : (
  //           <FunctionDialogReadWithArgs functionObject={functionObject} />
  //         )
  //       }
  //     </div>

  //     <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Inputs</h4>
  //     <div className="flex flex-col gap-2">
  //       {
  //         functionObject.inputs.length !== 0 ? (
  //           functionObject.inputs.map((input: any, index: number) => (
  //             <div key={index} className="flex flex-row gap-2">
  //               {
  //                 input.name ? (
  //                   <p className="ml-4 font-mono">{input.name}</p>
  //                 ) : (
  //                   <p className="ml-4 font-mono">_____</p>
  //                 )
  //               }
                
  //               <Badge className="font-mono">{input.type}</Badge>
  //             </div>
  //           ))
  //         ) : (
  //           <p className="ml-4 font-mono">No inputs</p>
  //         )
  //       }
  //     </div>
  //     <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Outputs</h4>
  //     <div className="flex flex-col gap-2">
  //       {
  //         functionObject.inputs.length !== 0 ? (
  //           functionObject.inputs.map((input: any, index: number) => (
  //             <div key={index} className="flex flex-row gap-2">
  //               {
  //                 input.name ? (
  //                   <p className="ml-4 font-mono">{input.name}</p>
  //                 ) : (
  //                   <p className="ml-4 font-mono">_____</p>
  //                 )
  //               }
                
  //               <Badge className="font-mono">{input.type}</Badge>
  //             </div>
  //           ))
  //         ) : (
  //           <p className="ml-4 font-mono">No outputs</p>
  //         )
  //       }
  //     </div>      
  //   </div>
  // )
}