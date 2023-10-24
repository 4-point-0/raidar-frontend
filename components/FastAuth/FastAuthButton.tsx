import React, { useEffect, useState } from 'react';
import { setupFastAuthWallet } from 'near-fastauth-wallet';
import { setupWalletSelector } from '@near-wallet-selector/core';

interface FastAuthButtonProps {
  contractId: string;
  email: string;
  isRecovery: boolean;
  desiredNearAddress?: string;
}

const FastAuthButton: React.FC<FastAuthButtonProps> = ({ contractId, email, isRecovery, desiredNearAddress }) => {
  const [selector, setSelector] = useState<any | null>(null);

  useEffect(() => {
    const fastAuthModule = setupFastAuthWallet({
      relayerUrl: process.env.RELAYER_URL as string,
      walletUrl: process.env.WALLET_URL as string
    });

    console.log("FastAuth Module:", fastAuthModule);

    const selectorInstance = setupWalletSelector({
      network: 'testnet',
      modules: [fastAuthModule]
    });

    console.log("Selector Instance:", selectorInstance);

    setSelector(selectorInstance);
  }, []);

  const onClick = () => {
    if (!selector) return;

    selector
      .then((selectorInstance: any) => selectorInstance.wallet('fast-auth-wallet'))
      .then((fastAuthWallet: any) => {
        const signInOptions = {
          contractId: contractId,
          email: email,
          accountId: desiredNearAddress ? `${desiredNearAddress}.near` : undefined,
          isRecovery: isRecovery
        };
        
        return fastAuthWallet.signIn(signInOptions);
      })
      .catch((error: any) => {
        console.error("Error signing in with FastAuth:", error);
      });
  };

  return <button onClick={onClick}>Sign In with FastAuth</button>;
};

export default FastAuthButton;
