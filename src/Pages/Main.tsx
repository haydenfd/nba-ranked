import React, { useContext, useEffect, useState } from 'react'
import { Nav } from '../Components';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../APIConfig/config';
import { Drag } from '../Components/Draggable';
import { Button } from '@nextui-org/react';
import { GameStateContext } from '../Context/GameStateContext';
import { GuessCrumbs } from '../Components/GuessCrumbs';

type NumAttemptsType = 0 | 1 | 2 | 3;

export const Main = () => {

  const { gameState, incrementAttempts, canSubmit, setItems } = useContext(GameStateContext);
  useEffect(() => {

    // check if new user via localStorage
    if (!localStorage.getItem('user_uuid')) {
      const initUser = async () => {
        axios.get(`${BASE_URL}init-user`).then((res) => {
          const { user_uuid, session_uuid, players } = res.data;
          localStorage.setItem('user_uuid', user_uuid);
          localStorage.setItem('session_uuid', session_uuid);
          localStorage.setItem('session_active_status', "true");
          localStorage.setItem('players', JSON.stringify(players));
          setItems(players);
        })
      }

      initUser();
    }

    // check if user ended a round but did not start a new one (just display old session)
    // else if (!localStorage.getItem('is_active_session')) {
    //   axios.get(`${BASE_URL}retrieve-inactive-session`).then((res) => {
    //     return res.data
    //   }).then((resp) => console.log(resp));
    // }

    // retrieve current session. If we are here, it's established that the user has been to the website before and has an active session (CHECK?)
    // else {
    //   axios.get(`${BASE_URL}retrieve-active-session`).then((res) => {
    //     return res.data;
    //   }).then(resp => console.log(resp));
    // }
  }, []);


  return (
    <div className='w-full h-full flex flex-col'>
        <Nav />
        <section className='w-3/5 mx-auto text-center my-10'>
          <h2 className='font-bold text-white text-3xl'>ATTEMPTS LEFT: {3 - gameState.attempts}</h2>
        </section>
        <GuessCrumbs />
        {/* <Slider 
      label="Select a value" 
      color="foreground"
      size="md"
      orientation='vertical'
      className="max-w-md"
      // isDisabled={true}
      defaultValue={0}
      renderThumb={(props) => (
        <div
          {...props}
          className='invisible'
        >
        </div>
      )}
    /> */}
        <div className='flex-1 mt-8 w-11/12 mx-auto'>
          <Drag />
        </div>
        <div className='mt-10 gap-8 w-full mx-auto flex justify-center'>
          <Button className='p-6 bg-slate-300 border-[6px] border-slate-700 text-slate-700 text-lg rounded-none font-bold hover:bg-slate-850  hover:border-black'>
            Reset
          </Button>
          <Button onClick={incrementAttempts} isDisabled={!canSubmit}
            className='p-6 bg-slate-300 border-[6px] border-slate-700 text-slate-700 text-lg rounded-none font-bold hover:bg-slate-850  hover:border-black'>
            Submit
          </Button>
        </div>
    </div>
  )
}
