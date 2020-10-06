import React, { useEffect, useState } from 'react';
import Card from '../Card'
import Spinner from '../Spinner';
import Pagination from '../Pagination'

// import { results } from '../../db/index'
import ApolloClient, { DocumentNode, gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
})

interface Data {
    id: number,
    name: string,
    image?: string,
    type?: string

}

const queryCharacters: DocumentNode = gql`
  query ($text: FilterCharacter, $page: Int) {
      characters(filter: $text, page: $page) {
          info {
            next
            prev
          }
          results{
            id
            name
            image
          }
    }
}`

const queryEpisodes: DocumentNode = gql`
  query ($text: FilterEpisode, $page: Int) {
    episodes(filter: $text, page: $page) {
      info {
        next
        prev
      }
      results{
        id
        name
        episode 
    }
  }
}
`

const queryLocations: DocumentNode = gql`
  query ($text: FilterLocation, $page: Int) {
    locations(filter: $text, page: $page) {
      info {
        next
        prev
      }
      results{
        id
        name
        dimension 
    }
 }
}`

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

const List = ( { filter, textSearch, pageState, setPageState }: TextProp ): JSX.Element => {
  const [ results, setResults ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)


const fetchData = (filter: string, textSearch: string, page: number ) => {
  setLoading(true)
  setError(false);
  let query = filter === 'characters' ? queryCharacters : filter === 'locations' ?  queryLocations : queryEpisodes;
  client.query({ 
      query,
      variables: {
          page,
          text: {
             name: textSearch,
          }
      }
   })
  .then(( { data, loading } ) => {
      setLoading(loading)
      if(filter === 'characters') {
        setResults(data.characters.results)
        setPageState({
          prev   : data.characters.info.prev,
          next   : data.characters.info.next
        })
      } 
      else if(filter === 'locations') {
        setResults(data.locations.results)
        setPageState({
          prev   : data.locations.info.prev,
          next   : data.locations.info.next
        })
      }
      else if(filter === 'episodes') {
        setResults(data.episodes.results)
        setPageState({
          prev   : data.episodes.info.prev,
          next   : data.episodes.info.next
        })
      }
      return;
  })
  .catch(err => {
          if(err.message.toString().split(':')[1] === " 404"){
             setResults([]);
             setLoading(false);
             setError(false);
             return;
          }  
          setError(true);
          return;
  })
}

const getResults = (textSearch: string, filter: string, page: number): void => {
  if(!textSearch.length || textSearch.length > 3) {
    fetchData( filter, textSearch, page);
  }
}  


 useEffect(() => {
  getResults(textSearch, filter, pageState.next )
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [ textSearch, filter ])

    if(error) return (<h2 className='text-center n-trans text-red mt-3'>Ups, ocurrio un error...  vuelve a intentarlo</h2>)
    if(loading) return (<Spinner />)
    if(!results.length) return (<h2 className='text-center n-trans mt-5 pt-2'>Nada por aquí... intenta con otra cosa</h2>)
    return (
        <>
          <div className="row mt-5 display-flex min-heigth-90">
          {
            results.map((data: Data, i: number) => (
              <div className="col-sm-4" key={i}>
                 <Card data={data} type={filter} />
              </div>
            ))
          }
          </div>
          <nav>
            <ul className="pagination mt-5 bg-dark text-white b-radius-3 mb-2">
              <li 
                className={`page-item ${pageState.prev ? '' : 'disabled'}`}
                onClick={()=>{ 
                  if(pageState.prev)
                    getResults(textSearch, filter, pageState.prev) }}>
                <span className="page-link">&larr; Previous</span>
              </li>
              <li 
                className={`page-item ${pageState.next ? '' : 'disabled'}`}
                onClick={()=>{ 
                  if(pageState.next)
                    getResults(textSearch, filter, pageState.next) }}>
                <span className="page-link">Next &rarr;</span>
              </li>
            </ul>
          </nav>          
        </>
    )
}

export default List;