import React from 'react';

const Pagination = () => {
    return(
      <nav>
        <ul className="pagination mt-5 bg-dark text-white b-radius-3 mb-2">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex={-1}>&larr; Previous</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">Next &rarr;</a>
          </li>
        </ul>
      </nav>
    )
}

export default Pagination;