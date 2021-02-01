import React, { useContext, useState } from 'react';
import { ModalContext } from '../../context/ModalContext';
import Modal from '../Modal/index';
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

const Card = ( { data }: PropData) => {
  const [ show, setShow ] = useState(false);
  const { setEntityId, setData } = useContext(ModalContext);
  const { category: type, } = useContext(MainContext);

  const handleShow = (id: number) => {
    setEntityId(id);
    setShow(true)
  }

  const handleClose = () => {
    setData(null);
    setShow(false);
  }

  const renderBodyCard = (type: string, data: Data) => {
    switch (type) {
      case "character": 
        return showImg(data);
      default:
        return  showTitle(type, data);
    }
  }

  const showImg = (data: Data) => {
    return (
      <span>
        <img className="img-responseve img-card" src={ data.image } alt={ data.name } />
      </span>
    )
  }

  const showTitle = (type: string, data: Data) => {
    return (
      <h4 className='mt-2'>
        { 
          type === 'episodes' ? `Episode: ${ data.episode }` 
          :
          `Dimension: ${ data.dimension }` 
        }
      </h4>
    )
  }
  
return(
  <>
    <div className="card c-pointer m-2"
      onClick={()=>{handleShow(data.id)}} >
        <div className="card-header text-center">
            <h4>
                { data.name }
            </h4>
        </div>
        <div className="card-body"
        data-toggle="modal" data-target="#myModal">
        { renderBodyCard(type, data) }
        </div>
    </div>
    <Modal show={show} handleClose={handleClose} />    
  </>
    )
}

export default Card;
