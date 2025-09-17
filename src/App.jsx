import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(10)

  return (
    <>
      <div>
        <progress className='rotate-180'  max="100" value={count}></progress>
      </div>
    </>
  )
}

export default App
