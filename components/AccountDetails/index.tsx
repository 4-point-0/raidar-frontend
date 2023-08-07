import {
  ActionIcon,
  CopyButton,
  Group,
  Paper,
  Tooltip,
  Text,
  Avatar,
  Menu,
} from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowsLeftRight,
  Check,
  Coin,
  Copy,
  ExternalLink,
  Logout,
  MessageCircle,
  Moneybag,
  Music,
  Photo,
  Search,
  Settings,
  Trash,
  User,
  Wallet,
} from "tabler-icons-react";
import * as nearApi from "near-api-js";

import { useUserContext } from "../../context/UserContext";
import WalletConnectButton from "../WalletConnectButton";
import { useAccount } from "../../context/AccountContext";
import { signOut, useSession } from "next-auth/react";
import Email from "next-auth/providers/email";
import { useWalletSelector } from "@/context/WalletSelectorContext";
import { getConnectionConfig } from "@/utils/near";
import { useFindUser } from "@/hooks/useFindUser";

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

      // setIsLoading(true);
      // console.log(new Date());
      // console.log(user);
      // const { token } = await fetchAuthControllerNearLogin({
      //   body: {
      //     signedJsonString: user.signedJsonString,
      //     username: user.username,
      //   },
      // });

      // console.log(token);
      // userData.onLogin(token);
      // setIsLoading(false);
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
          <Avatar
            variant="filled"
            radius="xl"
            size="md"
            color="red"
            src={session?.user?.image ?? ""}
          >
            {session?.user?.name?.charAt(0)}
          </Avatar>
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
