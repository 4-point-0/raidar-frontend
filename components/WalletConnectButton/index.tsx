/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mantine/core";
import * as nearApi from "near-api-js";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useWalletSelector } from "../../context/WalletSelectorContext";
import { getConnectionConfig } from "../../utils/near";

const ConnectAccount = () => {
  const { selector, modal, accounts, accountId } = useWalletSelector();
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (accountId && !loading) {
      setIsLoading(true);
    }
  }, [accountId]);

  const signMessage = async () => {
    if (!accountId || loading) return;

    const { connect, keyStores } = nearApi;

    const keystore = new keyStores.BrowserLocalStorageKeyStore();

    const near = await connect(getConnectionConfig(keystore));
    const enc = new TextEncoder();

    const signed = await near.connection.signer.signMessage(
      enc.encode(accountId),
      accountId,
      selector.options.network.networkId
    );

    const jsonString = JSON.stringify(signed);
    onNearUser({ username: accountId, signedJsonString: jsonString });
  };

  const onError = (message: string) => {
    console.log(message);
  };

  const onNearUser = useCallback(
    async (user: { username: string; signedJsonString: string }) => {
      if (localStorage.getItem("token")) return;

      setIsLoading(true);
      const token = "";
      userData.onLogin(token);
      setIsLoading(false);

      if (router.route.includes("action")) {
        return;
      }

      router.push("/");
    },
    []
  );

  const handleSignOut = async () => {
    const wallet = await selector.wallet();

    wallet
      .signOut()
      .then(() => {
        userData.onSignOut();
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log("Failed to sign out");
        console.error(err);
        onError(err.message);
      });
  };

  if (accountId) {
    return (
      <Button variant="light" onClick={handleSignOut}>
        Sign out
      </Button>
    );
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <Button
      color="dark"
      onClick={() => {
        modal.show();
      }}
    >
      Connect your NEAR wallet
    </Button>
  );
};

export default ConnectAccount;
