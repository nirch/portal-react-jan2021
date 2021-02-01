import './PortalTableRow.css'

function PortalTableRow(props)
{
    const {headers, row, setSelectedRow} = props;

    const bodyRow = headers.map((item, index) => <td key={index} >{row[item.key]}</td>);

    return(
        <tr onClick={() => setSelectedRow(row)}>
            {bodyRow}
        </tr>
    )
}
export default PortalTableRow;