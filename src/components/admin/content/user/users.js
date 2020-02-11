import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './style.css';
import { fire } from '../../../../config/firebase';

const columns = [
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
        center: true
    },
    {
        name: 'First Name',
        selector: 'firstname',
        sortable: true,
        center: true
    },
    {
        name: 'Last Name',
        selector: 'lastname',
        sortable: true,
        center: true
    },
    {
        name: 'Action',
        cell: row => (
            <div>
                <HighlightOffIcon
                    className="delete-money-lender"
                    style={{
                        cursor: 'pointer'
                    }}
                />
            </div>
        ),
        center: true
    },
];

function Users(props) {

    const [data, onChangeData] = useState([]);
    const [progress,onChangeProgress] = useState(true);

    useEffect( () => {
        fire.database().ref().child('user').orderByChild('role').equalTo(0).on('value', users => {
            const usersobject = users.val();
            if (usersobject) {
                const values = Object.values(usersobject);
                const userdata = values.map( (user, i) => {
                    user.id = i;
                    return user;
                });
                onChangeData(userdata);
                onChangeProgress(false);
            }
        })
    }, []);

    return (
        <div>
            <DataTable 
                title="Users"
                columns={columns}
                data={data}
                progressPending={progress}
            />
        </div>
    );
}

export default Users;