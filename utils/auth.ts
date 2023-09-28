import { GetServerSidePropsContext } from "next";

import { getServerSession } from "next-auth";

import { authOptions } from "../pages/api/auth/[...nextauth]";

export const redirectIfActiveSession = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/marketplace",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
