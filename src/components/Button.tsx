type ButtonProps = {
  label: string
  onClick: () => void
  className?: string
}

export const Button = ({ label, onClick, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gray-200 hover:bg-gray-300 p-4 rounded text-xl ${className}`}
    >
      {label}
    </button>
  )
}
