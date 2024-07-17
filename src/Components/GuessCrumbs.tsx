import React, { useContext } from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import { GameStateContext } from '../Context/GameStateContext'

export const GuessCrumbs = () => {
  const { gameState } = useContext(GameStateContext);

//   const evals = gameState.items.map(() => 0) 
  const evals = [0,1,-1,1,0]
  return (
    <div className="w-full mx-auto flex justify-center">
        <Breadcrumbs className='bg-white p-4 rounded mx-auto'>
        {gameState.items.map((item:any, idx:any)=> (
            <BreadcrumbItem classNames={
                {
                    item: `text-2xl text-red-400  ${evals[idx] === 0 ? 'text-green-400' : evals[idx] === -1 ? 'text-red-400' : 'text-yellow-500'}` ,
                    separator: `text-2xl text-black font-bold`
                }
            } disableAnimation={true} >
                {item.PLAYER_NAME}
            </BreadcrumbItem>
        ))}
        </Breadcrumbs>        
    </div>
  )
}
