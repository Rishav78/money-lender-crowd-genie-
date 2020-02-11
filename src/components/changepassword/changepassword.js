import React from 'react';
import TextField from '@material-ui/core/TextField';
import style from './style';

function validation(oldpassword, newpassword, confirmpassword) {
    if (newpassword !== confirmpassword) {
        return false;
    }
    return true;
}

function changePassword(props, oldpassword, newpassword, confirmpassword) {
    return function(e) {
        e.preventDefault();
        if(!validation(oldpassword, newpassword, confirmpassword)) {
            return alert('some error occured');
        }
    }
}

function ChangePassword(props) {
    return (
        <div style={{ width: '400px', margin: '50px auto'}}>
            <div style={{ textAlign: 'center', boxSizing: 'border-box', padding: '10px 8px' }}>
                <h1 style={{ margin: 0, padding: 0, color: '#333'}}>Change Password</h1>
            </div>
            <form onSubmit={changePassword()}>
                <div style={{boxSizing: 'border-box', padding: '10px 8px' }}>
                    <TextField
                        fullWidth
                        label="Old Password" 
                        variant="outlined" />
                </div>
                <div style={{boxSizing: 'border-box', padding: '10px 8px' }}>
                    <TextField
                        fullWidth
                        label="New Password" 
                        variant="outlined" />
                </div>
                <div style={{boxSizing: 'border-box', padding: '10px 8px' }}>
                    <TextField
                        fullWidth 
                        label="Confirm Password" 
                        variant="outlined" />
                </div>
                <div>
                    <button
                        style={style.submitButton}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;