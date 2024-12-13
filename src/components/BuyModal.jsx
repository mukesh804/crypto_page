import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function BuyModal({ crypto, onClose }) {
  const [usdAmount, setUsdAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getCryptoAmount = () => {
    if (!usdAmount || isNaN(usdAmount)) return 0;
    const price = parseFloat(crypto.price.replace(',', ''));
    return (parseFloat(usdAmount) / price).toFixed(6);
  };

  const handleBuy = async () => {
    if (!usdAmount || isNaN(usdAmount)) {
      setError('Please enter a valid amount');
      return;
    }
    if (parseFloat(usdAmount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    setError('');
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onClose();
    } catch (err) {
      setError('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#1B1921] rounded-xl border border-[#2D2D3D] p-6 w-full max-w-md m-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Buy {crypto.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Current Price */}
        <div className="bg-[#2D2D3D] rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-400">Current Price</div>
          <div className="text-xl font-bold">${crypto.price}</div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Amount (USD)</label>
            <input
              type="number"
              value={usdAmount}
              onChange={(e) => {
                setUsdAmount(e.target.value);
                setError('');
              }}
              placeholder="Enter USD amount"
              className="w-full bg-[#2D2D3D] border border-[#3D3D4F] rounded-lg p-3 
                focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              You will receive ({crypto.symbol})
            </label>
            <div className="w-full bg-[#2D2D3D] border border-[#3D3D4F] rounded-lg p-3 
              text-gray-300">
              {getCryptoAmount()}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg border border-[#3D3D4F] hover:bg-[#2D2D3D] 
              transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleBuy}
            disabled={isLoading}
            className={`flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 
              transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent 
                  rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              'Buy Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
