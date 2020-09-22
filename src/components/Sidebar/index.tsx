import React, { ChangeEvent } from 'react';

interface PropsT {
  setFilter: Function,
  setPageState: Function
}

const Sidebar = ({setFilter, setPageState }:PropsT  ): JSX.Element => {

    const _handleChange = (e: ChangeEvent<HTMLInputElement>):void=> {
        setFilter(e.target.value);
        setPageState({
          prev: 0,
          next: 1
        });
    }

    return (
              <div className="container-fluid bg-primary pt-5">
                  <div className="card filters">
                    <div className="card-header text-center">
                      Filters
                    </div>
                    <div className="card-body bg-dark text-white card-responsive">
                      <div className="custom-control custom-radio c-pointer">
                        <input type="radio" 
                          className="custom-control-input" 
                          id="characters" 
                          name="filter" 
                          value="characters"
                          defaultChecked
                          onChange={ _handleChange } />
                        <label className="custom-control-label" htmlFor="characters">Characters</label>
                      </div>
                      <div className="custom-control custom-radio form-froup c-pointer">
                        <input type="radio" 
                        className="custom-control-input form-control c-pointer" 
                        id="episodes" 
                        name="filter" 
                        value="episodes" 
                        onChange={ _handleChange }/>
                        <label className="custom-control-label c-pointer" htmlFor="episodes">Episodes</label>
                      </div>
                      <div className="custom-control custom-radio ">
                        <input type="radio" 
                        className="custom-control-input c-pointer" 
                        id="locations" 
                        name="filter" 
                        value="locations" 
                        onChange={ _handleChange }/>
                        <label className="custom-control-label c-pointer" htmlFor="locations">Locations</label>
                      </div>
                  </div>
                </div>
              </div>
    )
}

export default Sidebar;