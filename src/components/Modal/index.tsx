import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import CharacterModal from './CharacterModal';
import EpisodeModal from './EpisodeModal';
import LocationModal from './LocationModal';

export interface ModalProps {
    show: boolean;
    _handleClose: Function;
}
 
const Modal: React.SFC<ModalProps> = ({ show, _handleClose }) => {
    const { category } = useContext(MainContext);

    return ( 
      <>
        { 
          category === 'characters' ? 
              <CharacterModal show={show} _handleClose={_handleClose} /> 
            : 
            category === 'locations' ?  
              <LocationModal show={show} _handleClose={_handleClose} /> 
            : 
              <EpisodeModal show={show} _handleClose={_handleClose} />
        } 
      </>
     );
}
 
export default Modal;