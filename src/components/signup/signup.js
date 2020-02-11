import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { fire } from '../../config/firebase';
import styles from './styles';

function validation(email, password, confirmpassword) {
    if(!email || !password || !confirmpassword) {
        return false;
    }
    if(password !== confirmpassword) {
        return false;
    }
    return true;
}

function savedata(data) {
    fire.auth().onAuthStateChanged( async user => {
        if (user) {
            const { uid } = user;
            await fire.database().ref().child('user').child(uid).set(data);
        }
    })
}

function Signup(props) {
    const [email, onChangeEmail] = useState('');
    const [firstname, onChangeFirstname] = useState('');
    const [lastname, onChangeLastname] = useState('');
    const [role, onChangeRole] = useState(0);
    const [money, onChangeMoney] = useState(0);
    const [password, onChangePassword] = useState('');
    const [confirmpassword, onChangeConfirmpassword] = useState('');

    function handleFormSubmit() {
        return async function(e) {
            e.preventDefault();
            if( !validation(email, password, confirmpassword) ) {
                return;
            }
            try {
                await fire.auth().createUserWithEmailAndPassword(email, password);
                const data = { email, firstname, lastname, role, active: true };
                if(role === 1) data.money = money;
                savedata(data);
                props.history.push('/home');
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
                    label="Firstname" 
                    variant="outlined" 
                    required
                    onChange={(e) => onChangeFirstname(e.target.value)}/>

                <TextField 
                    fullWidth
                    required
                    style={ styles.textfield }
                    label="Lastname" 
                    variant="outlined" 
                    onChange={(e) => onChangeLastname(e.target.value)}/>

                <TextField 
                    fullWidth
                    required
                    style={ styles.textfield }
                    label="Email Id" 
                    variant="outlined" 
                    onChange={(e) => onChangeEmail(e.target.value)}/>
                
                <TextField 
                    fullWidth
                    required
                    style={ styles.textfield } 
                    label="Password" 
                    type="password"
                    variant="outlined" 
                    onChange={(e) => onChangePassword(e.target.value)}/>
                
                <TextField 
                    fullWidth
                    required
                    style={ styles.textfield } 
                    label="Confirm Password" 
                    type="password"
                    variant="outlined" 
                    onChange={(e) => onChangeConfirmpassword(e.target.value)}/>
                
                <FormControl required fullWidth>
                    <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
                    <Select
                        value={role}
                        fullWidth
                        onChange={(e) => onChangeRole(e.target.value)}
                        id="demo-simple-select-required">

                        <MenuItem value="" disabled>
                            None
                        </MenuItem>
                        <MenuItem value={0}>User</MenuItem>
                        <MenuItem value={1}>Lender</MenuItem>

                    </Select>
                </FormControl>
                { role === 1 && 
                <TextField 
                    fullWidth
                    required
                    value={money}
                    style={ styles.textfield } 
                    label="Money" 
                    type="number"
                    variant="outlined" 
                    onChange={(e) => onChangeMoney(e.target.value)}/>
                }
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