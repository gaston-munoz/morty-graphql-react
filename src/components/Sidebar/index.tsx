import React, { ChangeEvent, useRef, useContext } from 'react';
import { MainContext } from '../../context/MainContext';

interface PropsT {
  setFilter: Function,
  setPageState: Function
}

const Sidebar = (): JSX.Element => {
    const { setCategory } = useContext(MainContext);
    const charRef = useRef(null)

    const toggleColor = (type: string) => {
       let labels: NodeListOf<any> = document.querySelectorAll('.label-type');

       labels.forEach(l => {
          if(l.htmlFor === type) {
            l.classList.add('text-danger');
          }
          else {
            l.classList.remove('text-danger');
          }
       })
    }

    const _handleChange = (e: ChangeEvent<HTMLInputElement>, type: string):void=> {
      setCategory(e.target.value);
        toggleColor(type);
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
                          className="custom-control-input c-pointer" 
                          id="characters" 
                          name="filter" 
                          value="characters"
                          defaultChecked
                          onChange={ (e) => {_handleChange(e, "characters") } } />
                        <label className="c-pointer label-type text-danger" htmlFor="characters" ref={charRef}>Characters</label>
                      </div>
                      <div className="custom-control custom-radio form-froup c-pointer">
                        <input type="radio" 
                        className="custom-control-input form-control c-pointer" 
                        id="episodes" 
                        name="filter" 
                        value="episodes" 
                        onChange={ (e) => {_handleChange(e, "episodes") }}/>
                        <label className="c-pointer label-type" htmlFor="episodes">Episodes</label>
                      </div>
                      <div className="custom-control custom-radio ">
                        <input type="radio" 
                        className="custom-control-input c-pointer" 
                        id="locations" 
                        name="filter" 
                        value="locations" 
                        onChange={ (e) => {_handleChange(e, "locations") }}/>
                        <label className="c-pointer label-type" htmlFor="locations">Locations</label>
                      </div>
                  </div>
                </div>
              </div>
    )
}

export default Sidebar;