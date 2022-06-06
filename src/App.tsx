import React, { useEffect } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import './styles/general.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
