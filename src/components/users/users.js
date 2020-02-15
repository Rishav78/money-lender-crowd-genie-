import React from 'react';
import Sidebar from './sidebar/sidebar';
import Container from '../container/container';

function Users(props) {
    return (
        <Container>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                <div>
                    <Sidebar 
                        history={props.history}
                        location={props.location}
                    />
                </div>
                <div style={{ flex: 1}}>

                </div>
            </div>
        </Container>
    );
}

export default Users;