import React from 'react';
import  { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { fire } from '../../config/firebase';
import Container from '../container/container';
import Menuoption from '../menuoption/menuoption';


function Users(props) {

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

    const sidebarOptions = [
        <Link to="/user/moneylenders">
            <Menuoption 
                title="Money Lenders"
                active={props.location.pathname == '/user/moneylenders'}
                Icon={AttachMoneyIcon}
            />
        </Link>,
        <Link to="/user/loans">
            <Menuoption 
                title="Loans"
                active={props.location.pathname == '/user/loans'}
                Icon={AccountBalanceIcon}
            />
        </Link>,
        <Link to="/user/changepassword">
            <Menuoption 
                title="Change Password"
                active={props.location.pathname == '/user/changepassword'}
                Icon={LockIcon}
            />
        </Link>,
        <Menuoption 
            title="Logout"
            onClick={logout(props)}
            Icon={ExitToAppIcon}
        />
    ];

    return (
        <Container
            location={props.location}
            history={props.history}
            sidebarOptions={sidebarOptions}>
            
        </Container>
    );
}

export default Users;