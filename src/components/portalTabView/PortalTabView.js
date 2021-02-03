import { Tab, Tabs } from 'react-bootstrap';
import './PortalTabView.css';

function PortalTabView(props) {
    return (
        <div className="c-portal-tab-view">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="פרופיל" className="tab-header">
                    <div className="tab-content">פרופיל</div>
                </Tab>
                <Tab eventKey="profile" title="קורסים" className="tab-header">
                    <div className="tab-content">קורסים</div>
                </Tab>
                <Tab eventKey="contact" title="עובדים" className="tab-header">
                    <div className="tab-content">עובדים</div>
                </Tab>
            </Tabs>
        </div>
    );

}

export default PortalTabView;