// App.tsx
import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import ProductListing from './components/ProductListing';

function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <ProductListing />
    </LanguageProvider>
  );
}

export default App;
