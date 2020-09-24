import React, { useState } from 'react';
import CharacterModal from '../Modal/CharacterModal';
import LocationModal from '../Modal/LocationModal';
import EpisodeModal from '../Modal/EpisodeModal';

interface PropData {
    data?: Data,
    type: string
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
  type: string,
  species: string,
  gender: string
}

const Card = ( {data, type}: PropData) => {
    const [ show, setShow ] = useState(false);

const _handleClose = () => {
  setShow(false);
}

return(
  <>
    <div className="card c-pointer mb-2"
      onClick={()=>{setShow(true)}} >
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
      { type === 'characters' ? <CharacterModal show={show} type={type} char={data && data.id ? data.id : 1} _handleClose={_handleClose} /> :
        type === 'locations' ?  <LocationModal show={show} locationId={data && data.id ? data.id : 1} _handleClose={_handleClose} /> :
        <EpisodeModal show={show} episodeId={data && data.id ? data.id : 1} _handleClose={_handleClose} />
      } 
  </>
    )
}

export default Card;