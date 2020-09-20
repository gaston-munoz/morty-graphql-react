import React from 'react';
import Card from '../Card'
import { results } from '../../db/index'

interface Data {
    name: string,
    image: string
}


const List = (): JSX.Element => {
    return (
        <>
          <div className="row mt-5 display-flex justify-conten-between">
          {
            results.map((data: Data, i: number) => (
              <div className="col-sm-3" key={i}>
                 <Card {...data} />
              </div>
            ))
          }
          </div>
        </>
    )
}

export default List;