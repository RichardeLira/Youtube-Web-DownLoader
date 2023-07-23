import { MouseEventHandler, ReactNode } from 'react'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  variant,
  children,
  className,
  onClick,
}: ButtonProps) {
  const primaryClasses = 'bg-red-500 hover:bg-red-400'
  const secondaryClasses = 'border-2 border-red-500 hover:bg-red-500'

  return (
    <button
      className={`flex-1 rounded-lg px-5 py-2 ${className} ${
        variant === 'secondary' ? secondaryClasses : primaryClasses
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
