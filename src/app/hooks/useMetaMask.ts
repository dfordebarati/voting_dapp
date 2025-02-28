"use client";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const useMetaMask = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async (): Promise<void> => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("🚨 Error connecting MetaMask:", error);
      }
    } else {
      alert("🚨 Please install MetaMask to use this dApp!");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setWalletAddress(accounts.length > 0 ? accounts[0] : null);
      });
    }
  }, []);

  return { walletAddress, connectWallet };
};

export default useMetaMask;
