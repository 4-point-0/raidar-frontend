import { useControllerFindMe } from "../services/api/components";

export function useFindUser(enabled = true) {
  const { data: user, isLoading: isLoadingUser } = useControllerFindMe(
    {},
    { enabled }
  );

  return {
    user,
    isLoadingUser,
  };
}
