import { Tab, Tabs } from 'react-bootstrap';
import './PortalTabView.css';

function PortalTabView(props) {

    const { tabs } = props;

    const tabsView = tabs.map((tab, index) => <Tab key={index} eventKey={index} title={tab.header} className="tab-header">
        <div className="tab-content">{tab.view}</div>
    </Tab>)

    return (
        <div className="c-portal-tab-view">
            <Tabs defaultActiveKey={0}>
                {tabsView}
            </Tabs>
        </div>
    );

}

export default PortalTabView;