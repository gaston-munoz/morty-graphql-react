import React, { useContext, useEffect, useState } from 'react';

import Card from '../Card'
import Spinner from '../Spinner';
import Pagination from '../Pagination'
import { MainContext } from '../../context/MainContext';

interface Data {
    id: number,
    name: string,
    image?: string,
    type?: string

}

type IEntries = any[][];

const List = (): JSX.Element => {
  const array: Data[] = []
  const { loading, error, data } = useContext(MainContext);
  const [ results, setResults ] = useState(array)

  function handleErrors() {
      if(error.message !== '404: Not Found')
        return <h2 className='text-center n-trans text-red mt-3'>Oops, an error occurred ... Please try again</h2>
      else {
        return (<h2 className='text-center n-trans mt-5 pt-2'>Nothing around here... try something else</h2>)
      }  
  }

  useEffect(() => {
    if(data) {
      const entries: IEntries = Object.entries(data);
      setResults(entries[0][1].results )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ data ])

    if(loading) return (<Spinner />)
    if(error) return handleErrors();
    return (
        <>
          <div className="row mt-5 display-flex min-heigth-90">
          {
            results.map((data: Data, i: number) => (
              <div className="col-sm-3" key={i}>
                 <Card data={data} />
              </div>
            ))
          }
          </div>
          <Pagination />
        </>
    )
}

export default List;