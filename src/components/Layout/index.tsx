import React, { Props, useEffect, useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Search from '../Search';
import List from '../List';
import ApolloClient, { ApolloCurrentQueryResult, ApolloQueryResult, gql } from 'apollo-boost';  
import { DocumentNode } from 'graphql';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql'
  })

const Layout = ({ children }: Props<JSX.Element> ): JSX.Element => {
    const [ filter, setFilter ] = useState<string>('characters');
    const [ textSearch, setTextSearch ] = useState<string>('');
    const [ results, setResults ] = useState([])

    let queryCharacters: DocumentNode = gql`
     query characters{
        characters {
            results {
              name
              image
            }
        }
    }
`


    useEffect(()=> {
        getCharacters(filter, textSearch);
        
    }, [])


    interface CharacterData {
        characters : Result
    }

    interface Result {
        results: Character[]
    }
    interface Character {
        name: string,


    }


    const getCharacters = (filter: string, textSearch: string): void => {
        client.query( {query: queryCharacters})
         .then(( {data}: ApolloQueryResult<any> ) => {
             console.log('RES', data);
             setResults(data.characters.results)
         })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <List /> 
            </div>
          </div>
        <Footer />
      </>
    )
}

export default Layout;