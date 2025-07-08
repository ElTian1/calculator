'use client'

import { useState } from 'react'
import { Button } from './Button'

const operations = [
  { label: '+', color: 'bg-blue-400' },
  { label: '-', color: 'bg-pink-400' },
  { label: '*', color: 'bg-green-400' },
  { label: '/', color: 'bg-yellow-400' },
  { label: '^', color: 'bg-purple-400' },
  { label: '√', color: 'bg-orange-400' },
]

export const Calculator = () => {
  const [input, setInput] = useState('')
  const [secondInput, setSecondInput] = useState('')
  const [operation, setOperation] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([])

  const handleOperation = (op: string) => {
    setOperation(op)
    setResult(null)
  }

  const handleCalculate = () => {
    let expr = ''
    let res: number | string = ''
    try {
      if (operation === '√') {
        expr = `√${input}`
        res = Math.sqrt(Number(input))
      } else if (operation && input !== '' && secondInput !== '') {
        expr = `${input} ${operation} ${secondInput}`
        switch (operation) {
          case '+': res = Number(input) + Number(secondInput); break
          case '-': res = Number(input) - Number(secondInput); break
          case '*': res = Number(input) * Number(secondInput); break
          case '/': res = Number(secondInput) === 0 ? 'Error' : Number(input) / Number(secondInput); break
          case '^': res = Math.pow(Number(input), Number(secondInput)); break
        }
      }
      setResult(res.toString())
      setHistory(prev => [{ expression: expr, result: res.toString() }, ...prev])
    } catch {
      setResult('Error')
    }
  }

  const handleClear = () => {
    setInput('')
    setSecondInput('')
    setOperation(null)
    setResult(null)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-white to-blue-100 rounded-2xl shadow-2xl border-2 border-blue-200">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-2xl text-blue-700">Calculadora</span>
        <Button label="C" onClick={handleClear} className="bg-red-400 text-white px-4 py-2 rounded" />
      </div>
      <div className="mb-4">
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Primer número"
          className="w-full p-3 text-right text-xl border rounded mb-2 focus:outline-blue-400 transition"
        />
        {operation && operation !== '√' && (
          <input
            type="number"
            value={secondInput}
            onChange={e => setSecondInput(e.target.value)}
            placeholder="Segundo número"
            className="w-full p-3 text-right text-xl border rounded focus:outline-blue-400 transition"
          />
        )}
      </div>
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {operations.map(op => (
          <Button
            key={op.label}
            label={op.label}
            onClick={() => handleOperation(op.label)}
            className={`text-white text-xl px-6 py-3 rounded-lg shadow ${op.color} ${operation === op.label ? 'ring-4 ring-blue-300' : ''}`}
          />
        ))}
      </div>
      <div className="flex justify-center mb-4">
        <Button
          label="Calcular"
          onClick={handleCalculate}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xl shadow hover:bg-blue-700 transition"
        />
      </div>
      {result !== null && (
        <div className="text-center mb-6">
          <span className="text-lg text-gray-600">Resultado:</span>
          <div className="text-3xl font-bold text-blue-700 bg-white rounded-lg inline-block px-6 py-2 shadow">{result}</div>
        </div>
      )}
      {history.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">Historial</h2>
          <ul className="max-h-40 overflow-y-auto text-sm bg-white rounded-lg p-2 shadow-inner">
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