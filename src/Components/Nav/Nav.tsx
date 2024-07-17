import React from 'react'
import { BarChartIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import {Button} from "@nextui-org/react";

export const Nav = () => {
  return (
    <div className='bg-gray-700 text-white text-center drop-shadow-xl flex flex-row justify-between items-stretch'>
        <div className='w-[15%] py-6 flex items-center justify-center'>
            <Button 
              color="default" 
              className="text-medium px-2 md:px-6 md:py-6 rounded-full md:rounded-lg bg-transparent border-2 border-transparent hover:border-white transition ease-in-out delay-150 flex-shrink"
              startContent={<BarChartIcon className='scale-[150%] text-white mr-2' />}
              onClick={() => alert('Clicked guide!')}
            >
              <span className="hidden md:inline text-xl text-white">Statistics</span>
            </Button>    
        </div>
        <div className='flex-1 flex items-center justify-center flex-shrink'>
            <h1 className='font-semibold text-4xl underline underline-offset-4'>NBA Rank 5</h1>
        </div>
        <div className='w-[15%] py-8 flex items-center justify-center flex-shrink'>
            <Button 
              color="default" 
              className="text-medium px-2 md:px-6 md:py-6 rounded-full md:rounded-lg bg-transparent border-2 border-transparent hover:border-white transition ease-in-out delay-150"
              startContent={<QuestionMarkCircledIcon className='scale-[150%] text-white md:mr-2' />}
              onClick={() => alert('Clicked guide!')}
            >
              <span className="hidden md:inline text-xl text-white">Guide</span>
            </Button> 
        </div>
    </div>
  )
};
