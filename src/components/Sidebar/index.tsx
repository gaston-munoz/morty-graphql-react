import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';


const Sidebar = ({setFilter }: any  ): JSX.Element => {

    const _handleChange = (e: ChangeEvent<HTMLInputElement>):void=> {
        setFilter(e.target.value);
    }

    return (
              <div className="container-fluid bg-primary pt-5">
                  <div className="card filters">
                    <div className="card-header text-center">
                      Filters
                    </div>
                    <div className="card-body bg-dark text-white">
                    <div>
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
                        id="dimensions" 
                        name="filter" 
                        value="dimensions" 
                        onChange={ _handleChange }/>
                        <label className="custom-control-label c-pointer" htmlFor="dimensions">Dimensions</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}

export default Sidebar;