# Kaspa dApp Template

A Next.js 14 template for building Kaspa blockchain dApps.

## Features

- Next.js 14 with App Router
- TypeScript
- Kaspa WASM SDK integration
- Wallet connection hook
- Tailwind CSS styling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── hooks/
│   └── useKaspaWallet.ts
├── lib/
│   └── kaspa.ts
├── components/
│   └── (your components)
├── public/
└── package.json
```

## Wallet Integration

The template includes a basic wallet connection hook. To use it:

```typescript
import { useKaspaWallet } from './hooks/useKaspaWallet'

function MyComponent() {
  const { address, balance, connected, connect, disconnect } = useKaspaWallet()
  
  // Use wallet state...
}
```

## Building Transactions

See the `hooks/useKaspaWallet.ts` file for the `sendTransaction` function stub. Implement transaction building using the Kaspa WASM SDK.

## Resources

- [Kaspa Documentation](https://docs.kas.fyi/)
- [Kaspa WASM SDK](https://www.npmjs.com/package/kaspa-wasm)
- [Next.js Documentation](https://nextjs.org/docs)
