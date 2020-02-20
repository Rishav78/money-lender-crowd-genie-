import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import style from './style';
import { fire } from '../../config/firebase';

function validation(newpassword, confirmpassword) {
    if (newpassword !== confirmpassword) {
        return false;
    }
    return true;
}

function ChangePassword(props) {
    
    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [confirmnewpassword, setConfirmnewpassword] = useState('');
    
    const changePassword = _ => {
        return async function(e) {
            e.preventDefault();
            const currentuser = fire.auth().currentUser;
            const { email } = currentuser;
            try{
                await fire.auth().signInWithEmailAndPassword(email, oldpassword);
                if(!validation(newpassword, confirmnewpassword)) {
                    throw Error('new password and confirm password does not match');
                }
                await currentuser.updatePassword(newpassword);
                alert('Password updated successfuly');
            }
            catch (err) {
                alert(err.message);
            }
        }
    }

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
                        variant="outlined"
                        onChange={ e => setOldpassword(e.target.value) } />
                </div>
                <div style={{boxSizing: 'border-box', padding: '10px 8px' }}>
                    <TextField
                        fullWidth
                        label="New Password" 
                        variant="outlined"
                        onChange={ e => setNewpassword(e.target.value) } />
                </div>
                <div style={{boxSizing: 'border-box', padding: '10px 8px' }}>
                    <TextField
                        fullWidth 
                        label="Confirm Password" 
                        variant="outlined"
                        onChange={ e => setConfirmnewpassword(e.target.value) } />
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