import React from 'react';

const Spinner = () => {
    return ( 
        <h3>
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </h3>
     );
}
 
export default Spinner;