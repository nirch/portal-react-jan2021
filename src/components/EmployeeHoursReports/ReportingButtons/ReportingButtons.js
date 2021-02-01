import React from 'react';
import './ReportingButtons.css'

const ReportingButtons = ({status, onStatusSelect}) => {
    

    return (
        <div className='c-reporting-buttons'>
            <div className='buttons'>
                <div className='reject radio-group' onClick={() => onStatusSelect(-1)}>
                    <div className='radio-text'>דחה</div>
                    <div className={status === -1 ? 'radio active' : 'radio'}>
                        <div className={status === -1 ? 'radio-fill' : ''}></div>
                    </div>
                </div>
                <div className='unapproved radio-group' onClick={() => onStatusSelect(0)}>
                    <div className='radio-text'>ממתין</div>
                    <div className={status === 0 ? 'radio active' : 'radio'}>
                        <div className={status === 0 ? 'radio-fill' : ''}></div>
                    </div>
                </div>
                <div className='approve radio-group' onClick={() => onStatusSelect(1)}>
                    <div className='radio-text'>אשר</div>
                    <div className={status === 1 ? 'radio active' : 'radio'}>
                        <div className={status === 1 ? 'radio-fill' : ''}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportingButtons;