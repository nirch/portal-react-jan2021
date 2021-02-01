import './PortalTable.css'
import {Table} from 'react-bootstrap';
import PortalTableRow from './PortalTableRow';

function PortalTable(props)
{
    const {headers, data, changeSelected} = props;


    const tableHdr = headers.map((item, index) => <th key={index}>{item.header}</th>)

    return(
        <>
        <Table className="c-table no-border" >
            <thead>
                <tr>
                    {tableHdr}
                </tr>
            </thead>
            <tbody>
                {data.map(( row, index) =>
                    <PortalTableRow key={index} headers={headers} row={row} setSelectedRow={changeSelected} />
                )}
            </tbody>
        </Table>
        </>
    )
}
export default PortalTable;