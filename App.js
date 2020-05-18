import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import State from './src/context/State';

export default function App() {
  return (
    <State>
      <AppNavigation/>
    </State>
  );
}

