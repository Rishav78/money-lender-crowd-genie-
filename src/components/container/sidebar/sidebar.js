import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import Menuoption from '../../menuoption/menuoption';
import './style.css';

function Sidebar(props) {

    const [showmore, onChangeShowmore] = useState(false);
    return (
        <div className="adminsidebar" style={{ height: '100%', width: showmore ? null : '60px', overflow: 'hidden', backgroundColor: '#333', color: 'white' }}>
            <Menuoption 
                title="Menu"
                onClick={() => onChangeShowmore(!showmore)}
                Icon={MenuIcon}
            />
            { props.options }
        </div>
    );
}

export default Sidebar;