'use client'

import { useState } from 'react'
import { Button } from './Button'

export const Calculator = () => {
  const [input, setInput] = useState('')

  const handleClick = (value: string) => {
    if (value === 'C') return setInput('')
    if (value === '=') {
      try {
        // Evalúa la expresión (¡solo en proyectos personales!)
        const result = eval(input)
        setInput(result.toString())
      } catch {
        setInput('Error')
      }
      return
    }
    setInput(prev => prev + value)
  }

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ]

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 bg-white rounded shadow">
      <input
        type="text"
        value={input}
        className="w-full p-4 text-right text-2xl border mb-4"
        readOnly
      />
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn, i) => (
          <Button
            key={i}
            label={btn}
            onClick={() => handleClick(btn)}
            className={btn === '=' ? 'col-span-4 bg-blue-500 text-white' : ''}
          />
        ))}
      </div>
    </div>
  )
}
