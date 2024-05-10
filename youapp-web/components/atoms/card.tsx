type Card = {
  className?: string
  children?: React.ReactNode
}

export default function Card(props: Card) {
  return (
    <div
      className={`rounded-2xl ${props.className}`}
    >
      {props.children}
    </div>
  )
}