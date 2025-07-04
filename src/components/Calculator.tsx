'use client'

import { useState, useEffect } from 'react'
import { Button } from './Button'

const advancedButtons = ['(', ')', '^', '√', '⌫']

export const Calculator = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([])

  // Teclado físico
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '(', ')', '^'].includes(e.key)) {
        setInput(prev => prev + e.key)
      } else if (e.key === 'Enter' || e.key === '=') {
        handleClick('=')
      } else if (e.key === 'Backspace') {
        handleClick('⌫')
      } else if (e.key === 'c' || e.key === 'C') {
        handleClick('C')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line
  }, [input])

  // Evaluador seguro para operaciones avanzadas
  const safeEval = (expr: string) => {
    // Reemplaza ^ por ** y √ por Math.sqrt
    let sanitized = expr.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)')
    sanitized = sanitized.replace(/\^/g, '**')
    // Solo permite números, operadores y paréntesis
    if (!/^[\d+\-*/().\s^Mathsqrt]+$/.test(sanitized)) throw new Error('Invalid input')
    // eslint-disable-next-line no-eval
    return eval(sanitized)
  }

  const handleClick = (value: string) => {
    if (value === 'C') return setInput('')
    if (value === '⌫') return setInput(prev => prev.slice(0, -1))
    if (value === '=') {
      try {
        const result = safeEval(input)
        setInput(result.toString())
        setHistory(prev => [
          { expression: input, result: result.toString() },
          ...prev,
        ])
      } catch {
        setInput('Error')
      }
      return
    }
    if (value === '√') {
      setInput(prev => prev + '√')
      return
    }
    setInput(prev => prev + value)
  }

  const buttons = [
    ...advancedButtons,
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ]

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg">Calculadora</span>
      </div>
      <input
        type="text"
        value={input}
        className="w-full p-4 text-right text-2xl border mb-4 rounded"
        readOnly
      />
      <div className="grid grid-cols-5 gap-2">
        {buttons.map((btn, i) => (
          <Button
            key={i}
            label={btn}
            onClick={() => handleClick(btn)}
            className={
              btn === '='
                ? 'col-span-5 bg-blue-500 text-white'
                : btn === 'C'
                ? 'bg-red-400 text-white'
                : btn === '⌫'
                ? 'bg-yellow-400 text-white'
                : btn === '√' || btn === '^'
                ? 'bg-green-400 text-white'
                : ''
            }
          />
        ))}
      </div>
      {history.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Historial</h2>
          <ul className="max-h-40 overflow-y-auto text-sm">
            {history.map((item, idx) => (
              <li key={idx} className="flex justify-between border-b py-1">
                <span>{item.expression}</span>
                <span className="font-bold ml-2">= {item.result}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}