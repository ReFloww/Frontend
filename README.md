# ReFlow Frontend

ReFlow is a decentralized P2P lending platform for Real World Assets (RWA) built on Mantle Network. This frontend allows users to invest in tokenized agricultural, fisheries, and forestry assets.

## Features

- **Dashboard** - Overview of portfolio performance and asset distribution
- **Portfolio** - Track and manage your investments with real wallet integration
- **Market** - Browse and invest in tokenized RWA products
- **Auto Manage** - Let professional managers handle your portfolio automatically
- **History** - View transaction history

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Web3**: RainbowKit, Wagmi, Viem
- **State Management**: TanStack Query

## Prerequisites

- Node.js 18+
- npm or yarn or pnpm
- A Web3 wallet (MetaMask, etc.)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ReFloww/Frontend.git
cd Frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# WalletConnect Project ID
# Get yours at https://cloud.walletconnect.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# USDT Contract Address (Mantle Sepolia Testnet)
NEXT_PUBLIC_USDT_ADDRESS=0xe01c5464816a544d4d0d6a336032578bd4629F10
```

#### Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Project ID from WalletConnect Cloud for wallet connection functionality. Get one for free at [cloud.walletconnect.com](https://cloud.walletconnect.com) | Yes |
| `NEXT_PUBLIC_USDT_ADDRESS` | The USDT token contract address on Mantle Sepolia testnet. Used for investment transactions. | Yes |

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run on a different port:

```bash
npm run dev -- -p 3001
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (main)/            # Main app layout (with sidebar)
│   │   ├── dashboard/     # Dashboard page
│   │   ├── portfolio/     # Portfolio page
│   │   ├── market/        # Market listing & detail pages
│   │   ├── auto-manage/   # Auto-manage & manager detail pages
│   │   ├── history/       # Transaction history
│   │   └── settings/      # User settings
│   └── login/             # Authentication pages
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── market/           # Market-specific components
│   ├── portfolio/        # Portfolio-specific components
│   └── swap/             # Swap dialog component
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and constants
│   ├── abis/            # Smart contract ABIs
│   ├── constants/       # App constants
│   └── utils.ts         # Helper functions
└── types/               # TypeScript type definitions
```

## Network Configuration

This app is configured to work with **Mantle Sepolia Testnet**. Make sure your wallet is connected to the correct network:

- **Network Name**: Mantle Sepolia Testnet
- **RPC URL**: https://rpc.sepolia.mantle.xyz
- **Chain ID**: 5003
- **Currency Symbol**: MNT

## Contributing

1. Create a new branch from `main`
2. Make your changes
3. Submit a pull request

## License

MIT
