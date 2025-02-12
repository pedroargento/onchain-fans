// app/layout.tsx
import { metadata } from "./metadata";

export { metadata };

export default function Head() {
    return (
      <>
        <title>OnChain Fans</title>
        <meta name="description" content="Sell images securely using Cartesi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </>
    );
  }