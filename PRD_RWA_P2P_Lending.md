# Product Requirements Document (PRD): RWA P2P Lending dApp (Lender Portal)

## 1. Project Overview

**Goal:** Build a decentralized application (dApp) focused on Real World
Asset (RWA) tokenized Peer‑to‑Peer (P2P) lending from the Lender
perspective.\
**Networks:** Mantle Sepolia, Base Sepolia, Ethereum Sepolia.\

------------------------------------------------------------------------

## 2. Tech Stack & Dependencies

### **Framework**

-   Next.js 14+ (App Router)
-   TypeScript

### **Styling / UI**

-   Tailwind CSS\
-   Shadcn UI
    -   Components: Button, Card, Table, Sheet, Sidebar, Inputs\
-   Icons: lucide-react

### **Web3 Integration**

-   wagmi v2 (hooks, contract interaction)
-   viem (RPC, ABI, chain definitions)
-   @rainbow-me/rainbowkit (wallet connection UI)

------------------------------------------------------------------------

## 3. Global Layout Architecture

### **A. Public Layout**

Used only for the Landing Page\
- Minimal header\
- No sidebar\
- Clean hero section

### **B. Dashboard Layout (Persistent App Shell)**

Used for all authenticated pages\
- **Top Bar (fixed):**\
- Left: App logo\
- Right: `<ConnectButton />`\
- **Sidebar (fixed left):**\
- Dashboard → `/dashboard`\
- Transactions → `/transactions`\
- History → `/history`\
- Settings → `/settings`\
- Active link highlighting\
- **Main Content:** Changes per page while Topbar & Sidebar stay static

------------------------------------------------------------------------

## 4. Page Specifications

### **4.1 Landing Page**

**Route:** `/`\
**Features:**\
- Hero title: "The Future of RWA P2P Lending."\
- Subtitle: "Supply liquidity to tokenized real-world assets."\
- CTA: "Launch App" → redirects to `/dashboard`

------------------------------------------------------------------------

### **4.2 Dashboard Page**

**Route:** `/dashboard`\
**Features:**\
- Stats Cards:\
- Total Value Locked (TVL)\
- Current APY\
- My Total Supply\
- Market Overview Table:\
- Asset name\
- Risk score\
- APY\
- Button: "Supply"

------------------------------------------------------------------------

### **4.3 Transactions Page**

**Route:** `/transactions`\
**Features:**\
- Card Tab Buy
 
------------------------------------------------------------------------

### **4.4 History Page**

**Route:** `/history`\
**Features:**\
- Table/List of historical lending actions\
- Columns: Type, Asset, Amount, Hash (link to explorer), Date

------------------------------------------------------------------------

### **4.5 Settings Page**

**Route:** `/settings`\
- Blank page

------------------------------------------------------------------------

## 5. Network Configuration (wagmi / RainbowKit)

Wagmi config **must include these testnets:** - Mantle Sepolia --- Chain
ID: **5003** - Base Sepolia --- Chain ID: **84532** - Ethereum Sepolia
--- Chain ID: **11155111**

### Providers:

-   `WagmiConfig`
-   `RainbowKitProvider`
-   Must wrap entire app (in `/app/layout.tsx`)

------------------------------------------------------------------------


