import React from 'react';
import Sidebar from './sidebar/sidebar';
import { fire } from '../../config/firebase';

function logout(props) {
    
    return async function(e) {
        try{
            await fire.auth().signOut();
            props.history.push('/');
        } catch (err) {
            console.log(err);
        }
    }
}

function Container(props) {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%', height: 70, backgroundColor: '#333'}}>
                <button onClick={logout(props)}>logout</button>
            </div>
            <div style={{ flex: 1}}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                    <div> 
                        <Sidebar
                            history={props.history}
                            location={props.location}
                            options={props.sidebarOptions} />
                    </div>
                    <div style={{ flex: 1 }}>
                        { props.children }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Container;