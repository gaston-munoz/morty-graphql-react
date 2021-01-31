import React, { ChangeEvent, useContext } from 'react';
import { MainContext } from '../../context/MainContext';

interface PropT {
  setTextSearch: Function,
  textSearch: string,
  setPageState: Function
}

const Search = (): JSX.Element => {
  const { textSearch, setTextSearch } = useContext(MainContext);

    const handleChange = (text: string) => {
      setTextSearch(text);
    }

    return (
          <div className="input-group mb-3 col-md-12 col-offset-1 mx-auto m-1">
            <input type="text" 
              className="form-control b-radius" 
              placeholder="&#x1f50d; Search" 
              aria-label="Recipient's username" 
              aria-describedby="button-addon2" 
              onChange={(e: ChangeEvent<HTMLInputElement> ) => { handleChange(e.target.value)}}
              value={textSearch}
              autoFocus/>
            <div className="input-group-append">
              <button className="btn btn-primary rounded-sm" 
                type="button" 
                id="button-addon2"
                onClick={(e: React.MouseEvent<HTMLButtonElement> ) => { handleChange('')}}>
                  Clean
              </button>
            </div>
          </div>
    )
}

export default Search;