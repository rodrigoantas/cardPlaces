import React from 'react';

import LandingPage from './pages/LandingPage';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <LandingPage />
      <GlobalStyle />
    </>
  );
};

export default App;
