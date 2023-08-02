import { useUserControllerFindMe } from "@/services/api/raidar/raidarComponents";

export function useFindUser(enabled = true) {
  const { data: user, isLoading: isLoadingUser } = useUserControllerFindMe(
    {},
    { enabled }
  );

  return {
    user,
    isLoadingUser,
  };
}
