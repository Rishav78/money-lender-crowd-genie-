import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Menuoption from './menuoption/menuoption';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './style.css';
import { fire } from '../../../config/firebase';
import { Link } from 'react-router-dom';

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

function Sidebar(props) {

    const [showmore, onChangeShowmore] = useState(false);
    return (
        <div className="usersidebar" style={{ height: '100%', width: showmore ? null : '60px', overflow: 'hidden', backgroundColor: '#333', color: 'white' }}>
            <Menuoption 
                title="Menu"
                onClick={() => onChangeShowmore(!showmore)}
                Icon={MenuIcon}
            />
            <Link to="/user/moneylenders">
                <Menuoption 
                    title="Money Lenders"
                    active={props.location.pathname == '/user/moneylenders'}
                    Icon={AttachMoneyIcon}
                />
            </Link>
            <Link to="/user/loans">
                <Menuoption 
                    title="Loans"
                    active={props.location.pathname == '/user/loans'}
                    Icon={AccountBalanceIcon}
                />
            </Link>
            <Link to="/user/changepassword">
                <Menuoption 
                    title="Change Password"
                    active={props.location.pathname == '/user/changepassword'}
                    Icon={LockIcon}
                />
            </Link>
            <Menuoption 
                title="Logout"
                onClick={logout(props)}
                Icon={ExitToAppIcon}
            />
        </div>
    );
}

export default Sidebar;