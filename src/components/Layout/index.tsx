import React, { Props, useEffect, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Search from '../Search';
import List from '../List';

const Layout = ({ children }: Props<JSX.Element> ): JSX.Element => {

    const [ filter, setFilter ] = useState<string>('characters');
    const [ textSearch, setTextSearch ] = useState<string>('');

    const getCharacters = (filter: string, textSearch: string): void => {
        console.log(filter);
    }

    const getEpisodes = (filter: string, textSearch: string): void => {
        console.log(filter);
    }

    const getDimensions = (filter: string, textSearch: string): void => {
        console.log(filter);
    }


    useEffect(() => {
        if(!textSearch.length || textSearch.length > 3) {
            switch (filter) {
                case 'characters':
                    getCharacters(filter, textSearch);
                break;
                case 'episodes':
                    getEpisodes(filter, textSearch);
                break;
                case 'dimensions':
                    getDimensions(filter, textSearch);
                break;
            }
        }
    }, [ textSearch ])

    return (
      <> 
          <Header />
          <div className="row d-flex">
            <div className="col-md-3 m-0">
              <Sidebar setFilter={setFilter} />
            </div>  
            <div className="col-md-9 padding-res">
              <Search setTextSearch={setTextSearch} textSearch={textSearch} />
              <List />  {/* Sera la lista de de */}
            </div>
          </div>
        <Footer />
      </>
    )
}

export default Layout;