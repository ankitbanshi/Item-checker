import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex justify-center items-center bg-black h-[100vh]'>
      <button className='bg-green-400 text-black text-5xl p-9 mr-10 rounded-2xl'>
        Add Item
      </button>
      <button className='bg-green-400 text-black text-5xl p-9 mr-10 rounded-2xl'>
        View Item
      </button>
    </div>
    </>
  )
}

export default App
