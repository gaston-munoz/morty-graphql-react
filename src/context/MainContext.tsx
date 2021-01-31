import React, { useEffect, createContext } from 'react';
import { useState } from 'react';
import { useLazyQuery, gql, DocumentNode } from '@apollo/client'


export interface ProviderMainContextProps {
    
}

const queryCharacters: DocumentNode = gql`
  query ($text: FilterCharacter, $page: Int) {
      characters(filter: $text, page: $page) {
          info {
            next
            prev
          }
          results{
            id
            name
            image
          }
    }
}`

const queryEpisodes: DocumentNode = gql`
  query ($text: FilterEpisode, $page: Int) {
    episodes(filter: $text, page: $page) {
      info {
        next
        prev
      }
      results{
        id
        name
        episode 
    }
  }
}
`

const queryLocations: DocumentNode = gql`
  query ($text: FilterLocation, $page: Int) {
    locations(filter: $text, page: $page) {
      info {
        next
        prev
      }
      results{
        id
        name
        dimension 
    }
 }
}`

export const MainContext: any = createContext(null);
 
const ProviderMainContext: React.FC<ProviderMainContextProps> = ({ children }) => {
    const [ textSearch, setTextSearch ] = useState('');
    const [ category, setCategory ] = useState('characters');

    const query: DocumentNode = category === 'characters' ? queryCharacters : category === 'episodes' ? queryEpisodes : queryLocations;
    const [ getData, { data, loading, error } ] = useLazyQuery(query);

    useEffect(() => {
      if(!textSearch.length || textSearch.length > 2)
        getData({
            variables: {
                text: {
                    name: textSearch
                }
            }
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ textSearch, category ])

    return ( 
        <MainContext.Provider
            value={{
                data,
                textSearch,
                category,
                loading,
                error,

                getData,
                setTextSearch,
                setCategory
            }} >
            { children }
        </MainContext.Provider>
     );
}
 
export default ProviderMainContext;