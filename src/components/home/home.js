import React from 'react';
import { fire } from '../../config/firebase';


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

function Home(props) {
    return (
        <div>
            <button onClick={logout(props)}>logout</button>
        </div>
    );
}

export default Home;