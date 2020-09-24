import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ApolloClient, { ApolloQueryResult, gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql'
  })  


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

interface LocationData {
    location: Location,
}

interface PropChar {
    _handleClose: Function,
    show: boolean,
    locationId: number
}


export interface Location {
    name      : string,
    dimension   : string,
    type      : string,
    residents: [Resident]
}

interface Resident {
    name: string
}

const LocationModal = ({ locationId, show, _handleClose }: PropChar) => {
    const [ location, setLocation ] = useState({
        name      : '',
        dimension   : '',
        type      : '',
        residents: [{name: ''}],
    })

    const getEntity = (id:  number): void => {
        client.query({
            query: queryLocation,
            variables: {
                id
            }
        })
          .then( ({ data , loading, errors }: ApolloQueryResult<LocationData>) => {
            data.location.residents.splice(5, data.location.residents.length -1);
            setLocation({
                name     : data.location.name,
                dimension: data.location.dimension,
                type     : data.location.type,
                residents:  data.location.residents
            })
          })
          .catch(err => {
              console.log(err)
          })
    }

    useEffect(()=>{
        getEntity(locationId)
    }, [ locationId ])

    return(
        <Modal show={show} onHide={_handleClose} className='' closeButton>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Header className='hmodal-location'>
              <Modal.Title className=''>
                <h4 className='text-center'>Location:</h4>
                <h2 className='text-center'>{location.name}</h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="data-content pt-4 pr-4 pl-4 pb-0">
                    <h4>Dimension: <span className='text-normal'>{ location.dimension }</span></h4>
                    <h4>Type: <span className='text-normal mt-2 mb-2'>{ location.type ? location.type : 'No type' }</span></h4>
                    <h4>Residents: 
                    {
                        <ul className='pl-5 list-group list-group-flush'>{
                       location.residents.map((res, i) => {
                         return  <li className='list-group-item text-normal pl-2' key={i}>{res.name}</li>
                       } )
                        }
                       </ul>
                    }
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

export default LocationModal;


