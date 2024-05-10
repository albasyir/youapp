import { Link } from "react-router-dom";
import ActionableCard from "./molecules/actionable-card";

type UserInterestCardProps = {
  interests?: string[];
}

export default function UserInterestCard({ interests = [] }: UserInterestCardProps) {

  return (
    <ActionableCard
      title="Interest"
      action={<Link to="/me/interest/edit">Edit</Link>}
      className="bg-[#0E191F]"
    >
      {
        interests.length < 1
          ? <span className="opacity-25">Add in your interest to find a better match</span>
          : JSON.stringify(interests)
      }
    </ActionableCard>
  )
}