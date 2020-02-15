import React from 'react';
import { Link } from 'react-router-dom';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Menuoption from '../menuoption/menuoption';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Content from './content/content';
import Container from '../container/container';
import { fire } from '../../config/firebase';

function logout(props) {
    
    return async function(e) {
        try{
            await fire.auth().signOut();
            // props.history.push('/');
        } catch (err) {
            console.log(err);
        }
    }
}



function Admin(props) {

    const sidebarOptions = [
        <Link to="/admin/moneylenders" key={0}>
            <Menuoption 
                title="Money Lenders"
                active={props.location.pathname == '/admin/moneylenders'}
                Icon={AttachMoneyIcon}
            />
        </Link>,
        <Link to="/admin/users" key={1}>
            <Menuoption 
                title="Users"
                active={props.location.pathname == '/admin/users'}
                Icon={PersonIcon}
            />
        </Link>,
        <Link to="/admin/changepassword" key={2}>
            <Menuoption 
                title="Change Password"
                active={props.location.pathname == '/admin/changepassword'}
                Icon={LockIcon}
            />
        </Link>,
        <Menuoption 
            key={3}
            title="Logout"
            onClick={logout(props)}
            Icon={ExitToAppIcon}
        />
    ];

    return (
        <Container
            sidebarOptions={sidebarOptions}
            location={props.location}
            history={props.history}>

            <Content />

        </Container>
    );
}

export default Admin;