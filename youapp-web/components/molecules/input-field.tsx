interface InputFieldProps {
  id?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: 'primary' | 'glass';
  align?: 'center' | 'left' | 'right'
}

export default function InputField(props: InputFieldProps) {
  const align = props.align || 'left';
  const variant = props.variant || 'primary';

  const alignOptions = {
    'left': 'text-left',
    'right': 'text-right',
    'center': 'text-center',
  }

  const theme = {
    'primary': `
      disabled:opacity-50
      focus:ring-indigo-500
      focus:border-indigo-500
      focus:outline-none
      focus:outline-none
      focus:z-10
      rounded-md
      text
      placeholder-gray-500
      border-[#4C5559]
      bg-[#1A252A]
    `,
    'glass': `
      border-none
      rounded-md
      py-3
      bg-[rgba(255,255,255,0.03)]
    `
  }

  return (
    <input
      {...props}
      className={`
          ${theme[variant]}
          ${alignOptions[align]}
          appearance-none 
          relative 
          w-full 
          px-3 
          py-2 
          border 
          sm:text-sm
        `}
      value={props.value}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
    />
  );
}
