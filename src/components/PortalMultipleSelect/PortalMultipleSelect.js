import { useState } from 'react';
import './PortalMultipleSelect.css';

// props:
// title - string - the title of the component
// options - array of objects - with key and value (e.g. [{key:'902', value:'project name'}])
// selectedOptions - array of strings - array of selected option keys (e.g. ['902', '904'])
// handleSelection - function - callback function that sends 3 params:
//      selectedOptionsObjects - array of objects - the selected options after the change
//      option - Object - object of the currently added or deleted item
//      isAdded - boolean - true if the option was added, false if the option was removed
const PortalMultipleSelect = (props) => {
    const {title, options, selectedOptions, handleSelection} = props;
    const [showOptions, setShowOptions] = useState(false);

    function onSelectionChange(option, isAdded, index){
        const newSelectedOptions = [...selectedOptions];
        if (isAdded) {
            newSelectedOptions.push(option.key);
            setShowOptions(false);
        } else {
            newSelectedOptions.splice(index,1);
        }
        
        const selectedOptionsObjects = newSelectedOptions.map(optionKey => options.find(option => option.key === optionKey));
        handleSelection(selectedOptionsObjects, option, isAdded);
    }

    const optionsView = options.filter(option => !selectedOptions.includes(option.key)).map(option => 
        <div className='option' onClick={() => {onSelectionChange(option, true)}}>
            {option.value}
        </div>
    );
    
    const selectedOptionsView = selectedOptions && selectedOptions.map((option, index) => 
            <div className='selected-options' onClick={() => {onSelectionChange(options[option-1], false, index)}}>
                <div>{options[option-1].value}</div>
                <div className='delete'><span>+</span></div>
            </div>
    );
    return (
        <div className='c-portal-multiple-select'>
            <div className='title'>{title}</div>
            <div className='selections'>
                {optionsView.length > 0 && 
                    <div className='selector' onClick={() => {setShowOptions(!showOptions)}}>+</div>
                }
                {selectedOptionsView}
            </div>
            {showOptions && <div className='options-view'>
                {optionsView}
            </div>}
        </div>
    );
}

export default PortalMultipleSelect;