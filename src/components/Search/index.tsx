import React, { ChangeEvent } from 'react';

interface PropT {
  setTextSearch: Function,
  textSearch: string,
  setPageState: Function
}

const Search = ({ setTextSearch, textSearch, setPageState }: PropT) => {
    const _handleChange = (text: string) => {
      setTextSearch(text);
      setPageState({
        prev: 0,
        next: 1
      });

    }

    return (
          <div className="input-group mb-3 col-md-12 col-offset-1 mx-auto m-1">
            <input type="text" 
              className="form-control b-radius" 
              placeholder="&#x1f50d; Search" 
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