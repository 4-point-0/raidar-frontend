import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useFindUser } from "@/hooks/useFindUser";

export const Profile = () => {
  const router = useRouter();
  const { user } = useFindUser();

  useEffect(() => {
    if (user?.roles.includes("artist")) {
      router.push("/artist/profile");
    } else if (user?.roles.includes("user")) {
      router.push("/user/profile");
    }
  }, [user]);

  return null;
};

export default Profile;
