import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { fire } from '../../../../config/firebase';

const columns = [
    {
        name: 'Email',
        selector: 'moneylenderemail',
        sortable: true,
        center: true
    },
    {
        name: 'Name',
        selector: 'moneylendername',
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
        name: 'Accepted',
        cell: row => row.accepted ? "YES" : "NO",
        sortable: true,
        center: true
    },
    {
        name: 'Action',
        cell: row => (
            <div>
                { row.accepted ? <span>Pay</span> :

                    <HighlightOffIcon
                        className="delete-money-lender"
                        style={{
                            cursor: 'pointer'
                        }}
                    />
                }
            </div>
        ),
        center: true
    },
];

function Loans(props) {

    const [data, onChangeData] = useState([]);
    const [progress, onChangeProgress] = useState(true);
    
    useEffect( () => {
        const unsubscribe = fire.auth().onAuthStateChanged( async user => {
            const { email } = user;
            const ref = fire.database().ref().child('loans').orderByChild('email').equalTo(email);
            ref.on('value', loans => {
                console.log(loans.val())
                if( loans.val() ) {
                    const data = Object.values(loans.val());
                    onChangeData(data);
                }
                onChangeProgress(false);
            });

        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <DataTable 
                title="Loans"
                columns={columns}
                data={data}
                progressPending={progress} />
        </div>
    );
}

export default Loans;