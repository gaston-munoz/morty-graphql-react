import React, { useEffect, useState } from 'react';
import Card from '../Card'
import Spinner from '../Spinner';
import Pagination from '../Pagination'

// import { results } from '../../db/index'
import ApolloClient, { gql } from 'apollo-boost';

interface Data {
    name: string,
    image?: string,
    type?: string

}

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
})

const queryCharacters = gql`
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
}
`

const queryEpisodes = gql`
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

const queryLocations = gql`
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
} 
`

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
  console.log('FIL', filter, textSearch)
  const [ results, setResults ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)


const fetchData = (filter: string, textSearch: string, page: number ) => {
  console.log('AQUI ESTOY', filter, textSearch, page )
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
      console.log('RES', data, loading)
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
          console.log(err.message);
          if(err.message.toString().split(':')[1] === " 404"){
             setResults([]);
             setLoading(false);
             setError(false);
             console.log('rer', err.message.toString().split(':'))
             return;
          }  
          setError(true);
          return;
  })
}
/*
const getEpisodes = (filter: string, textSearch: string) => {
  setLoading(true)
  client.query({ 
      query: queryEpisodes,
      variables: {
          text: {
             name: textSearch
          }
      }
   })
  .then(( { data, loading } ) => {
      console.log('RES', data, loading)
      setLoading(loading)
      setResults(data.episodes.results)
  })
  .catch(err => {
          console.log(err);
          if(err.message.toString().split(':')[1] === " 404"){
            setResults([]);
            setLoading(false);
            setError(false);
            console.log('rer', err.message.toString().split(':'))
            return;
         }  
          setResults([]);
          return;
  })
}

const getLocations = (filter: string, textSearch: string) => {
  setLoading(true)
  client.query({ 
      query: queryLocations,
      variables: {
          text: {
             name: textSearch
          }
      }
   })
  .then(( { data, loading } ) => {
      console.log('RES', data, loading, textSearch)
      setLoading(loading)
      setResults(data.locations.results)
      setPageState({
        prev   : data.info.prev,
        next   : data.info.next
      })
  })
  .catch(err => {
          console.log(err);
          if(err.message.toString().split(':')[1] === " 404"){
            setResults([]);
            setLoading(false);
            setError(false);
            console.log('rer', err.message.toString().split(':'))
            return;
         }  
          setError(true)
          setResults([]);
          return;
  })
}


 useEffect(()=> {
    console.log('PAGES', pageState)
 }, [pageState])

 const getResults = (textSearch: string, filter: string, page: number) => {
    if(!textSearch.length || textSearch.length > 3) {
      switch (filter) {
          case 'characters':
              getCharacters(filter, textSearch, page);
          break;
          case 'episodes':
              getEpisodes(filter, textSearch);
          break;
          case 'locations':
              getLocations(filter, textSearch);
          break;
      }
    }

 }
*/

const getResults = (textSearch: string, filter: string, page: number) => {
  if(!textSearch.length || textSearch.length > 3) {
    fetchData( filter, textSearch, page);
  }
}  


 useEffect(() => {
  getResults(textSearch, filter, pageState.next )
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [ textSearch, filter ])

    if(error) return (<h2>Ups, ocurrio un error</h2>)
    if(loading) return (<Spinner />)
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