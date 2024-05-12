import { CSSProperties, useEffect, useState } from "react";

type CardProps = {
  className?: string
  children?: React.ReactNode
  background?: string
}

export default function Card(props: CardProps) {
  const [background, setBackground] = useState(props.background)

  let css: CSSProperties = {}

  if (background) {
    css = {
      backgroundColor: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.3))`,
      backgroundImage: `url("data:image/png;base64,${background}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }


  useEffect(() => {
    setBackground(props.background);
  }, [props.background]);

  return (
    <div
      style={css}
      className={`rounded-2xl ${props.className}`}
    >
      {props.children}
    </div>
  )
}