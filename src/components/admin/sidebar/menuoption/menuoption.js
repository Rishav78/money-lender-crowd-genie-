import React from 'react';
import './style.css';

function Menuoption({title, Icon, onClick}) {
    return (
        <div
            className="admin-sidebar-menuoption"
            onClick={onClick} 
            style={{ display: 'flex', flexDirection: 'row', minWidth: 300}}>
            <div style={{ padding: ' 5px 15px', margin: '5px 0px' }}>
                <Icon />
            </div>
            <div style={{ flex: 1, padding: 15 }}>
                {title}
            </div>
        </div>
    );
}

export default Menuoption;