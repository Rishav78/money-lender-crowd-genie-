import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import { fire } from '../../../../config/firebase';

const columns = [
    {
        name: 'Email',
        selector: 'email',
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
                    className="actionbutton delete delete-request"
                    style={{
                        cursor: 'pointer'
                    }}
                />
                <CheckIcon
                    className="actionbutton accept accept-request"
                    style={{
                        cursor: 'pointer'
                    }}
                />
            </div>
        ),
        center: true
    },
];

function LoanRequests(props) {
    const [data, onChangeData] = useState([]);
    const [progress,onChangeProgress] = useState(true);

    const getLoans = loans => {
        if ( !loans.val() ) {
            onChangeProgress(false);
            return;
        } 
        const data = Object.values(loans.val());
        onChangeData(data);
        onChangeProgress(false);
    }

    useEffect( () => {

        const user = fire.auth().currentUser;
        const { email } = user;
        console.log(`${email}_false`)
        const ref = fire.database().ref().child('loans').orderByChild('mle_accepted').equalTo(`${email}_false`);
        ref.on('value', getLoans);

        return () => ref.off('value', getLoans);

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

export default LoanRequests;