import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { Button, Modal } from 'react-bootstrap';
import { ModalProps } from '.';
import Spinner from '../Spinner';

const LocationModal: React.FC<ModalProps> = ({ show, handleClose }) => {
    const { data, loading, error } = useContext(ModalContext);
    const [ location, setLocation ] = useState({
        name      : '',
        dimension   : '',
        type      : '',
        residents: [{name: ''}],
    })

    let resis: any = []

    useEffect(()=>{
        if(data) {
            for(let i = 0; i < 5; i++) {
                if(data.location.residents[i]) {
                 resis.push({...data.location.residents[i] });                     
                } 
            }   
            const { location: loc } = data
            setLocation({ ...loc, residents: resis });
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ data ])

    const { name = '', type = '', dimension = '', residents = [] } = location;

    return(
        <Modal show={show} onHide={handleClose} className='' closeButton>
            <Modal.Header closeButton>
            </Modal.Header>
            {
              error ? (<h2 className='text-center n-trans text-red m-3'>Oops, an error occurred ... Please try again</h2>)
              : 
               loading ? 
                <Spinner />  
              : 
              <>
                <Modal.Header className='hmodal-location'>
                <Modal.Title className=''>
                    <h4 className='text-center'>Location:</h4>
                    <h2 className='text-center'>{name}</h2>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="data-content pt-4 pr-4 pl-4 pb-0">
                        <h4>Dimension: <span className='text-normal'>{ dimension }</span></h4>
                        <h4>Type: <span className='text-normal mt-2 mb-2'>{ type ? type : 'No type' }</span></h4>
                        <h4>Residents: 
                        {
                            <ul className='pl-5 list-group list-group-flush'>{
                        residents.map((res: any, i: any) => {
                            return  <li className='list-group-item text-normal pl-2' key={i}>{res.name}</li>
                        } )
                            }
                        </ul>
                        }
                        </h4>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button  variant="primary" onClick={()=>{handleClose()}}>
                        Close
                    </Button>
                </Modal.Footer>
            </>
            }
        </Modal>
    )
}

export default LocationModal;
