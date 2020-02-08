import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fire } from '../../config/firebase';
import styles from './styles';

function validation(email, password, confirmpassword) {
    if(password !== confirmpassword) {
        return false;
    }
    return true;
}

function handleFormSubmit(firstname, lastname, email, password, confirmpassword) {
    return async function(e) {
        e.preventDefault();
        if( !validation(email, password, confirmpassword) ) {

            return;
        }
        try {
            const res = await fire.auth().createUserWithEmailAndPassword(email, password);
        } catch (err) {
            console.log(err)
        }
    }
}

function Signup(props) {
    const [email, onChangeEmail] = useState('');
    const [firstname, onChangeFirstname] = useState('');
    const [lastname, onChangeLastname] = useState('');
    const [password, onChangePassword] = useState('');
    const [confirmpassword, onChangeConfirmpassword] = useState('');

    return (
        <div style={ styles.loginform }>
            <form 
                style={ styles.form }
                onSubmit={handleFormSubmit(firstname, lastname, email, password, confirmpassword)}>

                <TextField 
                    fullWidth
                    style={ styles.textfield }
                    label="Firstname" 
                    variant="outlined" 
                    onChange={(e) => onChangeFirstname(e.target.value)}/>

                <TextField 
                    fullWidth
                    style={ styles.textfield }
                    label="Lastname" 
                    variant="outlined" 
                    onChange={(e) => onChangeLastname(e.target.value)}/>

                <TextField 
                    fullWidth
                    style={ styles.textfield }
                    label="Email Id" 
                    variant="outlined" 
                    onChange={(e) => onChangeEmail(e.target.value)}/>
                
                <TextField 
                    fullWidth
                    style={ styles.textfield } 
                    label="Password" 
                    type="password"
                    variant="outlined" 
                    onChange={(e) => onChangePassword(e.target.value)}/>
                
                <TextField 
                    fullWidth
                    style={ styles.textfield } 
                    label="Confirm Password" 
                    type="password"
                    variant="outlined" 
                    onChange={(e) => onChangeConfirmpassword(e.target.value)}/>
                
                <button 
                    type="submit"
                    style={ styles.submitButton }>
                    Sign in
                </button>
            </form>
        </div>
    );
}

export default Signup;