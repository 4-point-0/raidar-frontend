import * as nearApi from "near-api-js";
import { providers } from "near-api-js";
import { AccountView } from "near-api-js/lib/providers/provider";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { getConnectionConfig } from "@/utils/near";
import { useWalletSelector } from "./WalletSelectorContext";

interface UseAccount {
  account: AccountView | null;
  loading: boolean;
}

const AccountContext = React.createContext<UseAccount | null>(null);

export const AccountProvider = ({ children }: any) => {
  const { selector, accountId } = useWalletSelector();
  const [account, setAccount] = useState<AccountView | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getAccount = useCallback(async (): Promise<AccountView | null> => {
    if (!accountId) {
      return null;
    }

    const { network } = selector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const { connect, keyStores } = nearApi;
    const nearConnection = await connect(
      getConnectionConfig(new keyStores.BrowserLocalStorageKeyStore())
    );

    const account = await nearConnection.account(accountId);
    const result = await account.getAccountBalance();

    return provider
      .query<AccountView>({
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      })
      .then((data) => ({
        ...data,
        account_id: accountId,
        amount: result.available,
      }));
  }, [accountId, selector.options]);

  useEffect(() => {
    if (!accountId) {
      return setAccount(null);
    }

    setLoading(true);

    getAccount().then((nextAccount) => {
      setAccount(nextAccount);
      setLoading(false);
    });
  }, [accountId, getAccount]);

  return (
    <AccountContext.Provider value={{ account, loading }}>
      {children}
    </AccountContext.Provider>
  );
};

export function useAccount() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAccount must be used within a AccountContext");
  }

  return context;
}
