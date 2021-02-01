import React, { useState } from 'react'
import './PortalSearchPager.css';
import ArrowLeft from '../../assets/images/arrow_left.png';
import ArrowLeftGrey from '../../assets/images/arrow_left_grey.png';
import ArrowRight from '../../assets/images/arrow_right.png';
import ArrowRightGrey from '../../assets/images/arrow_right_grey.png';

function PortalSearchPager(props) {
    const { placeholder, pagesNumber, currentPage, handleSearch, pageChange } = props;
    const [search, setSearch] = useState("");



    return (

        <div className="p-input-pager">

            <form onSubmit={() => handleSearch(search)} >
                <input
                    className="p-input-pager_input"
                    placeholder={placeholder}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </form>
            { pagesNumber > 1 ? <div className="p-paging">
                {currentPage > 1 ?
                    <span onClick={() => pageChange(currentPage - 1)}><img src={ArrowRight} alt="" /></span> :
                    <span ><img src={ArrowRightGrey} alt="" /></span>}
                <span>{currentPage}</span>
                {currentPage < pagesNumber ?
                    <span onClick={() => pageChange(currentPage + 1)}><img src={ArrowLeft} alt="" /></span> :
                    <span><img src={ArrowLeftGrey} alt="" /></span>}
            </div> : null}
        </div>

    )
}

export default PortalSearchPager
