# Voting DApp

A simple and transparent decentralized voting application (DApp) built on the **Edu Chain testnet** using **Next.js**, **TypeScript**, and **Tailwind CSS**. This DApp enables users to participate in elections by securely voting for predefined candidates, leveraging blockchain technology to provide a tamper-proof and verifiable voting process. The application ensures that votes are immutable, transparent, and recorded on the blockchain for public verification.

## Key Features

- **Real-Time Vote Updates**: Vote counts are updated in real-time without requiring a page reload, ensuring that users can view the most current results immediately after voting.
- **Secure Voting**: Prevents multiple votes from the same user by utilizing the `hasVoted` mapping in the smart contract, ensuring each user can cast only one vote.
- **Voting Deadline**: Voting is restricted to a specified time frame, and users can only vote before the deadline, ensuring fairness and preventing last-minute voting manipulation.
- **Dynamic Candidate Addition**: Administrators can dynamically add candidates to the election, allowing the flexibility to adjust the list of candidates beyond the default ones.
- **Blockchain Transparency**: All voting data is stored on-chain, ensuring transparency and immutability of the voting process. Voters can verify the election results through the blockchain.
- **Loading Indicator**: Displays a loading animation while blockchain transactions are being processed, improving the user experience by providing visual feedback during the transaction confirmation.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Blockchain**: Edu Chain (testnet), Solidity
- **Smart Contracts**: Voting Contract with features such as voting, vote count, and tracking voters to ensure security and fairness in the election process.

## Contract Address

The deployed contract address on the **Edu Chain testnet** is: 0x254ef2Dea3D1C666B8edf083865d5CEC931D5F43

You can use this address to interact with the contract on the testnet. Make sure to configure your project to use this address by adding it to your `.env` file as follows:

NEXT_PUBLIC_CONTRACT_ADDRESS=0x254ef2Dea3D1C666B8edf083865d5CEC931D5F43

## Getting Started

To run the development server, follow these steps:

1. Clone the repository:


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
