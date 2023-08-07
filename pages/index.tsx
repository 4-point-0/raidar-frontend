import { useEffect } from "react";
import { useRouter } from "next/router";

import { useIsClient } from "@/hooks/useIsClient";
import { getSession } from "next-auth/react";
import { useFindUser } from "../hooks/useFindUser";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
};

export default function Home(session: Session) {
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
