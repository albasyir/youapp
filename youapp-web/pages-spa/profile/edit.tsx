import ActionableCard from "components/molecules/actionable-card";
import UserEditForm from "components/user-edit-form";
import UserInterestCard from "components/user-interest-card";
import UserViewerCard from "components/user-viewer-card";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { GetProfileResponse, LoginResponseDto, PatchProfileRequestDto } from "sdk/youapp-service";
import { youappService, YouAppServiceError } from "services/youapp";
import Swal from "sweetalert2";

export default function ProfileEditPage() {
  const context: Partial<{
    session: LoginResponseDto
  }> = useOutletContext();

  if (!context.session) {
    throw Error("this page need session context")
  }

  const [changed, setChanged] = useState(true);
  const [profile, setProfile] = useState<GetProfileResponse>();
  const [changedProfile, setChangedProfile] = useState<Omit<PatchProfileRequestDto, '_id' | '__v'>>({});

  useEffect(() => {
    if (!changed) return;

    const fetchProfile = async () => {
      const response = await youappService.profile.get();
      const profile = response.data;

      setProfile(profile);

      setChangedProfile({
        birthday: profile?.birthday,
        displayName: profile?.displayName,
        height: profile?.height,
        image: profile?.image,
        weight: profile?.weight,
        gender: profile?.gender as any,
      });

      setChanged(false);
    };

    
    fetchProfile();
  }, [changed]);

  const henldeUserEditFormChange = (data: PatchProfileRequestDto) => {
    setChangedProfile(data);
  }

  const patchUser = async () => {
    await youappService.profile.patch(changedProfile).catch((e: YouAppServiceError) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: e.message,
      });
      
      return;
    });

    Swal.fire({
      icon: "success",
      title: "Edited",
    });

    setChanged(true);
  }

  return (
    <>
      <UserViewerCard user={{
        username: context.session.user.username,
        ...profile
      }} cardClassName="mb-6" />

      <ActionableCard
        title="About"
        className="mb-3 bg-[#0e191f69]"
        action={
          <span className="text-[#F3EDA6] cursor-pointer" onClick={patchUser}>
            Save & Update
          </span>
        }
      >
        <UserEditForm profile={changedProfile} onChange={henldeUserEditFormChange} />
      </ActionableCard>

      <UserInterestCard />
    </>
  );
}
