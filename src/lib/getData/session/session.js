
import { authClient } from "@/lib/auth-client";

export const useClientSession = () => {
  const { data: session, isPending } = authClient.useSession();

  return { session, isPending };
};
