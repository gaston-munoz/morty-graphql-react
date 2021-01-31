import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { Button, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import Spinner from '../Spinner';
import { ModalProps } from '.';


const CharacterModal: React.FC<ModalProps> = ({ show, _handleClose }) => {
    const { data, loading, error } = useContext(ModalContext);

    const [ character, setCharacter ] = useState({
        name   : '',
        type   : '',
        species: '',
        image  : '',
        gender : ''
    })

    useEffect(() => {
        if(data) 
          setCharacter(data.character)
    }, [ data ])

 

    return(
        <Modal
         show={show}
         dialogClassName='custom-modal'
         onHide={_handleClose}>
            <Modal.Header className='' closeButton>
            </Modal.Header>
            {
              error ? (<h2 className='text-center n-trans text-red mt-3'>Oops, an error occurred ... Please try again</h2>)
              :              
              loading ? 
                <Spinner />  
              : 
              <>
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
            </>
            }
            <Modal.Footer>
                <Button  variant="primary" onClick={()=>{_handleClose()}}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CharacterModal;
