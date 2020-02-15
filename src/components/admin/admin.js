import React from 'react';
import { fire } from '../../config/firebase';
import Sidebar from './sidebar/sidebar';
import Content from './content/content';
import Container from '../container/container';

function Admin(props) {
    return (
        <Container>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                <div>
                    <Sidebar
                        history={props.history}
                        location={props.location}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Content />
                </div>
            </div>
        </Container>
    );
}

export default Admin;