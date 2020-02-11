import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Menuoption from './menuoption/menuoption';
import PersonIcon from '@material-ui/icons/Person';
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
        <div className="adminsidebar" style={{ height: '100%', width: showmore ? null : '60px', overflow: 'hidden', backgroundColor: '#333', color: 'white' }}>
            <Menuoption 
                title="Menu"
                onClick={() => onChangeShowmore(!showmore)}
                Icon={MenuIcon}
            />
            <Link to="/home/moneylender">
                <Menuoption 
                    title="Money Lenders"
                    active={props.location.pathname == '/home/moneylender'}
                    Icon={AttachMoneyIcon}
                />
            </Link>
            <Link to="/home/users">
                <Menuoption 
                    title="Users"
                    active={props.location.pathname == '/home/users'}
                    Icon={PersonIcon}
                />
            </Link>
            <Link to="/home/changepassword">
                <Menuoption 
                    title="Change Password"
                    active={props.location.pathname == '/home/changepassword'}
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