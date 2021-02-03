import { Tab, Tabs } from 'react-bootstrap';
import './PortalTabView.css';

function PortalTabView(props) {

    const { tabs } = props;

    const tabsView = tabs.map(tab => <Tab key={tab.id} eventKey={tab.id} title={tab.header} className="tab-header">
        <div className="tab-content">{tab.view}</div>
    </Tab>)

    return (
        <div className="c-portal-tab-view">
            <Tabs defaultActiveKey={tabs[0].id}>
                {tabsView}
            </Tabs>
        </div>
    );

}

export default PortalTabView;