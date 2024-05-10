import ActionableCard from "components/molecules/actionable-card";
import UserEditForm from "components/user-edit-form";
import UserInterestCard from "components/user-interest-card";
import UserViewerCard from "components/user-viewer-card";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { LoginResponseDto } from "sdk/youapp-service";

export default function ProfileEditPage() {
  const context: Partial<{
    session: LoginResponseDto
  }> = useOutletContext();

  if (!context.session) {
    throw Error("this page need session context")
  }

  return (
    <>
      <UserViewerCard user={context.session.user} cardClassName="mb-6" />

      <ActionableCard title="About" className="mb-3 bg-[#0E191F]" action={
        <span className="text-[#F3EDA6]">
          Save & Update 
        </span>
      }>
        <UserEditForm />
      </ActionableCard>

      <UserInterestCard />
    </>
  );
}
