import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

const Pagination = () => {
  const { category, textSearch, loading, error, data, getData } = useContext(MainContext);
  const nextPage = category === 'characters' ? data?.characters.info.next : category === 'episodes' ? data?.episodes.info.next :
    data?.locations.info.next;
  
  const prevPage = category === 'characters' ? data?.characters.info.prev : category === 'episodes' ? data?.episodes.info.prev :
    data?.locations.info.prev;  

  const fetchNewPage = (textSearch: string, page: number) => {
    getData({
      variables: {
        text: {
          name: textSearch
        }, 
        page
      }
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

    return(
      <nav>
      <ul className="pagination mt-5 bg-dark text-white b-radius-3 mb-2">
        <li 
          className={`page-item ${ prevPage ? '' : 'disabled'}`}
          onClick={()=>{ 
            if(prevPage)
              fetchNewPage(textSearch, prevPage) }}>
          <span className="page-link">&larr; Previous</span>
        </li>
        <li 
          className={`page-item ${nextPage ? '' : 'disabled'}`}
          onClick={()=>{ 
            if(nextPage)
              fetchNewPage(textSearch, nextPage) }}>
          <span className="page-link">Next &rarr;</span>
        </li>
      </ul>
    </nav> 
    )
}

export default Pagination;