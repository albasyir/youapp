import Card from "components/atoms/card";

type ActionableCardProps = {
  className?: string
  children?: React.ReactNode | string
  color?: string
  title?: React.ReactNode | string
  action?: React.ReactNode | string
}

export default function ActionableCard(props: ActionableCardProps) {
  return (
    <Card className={props.className}>
      <div className="flex p-4">
        <div className="w-1/2 text-left">{props.title}</div>
        <div className="w-1/2 text-right">{props.action}</div>
      </div>
      <div className="p-4">
        {props.children}
      </div>
    </Card>
  )
}