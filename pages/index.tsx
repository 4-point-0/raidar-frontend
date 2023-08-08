import { useEffect } from "react";
import { useRouter } from "next/router";

import { useIsClient } from "@/hooks/useIsClient";
import { useFindUser } from "../hooks/useFindUser";

export default function Home() {
  const isClient = useIsClient();
  const router = useRouter();

  const { user } = useFindUser();

  useEffect(() => {
    if (!isClient) {
      return;
    }

    if (user?.roles[0] === "artist") {
      router.push("/marketplace");
    } else if (user?.roles[0] === "user") {
      router.push("/marketplace");
    } else {
      router.push("/login");
    }
  });

  return null;
}
