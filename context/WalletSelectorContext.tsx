import type { AccountState, WalletSelector } from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupSender } from "@near-wallet-selector/sender";
import * as nearApi from "near-api-js";
import { ContractCodeView } from "near-api-js/lib/providers/provider";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { distinctUntilChanged, map } from "rxjs";

import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { NO_DEPOSIT, THIRTY_TGAS, getConnectionConfig } from "../utils/near";

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

interface WalletSelectorContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
  callMethod: (
    contractId: string,
    method: string,
    args?: any,
    deposit?: string,
    gas?: string
  ) => Promise<void | nearApi.providers.FinalExecutionOutcome>;
}

const WalletSelectorContext =
  React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider = ({ children }: any) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);
  const [nearConnection, setNearConnection] = useState<nearApi.Near | null>(
    null
  );

  const provider = useMemo(() => {
    if (!selector?.options) {
      return null;
    }
    const { network } = selector.options;

    return new nearApi.providers.JsonRpcProvider({ url: network.nodeUrl });
  }, [selector?.options]);

  const viewMethod = useCallback(
    async (contractId: string, method: string, args: any = {}) => {
      if (!provider) return;

      let res = await provider.query({
        request_type: "call_function",
        account_id: contractId,
        method_name: method,
        args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
        finality: "optimistic",
      });

      return JSON.parse(Buffer.from((res as any).result).toString());
    },
    [provider]
  );

  const getViewCode = useCallback(
    async (contractId: string) => {
      if (!provider) return;

      return await provider.query<ContractCodeView>({
        account_id: contractId,
        finality: "final",
        request_type: "view_code",
      });
    },
    [provider]
  );

  const callMethod = useCallback(
    async (
      contractId: string,
      method: string,
      args: any = {},
      deposit: string = NO_DEPOSIT,
      gas: string = THIRTY_TGAS
    ) => {
      if (!selector) return;
      const wallet = await selector.wallet();

      return await wallet.signAndSendTransaction({
        signerId: accounts[0].accountId,
        receiverId: contractId,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: method,
              args,
              gas,
              deposit,
            },
          },
        ],
      });
    },
    [selector]
  );

  const init = useCallback(async () => {
    const { connect, keyStores } = nearApi;

    // connect to NEAR
    const nearConnection = await connect(
      getConnectionConfig(new keyStores.BrowserLocalStorageKeyStore())
    );
    setNearConnection(nearConnection);

    const _selector = await setupWalletSelector({
      network: "testnet",
      modules: [
        setupNearWallet(),
        setupMyNearWallet(),
        setupSender(),
        setupMathWallet(),
        setupNightly(),
        setupMeteorWallet(),
        setupLedger(),
      ],
    });

    const _modal = setupModal(_selector, {
      contractId: "raidar-dev.testnet",
    });
    const state = _selector.store.getState();

    setAccounts(state.accounts);

    window.selector = _selector;
    window.modal = _modal;

    setSelector(_selector);
    setModal(_modal);
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error(err);
      alert("Failed to initialise wallet selector");
    });
  }, [init]);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        setAccounts(nextAccounts);
      });

    return () => subscription.unsubscribe();
  }, [selector]);

  if (!selector || !modal) {
    return null;
  }

  const accountId =
    accounts.find((account) => account.active)?.accountId || null;

  return (
    <WalletSelectorContext.Provider
      value={{
        selector,
        modal,
        accounts,
        accountId,
        callMethod,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);

  if (!context) {
    throw new Error(
      "useWalletSelector must be used within a WalletSelectorContextProvider"
    );
  }

  return context;
}
