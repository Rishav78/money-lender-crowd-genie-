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
        name: 'Money (Ruppes)',
        selector: 'money',
        sortable: true,
        center: true
    },
    {
        name: 'Action',
        cell: _ => (
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
        fire.database().ref().child('user').orderByChild('role').equalTo(1).on('value', lenders => {
            const leadersobject = lenders.val();
            console.log(leadersobject)
            if (leadersobject) {
                const values = Object.values(leadersobject);
                const lendersdata = values.map( (lender, i) => {
                    lender.id = i;
                    return lender;
                });
                onChangeData(lendersdata);
                onChangeProgress(false);
            }
        })
    }, []);

    console.log('2345678ijbvcdr67')

    return (
        <div>
            <DataTable 
                title="Money Lenders"
                columns={columns}
                data={data}
                progressPending={progress}
            />
        </div>
    );
}

export default Users;