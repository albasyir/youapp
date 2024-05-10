import React from 'react';

type ButtonAtomProps = Partial<Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick' | 'type' | 'className'>> & {
  children: React.ReactNode | string
  width?: string
}

export default function ButtonAtom(props: ButtonAtomProps) {
  let className = props.className || "";
  return (
    <button
      type={props.type || 'button'}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`
        ${className} 
        ${props.width || 'w-28'} flex justify-center items-center align-middle text-white rounded-lg h-9 from-[#62cdcb] to-[#4599db] bg-gradient-to-br`
      }
    >
      {props.children}
    </button>
  ); 
}