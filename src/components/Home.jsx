import React, { useState } from 'react';
import MarketGraph from './MarketGraph';
import BuyModal from './BuyModal';

const MOCK_DATA = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', price: '30,000', marketCap: '580B', change: '+2.5' },
  { id: 2, name: 'Ethereum', symbol: 'ETH', price: '1,800', marketCap: '220B', change: '+1.8' },
  { id: 3, name: 'BNB', symbol: 'BNB', price: '240', marketCap: '37B', change: '-0.5' },
  { id: 4, name: 'XRP', symbol: 'XRP', price: '0.47', marketCap: '25B', change: '+0.7' },
  { id: 5, name: 'Cardano', symbol: 'ADA', price: '0.28', marketCap: '10B', change: '-1.2' },
];

export default function Home() {
  const [currencies] = useState(MOCK_DATA);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24">
      <MarketGraph />
      <h1 className="text-2xl font-bold mb-6">Top Cryptocurrencies by Market Cap</h1>
      <div className="bg-[#1B1921] rounded-lg border border-[#2D2D3D]">
        <div className="grid grid-cols-5 p-4 font-bold border-b border-[#2D2D3D]">
          <div>Name</div>
          <div>Symbol</div>
          <div>Price</div>
          <div>Market Cap</div>
          <div>24h Change</div>
        </div>
        {currencies.map(currency => (
          <div 
            key={currency.id} 
            className="grid grid-cols-5 p-4 border-b border-[#2D2D3D] hover:bg-[#2D2D3D] 
              cursor-pointer transition-colors"
            onClick={() => setSelectedCrypto(currency)}
          >
            <div>{currency.name}</div>
            <div>{currency.symbol}</div>
            <div>${currency.price}</div>
            <div>${currency.marketCap}</div>
            <div className={currency.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}>
              {currency.change}%
            </div>
          </div>
        ))}
      </div>

      {selectedCrypto && (
        <BuyModal 
          crypto={selectedCrypto} 
          onClose={() => setSelectedCrypto(null)} 
        />
      )}
    </div>
  );
}
