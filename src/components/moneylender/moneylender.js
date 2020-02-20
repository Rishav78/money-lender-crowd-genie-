import React from 'react';
import  { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { fire } from '../../config/firebase';
import Container from '../container/container';
import Menuoption from '../menuoption/menuoption';
import Content from './content/content';


function moneylender(props) {

    const logout = _ => {
    
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
        <Link to="/moneylender/users" key={0}>
            <Menuoption 
                title="Users"
                active={props.location.pathname == '/moneylender/users'}
                Icon={AttachMoneyIcon}
            />
        </Link>,
        <Link to="/moneylender/loanrequests" key={1}>
            <Menuoption 
                title="Loan Requests"
                active={props.location.pathname == '/moneylender/loansrequests'}
                Icon={AccountBalanceIcon}
            />
        </Link>,
        <Link to="/moneylender/changepassword" key={2}>
            <Menuoption 
                title="Change Password"
                active={props.location.pathname == '/moneylender/changepassword'}
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
            location={props.location}
            history={props.history}
            sidebarOptions={sidebarOptions}>
            
            <Content />

        </Container>
    );
}

export default moneylender;