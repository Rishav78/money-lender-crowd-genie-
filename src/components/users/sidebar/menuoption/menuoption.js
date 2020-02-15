import React from 'react';
import './style.css';

function onClick(props) {
    return function(e) {
        if(props.onClick) {
            props.onClick(e);
        }
    }
}

function Menuoption(props) {
    const { Icon, active } = props;
    return (
        <div
            className="user-sidebar-menuoption"
            onClick={onClick(props)} 
            style={{ display: 'flex', flexDirection: 'row', minWidth: 300, backgroundColor: active ? '#0d0d0d' : null}}>
            <div style={{ padding: ' 5px 15px', margin: '5px 0px' }}>
                <Icon />
            </div>
            <div style={{ flex: 1, padding: 15 }}>
                {props.title}
            </div>
        </div>
    );
}

export default Menuoption;