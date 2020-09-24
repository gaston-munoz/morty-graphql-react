import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import ApolloClient, { ApolloQueryResult, gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql'
  })  

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

interface PropChar {
    _handleClose: Function,
    show: boolean,
    char: number,
    type: string
}

interface CharacterData {
    character: Character,
}


interface Character {
  name: string,
  image: string,
  type: string,
  species: string,
  gender: string
}


interface Character {
    name: string,
    image: string,
    type: string,
    species: string,
    gender: string
}

const CharacterModal = ({ char, show, _handleClose, type }: PropChar) => {

    const [ character, setCharacter ] = useState({
        name   : '',
        type   : '',
        species: '',
        image  : '',
        gender : ''
    })

    const getEntity = (id:  number): void => {
        client.query({
            query: queryCharacter,
            variables: {
                id
            }
        })
          .then( ({ data , loading, errors }: ApolloQueryResult<CharacterData>) => {
              setCharacter(data.character)
          })
          .catch(err => {
              console.log(err)
          })
    }


    useEffect(()=>{
        getEntity(char)
    }, [ char ])


    return(
        <Modal show={show} onHide={_handleClose}>
            <Modal.Header className='' closeButton>
            </Modal.Header>
            <Modal.Header className='modal-res'>
              <Modal.Title className=''>
                <Image src={character.image} alt={character.name} className='mt-2 mx-auto' rounded  width='70%'/>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3 className='text-center'>{character.name}</h3>
                <div className="data-content pt-4 pr-4 pl-4 pb-0">
                    <h4>Species: <span className='text-normal'>{ character.species }</span></h4>
                    <h4>Gender: <span className='text-normal'>{ character.gender }</span></h4>
                    <h4>Type: <span className='text-normal'>{ character.type ? character.type : 'No type' }</span></h4>
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

export default CharacterModal;