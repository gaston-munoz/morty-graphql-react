import React, { ChangeEvent, Props } from 'react';

const Search = ({ setTextSearch, textSearch }: any) => {
    const _handleChange = (text: string) => {
      setTextSearch(text);
    }
/*
    const _handleClean = (e: ) => {
      e.preventDefault();
      setTextSearch('');
    }

*/
    return (
          <div className="input-group mb-3 m-1">
            <input type="text" 
              className="form-control b-radius" 
              placeholder="&#x1f50d; Entry the search" 
              aria-label="Recipient's username" 
              aria-describedby="button-addon2" 
              onChange={(e: ChangeEvent<HTMLInputElement> ) => { _handleChange(e.target.value)}}
              value={textSearch}
              autoFocus/>
            <div className="input-group-append">
              <button className="btn btn-primary rounded-sm" 
                type="button" 
                id="button-addon2"
                onClick={(e: React.MouseEvent<HTMLButtonElement> ) => { _handleChange('')}}>
                  Clean
              </button>
            </div>
          </div>
    )
}

export default Search;