import React, { useContext, useState } from 'react';
import { ModalContext } from '../../context/ModalContext';
import Modal from '../Modal';
import { MainContext } from '../../context/MainContext';
  
interface PropData {
    data: Data,
    type?: string
}

interface Data {
    id: number,
    name: string,
    type?: string,
    image?: string,
    episode?: string,
    dimension?: string
}

interface CharacterData {
    character: Character
}

interface Character {
  name: string,
  image: string,
  type?: string,
  species: string,
  gender: string
}

const Card = ( { data }: PropData) => {
  const [ show, setShow ] = useState(false);
  const { setEntityId, setData } = useContext(ModalContext);
  const { category: type, } = useContext(MainContext);

  const _handleShow = (id: number) => {
    setEntityId(id);
    setShow(true)
  }

  const _handleClose = () => {
    setData(null);
    setShow(false);
  }
  
return(
  <>
    <div className="card c-pointer m-2"
      onClick={()=>{_handleShow(data.id)}} >
        <div className="card-header text-center">
            <h4>
                { data ? data.name : '' }
            </h4>
        </div>
        <div className="card-body"
        data-toggle="modal" data-target="#myModal">

        { 
          type === 'characters' ?    
            <span>
                <img className="img-responseve img-card" src={ data ? data.image : '' } alt={data ? data.image : ''} />
            </span>
          :  type === 'episodes' ?
            <h4 className='mt-2'>
                Episode: { data ? data.episode : ''}
            </h4>
          :
          <>
            <h4  className='mt-2'>
                Dimension: { data ? data.dimension : '' }
            </h4>
          </>
        }
        </div>
    </div>
    <Modal show={show} _handleClose={_handleClose} />    

  </>
    )
}

export default Card;