import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import CharacterModal from './CharacterModal';
import EpisodeModal from './EpisodeModal';
import LocationModal from './LocationModal';

export interface ModalProps {
    show: boolean;
    handleClose: Function;
}
 
const Modal: React.FC<ModalProps> = ({ show, handleClose }) => {
    const { category } = useContext(MainContext);

    return ( 
      <>
        { 
          category === 'characters' ? 
              <CharacterModal show={show} handleClose={handleClose} /> 
            : 
            category === 'locations' ?  
              <LocationModal show={show} handleClose={handleClose} /> 
            : 
              <EpisodeModal show={show} handleClose={handleClose} />
        } 
      </>
     );
}
 
export default Modal;