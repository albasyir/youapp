import React from 'react';

type ButtonProps = Partial<Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick' | 'type' | 'className'>> & {
  children?: React.ReactNode
}

export default function Button(props: ButtonProps) {
  return (
    <button
      type={props.type || 'button'}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${props.className} ${props.disabled && 'opacity-20'} group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
    >
      {props.children}
    </button>
  ); 
}