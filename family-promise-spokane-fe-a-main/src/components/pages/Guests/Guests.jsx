import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { tableIcons } from '../../../utils/tableIcons';

import LoadingComponent from '../../common/LoadingComponent';
import MaterialTable from 'material-table';
import PeopleIcon from '@material-ui/icons/People';
import { Paper } from '@material-ui/core';

import styled from 'styled-components';
import './guest.css';

const TitleStyled = styled.div`
  h1 {
    margin-top: 2%;
    margin-left: 11%;
  }
`;

const Guests = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', type: 'date' },
      { title: 'Relationship', field: 'relationship' },
      { title: 'Reservation', field: '0.reservation_status' },
      { title: 'Checked In', field: '0.on_site_7pm' },
    ],
    data: [],
  });

  const history = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get('/members')
      .then(res => {
        let copy = { ...state };

        let formattedData = res.data.map(member => {
          return {
            ...member.demographics,
            ...member.bearers,
            ...member.schools,
            ...member.check_in,
            flag_level: 0,
            ...member,
          };
        });
        copy.data = formattedData;
        setState(copy);
      })
      .catch(err => {
        alert('error');
        console.error(err);
      })
      .finally(() => {
        if (loading) {
          setLoading(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <TitleStyled>
      <h1>Guests</h1>
      <div className="guest-table-container">
        <div className="guest-table">
          <MaterialTable
            components={{
              Container: props => <Paper {...props} elevation={0} />,
            }}
            options={{
              exportButton: true,
              rowStyle: rowData => ({
                backgroundColor:
                  rowData.flag_level === 2
                    ? 'rgba(255, 255, 0, 0.419)'
                    : rowData.flag_level === 3
                    ? 'rgba(255, 0, 0, 0.418)'
                    : 'white',
              }),
            }}
            icons={tableIcons}
            title=""
            columns={state.columns}
            data={state.data}
            elevation={0}
            actions={[
              {
                icon: PeopleIcon,
                tooltip: 'Guest Details',
                onClick: (event, rowData) => {
                  history.push(`/guests/${rowData.id}`);
                },
              },
            ]}
          />
        </div>
      </div>
    </TitleStyled>
  );
};

export default Guests;
