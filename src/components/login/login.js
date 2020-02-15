import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { fire } from '../../config/firebase';
import styles from './styles';

function Login(props) {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    function handleFormSubmit() {
        return async function(e) {
            e.preventDefault();
            try {
                await fire.auth().signInWithEmailAndPassword(email, password);
                const ref = fire.database().ref().child('user').orderByChild('email').equalTo(email);
                ref.on('value', userinformation => {
                    const [data] = Object.values(userinformation.val())
                    const { active, role } = data;
                    if ( !active ) {
                        return alert('This account is deactivated');
                    } else {
                        if ( role === 0 ) {
                            props.history.push('/admin/moneylenders')
                        } else if ( role == 1 ) {
                            props.history.push('/user/moneylenders')
                        } else {
                            props.history.push('/moneylender/users')
                        }
                    }
                });
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div style={ styles.loginform }>
            <form 
                style={ styles.form }
                onSubmit={handleFormSubmit()}>

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

export default Login;