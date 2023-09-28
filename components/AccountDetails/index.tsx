import {
  ActionIcon,
  Alert,
  Avatar,
  CopyButton,
  Group,
  Indicator,
  Menu,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";
import * as nearApi from "near-api-js";
import { useCallback, useEffect, useState } from "react";
import {
  Check,
  Coin,
  Copy,
  ExternalLink,
  Logout,
  MessageCircle,
  Music,
  User,
  Wallet,
} from "tabler-icons-react";

import { useWalletSelector } from "@/context/WalletSelectorContext";
import { useFindUser } from "@/hooks/useFindUser";
import { getConnectionConfig } from "@/utils/near";
import { signOut, useSession } from "next-auth/react";
import { useAccount } from "../../context/AccountContext";
import { useUserContext } from "../../context/UserContext";
import WalletConnectButton from "../WalletConnectButton";

export const AccountDetails = () => {
  const userContext = useUserContext();
  const { account } = useAccount();
  const { data: session } = useSession();
  const { user } = useFindUser();

  const { selector, modal, accountId } = useWalletSelector();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useUserContext();

  useEffect(() => {
    if (accountId && !isLoading) {
      setIsLoading(true);
      signMessage();
    }
  }, [accountId]);

  const signMessage = async () => {
    if (!accountId || isLoading) return;

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
    },
    []
  );

  const handleSignOut = async () => {
    if (!accountId) {
      userData.onSignOut();
      signOut({ callbackUrl: "/login" });
      return;
    }

    const wallet = await selector.wallet();

    wallet
      .signOut()
      .then(() => {
        userData.onSignOut();
        setIsLoading(false);
        signOut({ callbackUrl: "/login" });
      })
      .catch((err) => {
        console.log("Failed to sign out");
        console.error(err);
        onError(err.message);
      });
  };

  const content = (
    <>
      <Paper hidden={!userContext.user} p="xs" withBorder>
        <Group spacing={4}>
          <Text>Account Id: </Text>
          <Text color="dimmed">{userContext.user?.email}</Text>
          <CopyButton value={userContext.user?.email ?? ""} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="bottom"
              >
                <ActionIcon
                  radius="xl"
                  variant="light"
                  color={copied ? "teal" : "gray"}
                  onClick={copy}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
          <Tooltip label="View on NEAR Explorer" withArrow position="bottom">
            <ActionIcon
              radius="xl"
              variant="light"
              component="a"
              target="_blank"
              href={`https://explorer.testnet.near.org/accounts/${userContext.user?.email}`}
            >
              <ExternalLink size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Paper>

      <Paper p="xs" withBorder hidden={!userContext.user}>
        <Group spacing={4}>
          <Text>Balance: </Text>
          <Text color="dimmed">
            {nearApi.utils.format.formatNearAmount(account?.amount ?? "0", 2)} Ⓝ
          </Text>
          <Tooltip
            label="Get more NEAR using faucet"
            withArrow
            position="bottom"
          >
            <ActionIcon
              radius="xl"
              variant="light"
              component="a"
              target="_blank"
              href="https://near-faucet.io/"
            >
              <ExternalLink size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Paper>

      <WalletConnectButton />
    </>
  );

  return (
    <Group position="center">
      <Menu position="left-start" offset={7} withArrow arrowPosition="center">
        <Menu.Target>
          <Indicator
            disabled={accountId !== null}
            inline
            label="!"
            size={16}
            offset={4}
            color="red"
          >
            <Avatar
              variant="filled"
              radius="xl"
              size="md"
              color="red"
              src={session?.user?.image ?? ""}
            >
              {session?.user?.name?.charAt(0)}
            </Avatar>
          </Indicator>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>User Information</Menu.Label>

          <Menu.Item closeMenuOnClick={false} icon={<User size={14} />}>
            {session?.user?.name}
          </Menu.Item>
          <Menu.Item
            closeMenuOnClick={false}
            icon={<MessageCircle size={14} />}
          >
            {session?.user?.email}
          </Menu.Item>

          <Menu.Item
            sx={{
              "text-transform": "capitalize",
            }}
            closeMenuOnClick={false}
            icon={<Music size={14} />}
          >
            {user?.roles[0] ?? "No role"}
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>NEAR Wallet</Menu.Label>

          {accountId === null && (
            <Alert title="Connect NEAR Wallet" color="red" maw={200}>
              Please connect NEAR wallet to be able to use all the features.
            </Alert>
          )}

          {accountId === null && (
            <Menu.Item
              icon={<Wallet size={14} />}
              onClick={() => {
                modal.show();
              }}
            >
              Connect Wallet
            </Menu.Item>
          )}

          {accountId !== null && (
            <Menu.Item closeMenuOnClick={false} icon={<Wallet size={14} />}>
              {accountId ?? "No account connected"}
            </Menu.Item>
          )}

          {accountId !== null && (
            <Menu.Item closeMenuOnClick={false} icon={<Coin size={14} />}>
              {nearApi.utils.format.formatNearAmount(account?.amount ?? "0", 2)}{" "}
              Ⓝ
            </Menu.Item>
          )}

          {accountId !== null && (
            <Menu.Item
              color="red"
              icon={<Wallet size={14} />}
              onClick={async () => {
                const wallet = await selector.wallet();

                wallet.signOut().catch((err) => {
                  console.log("Failed to sign out");
                  console.error(err);
                });
              }}
            >
              Disconnect Wallet
            </Menu.Item>
          )}

          <Menu.Divider />

          {session?.user !== null && (
            <Menu.Item
              color="red"
              icon={<Logout size={14} />}
              onClick={handleSignOut}
            >
              Log Out
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
