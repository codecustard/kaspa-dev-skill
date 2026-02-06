# Kaspa Block Explorer Template

A Next.js 14 template for building a Kaspa block explorer.

## Features

- Next.js 14 with App Router
- TypeScript
- Real-time block data from Kaspa API
- Network statistics dashboard
- Latest blocks table
- Tailwind CSS styling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API key
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_KASPA_API_URL=https://api.kaspa.org
NEXT_PUBLIC_KASPA_API_KEY=your_api_key_here
```

Get an API key at: https://kas.fyi/

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── api.ts          # API client and types
├── components/
│   └── (your components)
├── public/
└── package.json
```

## Features to Add

- [ ] Search functionality (blocks, transactions, addresses)
- [ ] Transaction details page
- [ ] Block details page
- [ ] Address page with transaction history
- [ ] Charts and visualizations
- [ ] KRC20 token support
- [ ] Real-time updates via WebSocket

## API Endpoints Used

- `get-block-dag-info` - Network statistics
- `get-blocks` - Latest blocks
- `get-block` - Block details
- `get-transactions` - Transaction details
- `get-coin-supply` - Supply information

## Resources

- [Kaspa API Documentation](https://docs.kas.fyi/)
- [Next.js Documentation](https://nextjs.org/docs)
