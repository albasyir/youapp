import Card from "components/atoms/card";
import { useEffect, useState } from "react";

type UserViewerCardProps = {
  cardClassName?: string
  children?: React.ReactNode | string
  color?: string
  user: {
    username: string
    gender?: string;
    zodiac?: string;
    horoscope?: string;
    image?: string;
  }
}

export default function UserViewerCard(props: UserViewerCardProps) {
  const [user, setUser] = useState<UserViewerCardProps['user']>(props.user);

  useEffect(() => {
    console.log("userviewcard", props)
    setUser(props.user);
  }, [props.user]);

  return (
    <Card className={`${props.cardClassName} relative h-40 bg-[#162329]`} background={user.image}>
      <div className="absolute bottom-3 left-3">
        <div>
          <strong>
            @{user.username}
          </strong>
        </div>
        <div>
          {user.gender}
        </div>
        <div>
          {user.zodiac} | {user.horoscope}
        </div>
      </div>
    </Card>
  )
}