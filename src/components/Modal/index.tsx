import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { MainContext } from '../../context/MainContext';
import { Button, Modal } from 'react-bootstrap';
import Spinner from '../Spinner';
import Image from 'react-bootstrap/Image'


export interface ModalProps {
  show: boolean;
  handleClose: Function;
}

interface IEntity {
  name       : string;
  episode?   : string;
  air_date?  : string;
  characters?: any[];
  dimension? : string;
  type?      : string;
  residents? : any[];
  species?   : string;
  image?     : string;
  gender?    : string;
  elems?     : any[];

}

const EpisodeModal: React.FC<ModalProps> = ({ show, handleClose }) => {
  const { category } = useContext(MainContext);
  const initEntity: IEntity = {
    name      : '',
    episode   : '',
    air_date  : '',
    characters: [],
    dimension : '',
    type      : '',
    residents : [],
    species   : '',
    image     : '',
    gender    : ''
  }
  const [ entity, setEntity ] = useState(initEntity)
  const { data, loading, error  } = useContext(ModalContext);

  const closeModal = () => {
    setEntity(initEntity);
    handleClose();
  }

  useEffect(()=>{
    if(data) {
      if(category === 'characters') {
        setEntity(data.character);
      }
      else {
        const elems: any[] = [];

        for(let i = 0; i < 5; i++) {
          if(category === 'episodes') {   /// It is not possible to use Object.entries() because the position of the arrays is different
            if(data.episode.characters[i]) {
              elems.push({...data.episode.characters[i] });                     
            } 
          }
          else {
            if(data.location.residents[i]) {
              elems.push({...data.location.residents[i] });                     
             } 
          }
        }   
       
        setEntity({ ...data[`${category === 'episodes' ? 'episode' : 'location'}`], elems });
      }
    }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ data ])

  const renderTitle = (entity: IEntity): JSX.Element => {
    if(category === 'characters')
      return <Image src={entity.image} alt={entity.name} className='mt-2 mx-auto' rounded  width='70%'/>

    return (
      <>
        <h4 className='text-center'>{ category === 'locations' ? 'Location: ' : 'Episode' }</h4>
        <h2 className='text-center'>{ entity.name }</h2>
      </>
    ) 
  }

  const renderDataModal = (entity: IEntity): JSX.Element => {
    if(error)
      return showError();
    if(loading)
      return showLoading();
    
    return showBodyEntity(entity);
  }

  const showError = (): JSX.Element => (
    <h2 className='text-center n-trans text-red mt-3'>Oops, an error occurred ... Please try again</h2>
  )
  const showLoading = (): JSX.Element => (
    <Spinner /> 
  )

  const showBodyEntity = (entity: IEntity): JSX.Element => {
    return (
      <>
        <Modal.Header className='hmodal-location'>
          <Modal.Title className=''>
            { renderTitle(entity) }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='hmodal-ep'>
          { showBody(entity) }
        </Modal.Body>
      </>
    )
  }
  
  const showBody = (entity: IEntity): JSX.Element => {
    if(category === 'characters') 
      return characterData(entity); 
    return epiLocaData(entity);
  }

  const characterData = (entity: IEntity):JSX.Element => (
    <>
      <h3 className='text-center'>{entity.name}</h3>
      <div className="data-content pt-4 pr-4 pl-4 pb-0">
          <h4>Species: <span className='text-normal'>{ entity.species }</span></h4>
          <h4>Gender: <span className='text-normal'>{ entity.gender }</span></h4>
          <h4>Type: <span className='text-normal'>{ entity.type ? entity.type : 'No type' }</span></h4>
      </div>
    </>
  )
 
  const epiLocaData = (entity: IEntity): JSX.Element => (
    <>
      <div className="data-content pt-4 pr-4 pl-4 pb-0">
        <h4>{ category === 'episodes'? 'Episode:' : 'Dimension' }
          <span className='text-normal'>
            { category === 'episodes'? entity.episode : entity.dimension }
          </span>
        </h4>
        <h4>{ category === 'episodes'? 'Release date: ' : 'Type: ' }
          <span className='text-normal pt-2 pb-2'>
            { category === 'episodes'? entity.air_date : entity.type }
          </span>
        </h4>
        <h4>{ category === 'episodes'? 'Characters: ' : 'Residents: ' } 
          <ul className='pl-5 list-group list-group-flush'>    
            {
              entity.elems && entity.elems.map((res: any, i: number) => {
                return  <li className='list-group-item text-normal pl-2' key={i}>{res.name}</li>
              })   
            }
          </ul>
        </h4>
      </div>
    </>
  )

  return(
    <Modal show={show} onHide={closeModal} className='' closeButton>
        <Modal.Header closeButton>
        </Modal.Header>
        { renderDataModal(entity) }
        <Modal.Footer>
            <Button  variant="primary" onClick={()=>{handleClose()}}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default EpisodeModal;
