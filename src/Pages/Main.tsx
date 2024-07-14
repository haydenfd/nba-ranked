import React from 'react'
import { BarChartIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import {Button} from "@nextui-org/react";

export const Main = () => {
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='bg-red-800 text-white text-center drop-shadow-xl flex flex-row justify-between items-stretch'>
        <div className=' w-[15%] py-2 flex items-center justify-center'>
            <Button color="default" className="text-medium px-6" startContent={<BarChartIcon className='scale-125'/>}>
                Statistics
            </Button>    
        </div>
        <div className='flex-1 py-2 flex items-center justify-center'>
          <h1 className='font-semibold text-4xl'>NBA Rank 5</h1>
        </div>
        <div className='w-[15%] py-2 flex items-center justify-center'>
            <Button color="default" className="text-medium px-6" startContent={<QuestionMarkCircledIcon className='scale-125'/>}>
                Guide
            </Button> 
        </div>
      </div>
      <div className='flex-1 text-white mt-8 w-11/12 mx-auto'>
        <h2>Main content</h2>
      </div>
    </div>
  )
}
