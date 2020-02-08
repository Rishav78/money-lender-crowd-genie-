import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fire } from '../../config/firebase';
import styles from './styles';

function handleFormSubmit(email, password) {
    return async function(e) {
        e.preventDefault();
        try {
            const res = await fire.auth().signInWithEmailAndPassword(email, password);
        } catch (err) {
            console.log(err)
        }
    }
}

function Login(props) {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    return (
        <div style={ styles.loginform }>
            <form 
                style={ styles.form }
                onSubmit={handleFormSubmit(email, password)}>

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
                
                <button 
                    type="submit"
                    style={ styles.submitButton }>
                    Sign in
                </button>
            </form>
        </div>
    );
}

export default Login