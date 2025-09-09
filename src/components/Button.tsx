import React from "react"

export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 cursor-pointer"
    >
      {children}
    </button>
  )
}
