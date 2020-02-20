import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './style.css';
import { fire } from '../../../../config/firebase';

function requestLoan(moneylender) {
    const money = parseInt(prompt('Enter Amount: '));
    const user = fire.auth().currentUser;
    const { email } = user;
    const { email:moneylenderemail, firstname:moneylendername } = moneylender;
    const ref = fire.database().ref().child('loans');
    ref.push({ money, email, moneylenderemail, moneylendername, accepted: false });
}

const columns = [
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
        center: true
    },
    {
        name: 'Name',
        selector: 'firstname',
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
        cell: row => (
            <div onClick={() => requestLoan(row)}>
                <span>Request money</span>
            </div>
        ),
        center: true
    },
];

function Moneylender(props) {

    const [data, onChangeData] = useState([]);
    const [progress,onChangeProgress] = useState(true);

    function getAllMoneylenders(lenders) {
        const leadersobject = lenders.val();
        if (leadersobject) {
            const values = Object.values(leadersobject);
            const lendersdata = values.map( (lender, i) => {
                lender.id = i;
                return lender;
            });
            onChangeData(lendersdata);
        }
        onChangeProgress(false);
    }

    useEffect( () => {
        const ref = fire.database().ref().child('user').orderByChild('role').equalTo(2);
        ref.on('value', getAllMoneylenders);

        return () => ref.off('value', getAllMoneylenders);

    }, []);

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

export default Moneylender;