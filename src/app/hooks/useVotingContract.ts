"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const contractABI = [
  {
    inputs: [],
    name: "candidatesCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_candidateId", type: "uint256" },
    ],
    name: "getCandidate",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_candidateId", type: "uint256" },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

const useVotingContract = () => {
  const [candidates, setCandidates] = useState<
    { name: string; voteCount: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVoting, setIsVoting] = useState<boolean>(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      if (typeof window === "undefined" || !window.ethereum) {
        alert("🚨 MetaMask is required to use this dApp!");
        setLoading(false);
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI,
          provider
        );

        if (!contract) {
          console.error("🚨 Contract instance is undefined!");
          return;
        }

        const count = await contract.candidatesCount();
        console.log("🔢 Candidate Count:", count?.toString());

        if (!count || Number(count) === 0) {
          console.warn("⚠️ No candidates found.");
          setLoading(false);
          return;
        }

        const candidatesArray = [];
        for (let i = 0; i < Number(count); i++) {
          try {
            const [name, voteCount] = await contract.getCandidate(i);
            candidatesArray.push({ name, voteCount: Number(voteCount) });
          } catch (error) {
            console.error(`❌ Error fetching candidate ${i}:`, error);
          }
        }

        console.log("✅ Candidates Loaded:", candidatesArray);
        setCandidates(candidatesArray);
      } catch (error) {
        console.error("🔥 Error fetching candidates:", error);
      }

      setLoading(false);
    };

    fetchCandidates();
  }, []);

  const voteForCandidate = async (candidateId: number) => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("🚨 MetaMask is required to vote!");
      return;
    }

    try {
      setIsVoting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        signer
      );

      if (!contract) {
        console.error("🚨 Contract instance is undefined!");
        return;
      }

      console.log(`🗳 Voting for candidate ${candidateId}...`);
      const tx = await contract.vote(candidateId);
      await tx.wait();

      alert(`✅ Successfully voted for candidate ${candidateId}`);
      window.location.reload();
    } catch (error) {
      console.error("❌ Error while voting:", error);
      alert("Voting failed! You may have already voted.");
    }
    setIsVoting(false);
  };

  return { candidates, loading, voteForCandidate, isVoting };
};

export default useVotingContract;
