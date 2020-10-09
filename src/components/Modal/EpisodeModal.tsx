import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { Button, Modal } from 'react-bootstrap';
import { ModalProps } from '.';
import Spinner from '../Spinner';

const EpisodeModal: React.SFC<ModalProps> = ({ show, _handleClose }) => {
    const { data, loading, error  } = useContext(ModalContext);
    const [ episode, setEpisode ] = useState({
        name      : '',
        episode   : '',
        air_date  : '',
        characters: [{name: ''}],
    })

    let chars: Array<any> = []
    useEffect(()=>{
      if(data) {
        for(let i = 0; i < 5; i++) {
            if(data.episode.characters[i]) {
             chars.push({...data.episode.characters[i] });                     
            } 
        }   
        const { episode: ep } = data
        setEpisode({ ...ep, characters: chars });

      }  
    }, [ data ])

    const { name, episode: episodeText, air_date, characters } = episode;

    return(
        <Modal show={show} onHide={_handleClose} className='' closeButton>
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
                    <h4 className='text-center'>Episode:</h4>
                    <h2 className='text-center'>{name}</h2>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className='hmodal-ep'>
                    <div className="data-content pt-4 pr-4 pl-4 pb-0">
                        <h4>Episode: <span className='text-normal'>{ episodeText }</span></h4>
                        <h4>Release date: <span className='text-normal pt-2 pb-2'>{ air_date }</span></h4>
                        <h4>Characters: 
                        <ul className='pl-5 list-group list-group-flush'>    
                        {
                          characters.map((res: any, i: number) => {
                            return  <li className='list-group-item text-normal pl-2' key={i}>{res.name}</li>
                        })   
                        }
                        </ul>
                        </h4>
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

export default EpisodeModal;

/**
 * 
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

 * 
 */