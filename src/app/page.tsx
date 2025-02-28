"use client";
import useMetaMask from "./hooks/useMetaMask";
import useVotingContract from "./hooks/useVotingContract";

export default function Home() {
  const { walletAddress, connectWallet } = useMetaMask();
  const { candidates, loading, voteForCandidate, isVoting } = useVotingContract();

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Voting DApp</h1>

      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
        >
          Connect MetaMask
        </button>
      ) : (
        <div className="w-full max-w-md">
          <p className="text-lg mb-4">Connected: {walletAddress}</p>
          <h2 className="text-2xl font-semibold mb-4">Candidates</h2>

          {loading ? (
            <p>Loading candidates...</p>
          ) : candidates.length === 0 ? (
            <p>No candidates found.</p> // ✅ Shows message if no candidates
          ) : (
            <ul className="space-y-4">
              {candidates.map((candidate, index) => (
                <li key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
                  <p className="text-lg font-semibold">{candidate.name}</p>
                  <p>Votes: {candidate.voteCount}</p>
                  <button
                    onClick={() => voteForCandidate(index)}
                    className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                    disabled={isVoting}
                  >
                    {isVoting ? "Voting..." : "Vote"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
