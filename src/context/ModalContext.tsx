import React, { createContext, useState, useContext, useEffect } from 'react';
import { MainContext } from './MainContext'
import { DocumentNode, gql, useLazyQuery } from '@apollo/client';

export const ModalContext: any = createContext(null);

const queryCharacter = gql`
query ($id: ID!) {
  character(id: $id) {
    name
    species
    gender
    image
    type    
  }
}`

const queryEpisode = gql`
query ($id: ID!) {
  episode (id: $id) {
    name
    air_date
    episode
    characters {
      name
    }
  }
}`

const queryLocation = gql`
query ($id: ID!) {
  location (id: $id) {
    name
    type
    dimension
    residents {
      name
    }
  }
}`

export interface PoviderModalContextProps {
    
}
 
const PoviderModalContext: React.SFC<PoviderModalContextProps> = ({ children }) => {
    const { category } = useContext(MainContext);    
    const [ entityId, setEntityId ] = useState(0);

    const query: DocumentNode = category === 'characters' ? queryCharacter : category === 'episodes' ? queryEpisode : queryLocation;
    let [ getData, { data, loading, error } ]  = useLazyQuery(query)

    const setData = () => {
        data = null;
    }

    useEffect(()=> {
        if(entityId) {
            getData({
                variables: {
                    id: entityId
                }
            });
        }
    }, [ entityId ])

    return ( 
        <ModalContext.Provider
            value={{
                entityId,
                data,
                loading,
                error,

                setEntityId,
                getData,
                setData
            }}
        >
            { children }
        </ModalContext.Provider>
     );
}
 
export default PoviderModalContext;