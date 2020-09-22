import React, { Props, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Search from '../Search';
import List from '../List';

const Layout = ({ children }: Props<JSX.Element> ): JSX.Element => {
    const [ filter, setFilter ] = useState('characters');
    const [ textSearch, setTextSearch ] = useState('');
    const [ pageState, setPageState ] = useState({
        prev   : 0 ,
        next   : 1  
      });

    return (
      <> 
          <Header />
          <div className="row d-flex ai-s">
            <div className="col-md-3 m-0 bg-primary">
              <Sidebar setFilter={setFilter} setPageState={setPageState} />
            </div>  
            <div className="col-md-9 padding-res">
              <Search setTextSearch={setTextSearch} textSearch={textSearch} setPageState={setPageState} />
              <List filter={filter} textSearch={textSearch} pageState={pageState} setPageState={setPageState} /> 
            </div>
          </div>
        <Footer />
      </>
    )
}

export default Layout;