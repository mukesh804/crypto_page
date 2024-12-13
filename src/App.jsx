import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SwapBox from './components/SwapBox'
import Home from './components/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/swap" element={
            <div className="pt-24 flex items-center justify-center">
              <SwapBox />
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
