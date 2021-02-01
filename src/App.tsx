import React from 'react';

// Context
import ProviderMainContext from './context/MainContext';
import PoviderModalContext from './context/ModalContext';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import List from './components/List';
import Footer from './components/Footer';

function App() {
  return (
    <ProviderMainContext>
      <PoviderModalContext>
        <Header />
        <div className="row d-flex ai-s">
          <div className="col-md-3 m-0 bg-primary">
            <Sidebar />
          </div>  
          <div className="col-md-9 padding-res">
            <Search />
            <List /> 
          </div>
        </div>
        <Footer />
      </PoviderModalContext>
    </ProviderMainContext>
  );
}

export default App;
