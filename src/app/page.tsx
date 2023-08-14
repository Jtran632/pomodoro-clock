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
  const ClockTime = () => {
    let minutes = Math.floor(clock / 60)
    let seconds = clock - minutes * 60;
    return (
      <div>{minutes > 9 ? minutes : '0' + minutes}:{seconds > 9 ? seconds : '0' + seconds}</div>
    )
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-fuchsia-300 to to-yellow-200 text-black font-mono" >
      <div className='p-4 text-center border-4 border-double border-blue-300'>
        <div className='flex flex-col justify-between items-center w-80 h-80 border-8 border-double border-blue-300 text-4xl'>
          <div></div>
          <ClockTime />
          <div className='text-xs'>
            {isWorking ? "Working" : "Resting"}
          </div>
        </div>
        <button onClick={() => { setPause(pause => !pause), startSfx() }} className='border-2 border-t-0 border-blue-300 p-2  w-full'>
          {pause ? "Pause" : "Start"}
        </button>
        {!pause ? <>
          <div className='p-2 border-2 border-t-0 border-blue-300'>
            Current State: {isWorking ? "Working" : "Resting"}
          </div>
          <div className='flex w-full text-xs border-x-2 border-blue-300'>
            <button onClick={() => setIsWorking(isWorking => !isWorking)} className='border-r-2 border-blue-300 p-2  w-1/2'>
              Toggle Work/Rest
            </button>
            <button onClick={() => setReset(reset => !reset)} className='p-1 w-1/2' >
              Reset/Re-adjust Timer
            </button>
          </div>
          <div className='flex border-2 border-blue-300 '>
            <button onClick={() => { if (work - 1 >= 10) { setWork(work - 1) } }} className='border-r-2 border-blue-300 p-4'> - </button>
            <div className='p-2 w-full'>
              Working: {work} Minutes
              <div className='text-xs'>10 min, 60 max</div>
            </div>
            <button onClick={() => { if (work + 1 <= 60) { setWork(work + 1) } }} className='border-l-2 border-blue-300 p-4'> + </button>
          </div>
          <div className='flex border-2 border-t-0 border-blue-300 '>
            <button onClick={() => { if (rest - 1 >= 1) { setRest(rest - 1) } }} className='border-r-2 border-blue-300 p-4'> - </button>
            <div className='p-2 w-full'>
              Resting: {rest} Minutes
              <div className='text-xs'>1 min, 10 max</div>
            </div>
            <button onClick={() => { if (rest + 1 <= 10) { setRest(rest + 1) } }} className='border--2 border-blue-300 p-4'> + </button>
          </div>
        </> : <></>
        }
      </div>
    </main>
  )
}
