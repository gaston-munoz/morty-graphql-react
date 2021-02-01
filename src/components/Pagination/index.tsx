import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

const Pagination = () => {
  const { textSearch, data, getData } = useContext(MainContext);
  let dataEntries: any;
  let nextPage: number | undefined = undefined;
  let prevPage: number | undefined = undefined;

  if(data) {
    dataEntries = Object.entries(data);
    nextPage = dataEntries[0][1].info.next;
    prevPage = dataEntries[0][1].info.prev;
  }

  const fetchNewPage = (textSearch: string, page: number) => {
    getData({
      variables: {
        text: {
          name: textSearch
        }, 
        page
      }
    });

    window.scrollTo(0, 0);
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