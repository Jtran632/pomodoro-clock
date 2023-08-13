'use client'
import Image from 'next/image'
import useSound from 'use-sound';
import { useState, useEffect, useRef } from 'react'
export default function Home() {
  const [work, setWork] = useState(25)
  const [rest, setRest] = useState(5)
  const [clock, setClock] = useState(0)
  const [isWorking, setIsWorking] = useState(false)
  const [pause, setPause] = useState(false)
  const [reset, setReset] = useState(true)
  const [startSfx] = useSound('/Sounds/start.mp3')
  const [chimesSfx] = useSound('/Sounds/chimes.mp3')
  let decreaseNum: any;
  decreaseNum = () => setClock((prev) => prev - 1)
  const count = useRef(decreaseNum)
  useEffect(() => {
    if (clock <= 0) {
      setIsWorking(isWorking => !isWorking)
      chimesSfx()
    }
  }, [clock])
  useEffect(() => {
    if (isWorking) {
      setClock(work * 60)
    }
    else if (!isWorking) {
      setClock(rest * 60)
    }
  }, [isWorking, reset])

  useEffect(() => {
    count.current = setInterval(decreaseNum, 1000);
    return () => clearInterval(count.current);
  }, [decreaseNum]);

  useEffect(() => {
    if (!pause) {
      clearInterval(count.current)
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" >
      <div className='text-center border-2'>
        <div>Pomodoro Clock
        </div>
        <div className='flex justify-center items-center w-80 h-80 border-8 border-double'>
          {clock}
        </div>
        <button onClick={() => { setPause(pause => !pause), startSfx() }} className='border-2 p-2  w-full'>
          {pause ? "Pause" : "Start"}
        </button>
        <div className='p-2'>
          Current State: {isWorking ? "Working" : "Resting"}
        </div>
        <div className='flex w-full text-xs'>
          <button onClick={() => setIsWorking(isWorking => !isWorking)} className='border-2 p-2  w-1/2'>
            ToggleState
          </button>
          <button onClick={() => setReset(reset => !reset)} className='border-2 p-1 w-1/2' >
            Reset/Re-adjust Timer
          </button>
        </div>
        <div className='flex '>
          <button onClick={() => { if (work - 1 >= 10) { setWork(work - 1) } }} className='border-2 p-4'> - </button>
          <div className='border-2 p-2 w-full'>
            Working: {work} Minutes
            <div className='text-xs'>10 min, 25 max</div>
          </div>
          <button onClick={() => { if (work + 1 <= 60) { setWork(work + 1) } }} className='border-2 p-4'> + </button>
        </div>
        <div className='flex '>
          <button onClick={() => { if (rest - 1 >= 1) { setRest(rest - 1) } }} className='border-2 p-4'> - </button>
          <div className='border-2 p-2 w-full'>
            Resting: {rest} Minutes
            <div className='text-xs'>1 min, 10 max</div>
          </div>
          <button onClick={() => { if (rest + 1 <= 10) { setRest(rest + 1) } }} className='border-2 p-4'> + </button>
        </div>
      </div>
    </main>
  )
}
