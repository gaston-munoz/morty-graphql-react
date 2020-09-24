import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ApolloClient, { ApolloQueryResult, gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql'
  })  


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

interface EpisodeData {
    episode: Episode,
}


interface Character {
    name: string
}




export interface Episode {
    name      : string,
    episode   : string,
    air_date  : string,
    characters: [Character],
}

interface PropEpi {
    _handleClose: Function,
    show: boolean,
    episodeId: number
}

const EpisodeModal = ({ episodeId, show, _handleClose }: PropEpi) => {
    const [ episode, setEpisode ] = useState({
        name      : '',
        episode   : '',
        air_date  : '',
        characters: [{name: ''}],
    })

    const getEntity = (id:  number): void => {
        client.query({
            query: queryEpisode,
            variables: {
                id
            }
        })
          .then( ({ data , loading, errors }: ApolloQueryResult<EpisodeData>) => {
            data.episode.characters.splice(5, data.episode.characters.length -1);
            setEpisode(data.episode);
          })
          .catch(err => {
              console.log('')
          })
    }

    useEffect(()=>{
        getEntity(episodeId)
    }, [ episodeId ])

    return(
        <Modal show={show} onHide={_handleClose} className='' closeButton>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Header className='hmodal-location'>
              <Modal.Title className=''>
                <h4 className='text-center'>Episode:</h4>
                <h2 className='text-center'>{episode.name}</h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="data-content pt-4 pr-4 pl-4 pb-0">
                    <h4>Episode: <span className='text-normal'>{ episode.episode }</span></h4>
                    <h4>Release date: <span className='text-normal pt-2 pb-2'>{ episode.air_date }</span></h4>
                    <h4>Characters: 
                    <ul className='pl-5 list-group list-group-flush'>    
                    {
                       episode.characters.map((res, i) => {
                         return  <li className='list-group-item text-normal pl-2' key={i}>{res.name}</li>
                       })   
                    }
                    </ul>
                    </h4>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button  variant="primary" onClick={()=>{_handleClose()}}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EpisodeModal;
