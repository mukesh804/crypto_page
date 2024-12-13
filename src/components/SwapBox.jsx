import React, { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

const TokenInput = ({ value, onChange, token }) => (
  <div className="bg-[#2D2D3D] p-4 rounded-lg mb-2">
    <div className="flex justify-between">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0.0"
        className="bg-transparent outline-none w-2/3"
      />
      <button className="bg-[#1B1921] px-4 py-1 rounded-full">
        {token}
      </button>
    </div>
  </div>
);

export default function SwapBox() {
  const [token1Amount, setToken1Amount] = useState('');
  const [token2Amount, setToken2Amount] = useState('');
  const [connected, setConnected] = useState(false);

  const handleSwap = () => {
    // Implement swap logic here
    console.log('Swap initiated');
  };

  return (
    <div className="swap-container p-4 rounded-lg max-w-md w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Swap</h2>
        <button className="text-sm">⚙️</button>
      </div>

      <TokenInput 
        value={token1Amount}
        onChange={setToken1Amount}
        token="ETH"
      />

      <div className="flex justify-center my-2">
        <button className="bg-[#2D2D3D] p-2 rounded-full">
          <FaExchangeAlt />
        </button>
      </div>

      <TokenInput 
        value={token2Amount}
        onChange={setToken2Amount}
        token="USDC"
      />

      <button
        onClick={connected ? handleSwap : () => setConnected(true)}
        className="w-full bg-blue-600 py-3 rounded-lg mt-4 font-bold hover:bg-blue-700"
      >
        {connected ? 'Swap' : 'Connect Wallet'}
      </button>
    </div>
  );
}
