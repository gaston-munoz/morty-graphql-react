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