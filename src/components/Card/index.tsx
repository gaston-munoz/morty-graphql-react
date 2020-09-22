import React from 'react';

interface PropData {
    data?: Data,
    type: string,
}

interface Data {
    name: string,
    type?: string,
    image?: string,
    episode?: string,
    dimension?: string
}

const Card = ( {data, type}: PropData) => {
    console.log('DATA', type)
    return(
        <div className="card c-pointer mb-2">
            <div className="card-header text-center">
                <h4>
                    { data ? data.name : '' }
                </h4>
            </div>
            <div className="card-body">

            { 
              type === 'characters' ?    
                <a href="/">
                    <img className="img-responseve img-card" src={ data ? data.image : '' } alt={data ? data.image : ''} />
                </a>
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

    )
}

export default Card;

/*

import React from 'react';
interface Data {
    name: string,
    image: string
}

const Card = ( data: Data): JSX.Element => {
    return(
        <div className="card m-2">
            <div className="card-header text-center">
                <h4>
                    { data.name }
                </h4>
            </div>
            <div className="card-body">
                <a href="/">
                    <img className="img-responseve img-card" src={ data.image } alt={data.image} />
                </a>
            </div>
        </div>

    )
}

export default Card;

*/