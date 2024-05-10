import Card from "components/atoms/card";

type UserViewerCardProps = {
  cardClassName?: string
  children?: React.ReactNode | string
  color?: string
  user: {
    username: string
    gender?: string;
    zodiac?: string;
    horoscope?: string;
  }
}

export default function UserViewerCard(props: UserViewerCardProps) {
  return (
    <Card className={`${props.cardClassName} relative h-40 bg-[#162329]`}>
      <strong className="absolute bottom-3 left-3">
        @{props.user.username}
      </strong>
    </Card>
  )
}