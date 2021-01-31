import React from 'react';
import moment from 'moment';

const Footer = (): JSX.Element => {
    return(
        <footer className='bg-dark m-0'>
            <div className="footer m-0 p-3">
                <div className='m-0 text-center text-white d-flex justify-content-between align-items-center text-white'>
                    <h3 className='text-white name'>
                        Gastón Muñoz
                    </h3>
                    <h5 className='text-white name'>
                        { moment().format('DD MMM yyyy') } 
                    </h5>
                </div>
            </div>
        </footer>
    )
}

export default Footer;