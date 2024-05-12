import Button from "components/atoms/button";
import ActionableCard from "components/molecules/actionable-card";
import UserInterestCard from "components/user-interest-card";
import UserViewerCard from "components/user-viewer-card";
import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { GetProfileResponse, LoginResponseDto } from "sdk/youapp-service";
import { youappService } from "services/youapp";

function ProfilePage() {
  const context: Partial<{
    session: LoginResponseDto
  }> = useOutletContext();

  if (!context.session) {
    throw Error("this page need session context")
  }

  const [profile, setProfile] = useState<GetProfileResponse>();

  const fetchProfile = async () => {
    const response = await youappService.profile.get();
    const profile = response.data;

    setProfile(profile);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <UserViewerCard user={{
        username: context.session.user.username,
        ...profile
      }} cardClassName="mb-6" />

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

      <Link to="/chat">
        <Button className="w-full mt-4">
          Start Chat
        </Button>
      </Link>
    </>
  );
}

export default ProfilePage;
