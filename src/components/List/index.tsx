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

interface TextProp {
  filter: string,
  textSearch: string,
  pageState: StateP
  setPageState: Function
}

interface StateP {
  prev: number,
  next: number
}

const List = (): JSX.Element => {
  const { category, textSearch, loading, error, data } = useContext(MainContext);
  const [ results, setResults ] = useState([])

  useEffect(() => {
    if(data)
      setResults(category === 'characters' ? data.characters.results : category === 'episodes' ? data.episodes.results : data.locations.results )
  }, [ data ])

    if(error && error.message !== '404: Not Found') return (<h2 className='text-center n-trans text-red mt-3'>Oops, an error occurred ... Please try again</h2>)
    if(loading) return (<Spinner />)
    if(error && error.message === '404: Not Found' || !results.length) return (<h2 className='text-center n-trans mt-5 pt-2'>Nothing around here... try something else</h2>)
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