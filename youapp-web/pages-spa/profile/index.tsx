import ActionableCard from "components/molecules/actionable-card";
import UserInterestCard from "components/user-interest-card";
import UserViewerCard from "components/user-viewer-card";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { LoginResponseDto } from "sdk/youapp-service";

function ProfilePage() {
  const context: Partial<{
    session: LoginResponseDto
  }> = useOutletContext();

  if (!context.session) {
    throw Error("this page need session context")
  }

  return (
    <>
      <UserViewerCard user={context.session.user} cardClassName="mb-6" />

      <ActionableCard
        title="About"
        action={<Link to="/me/edit">Edit</Link>}
        className="mb-3"
      >
        <span className="opacity-25">
          Add in your your to help others know you better
        </span>
      </ActionableCard>

      <UserInterestCard />
    </>
  );
}

export default ProfilePage;