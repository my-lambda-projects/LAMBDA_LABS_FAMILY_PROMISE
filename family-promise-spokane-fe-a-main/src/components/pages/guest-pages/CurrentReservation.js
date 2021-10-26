import React from 'react';
import { Typography } from 'antd';
import { Button } from '@material-ui/core';

import '../../../styles/app.scss';

const CurrentReservation = ({ membersStaying, cancelButton, beds }) => {
  const { Text } = Typography;
  return (
    <div className="container">
      <h3>Your Current Reservation</h3>

      <Text strong>
        You currently have <span className="number-of-beds">{beds}</span> beds
        reserved for{' '}
        {membersStaying.length === 2
          ? membersStaying.join(' and ')
          : membersStaying.join(', ')}
        .
      </Text>
      <Text strong>
        If you would like to cancel, please click the cancel button below.
      </Text>

      <br />
      <div className="btn-container">
        <Button
          variant="contained"
          color="secondary"
          size={'large'}
          onClick={cancelButton}
        >
          Cancel Reservation
        </Button>
      </div>
    </div>
    //THERE IS A BUG: if the user has a current reservation, the page will refresh and not keep the user's current total beds reserved. The back end will still have the same data, but it refreshes here. Need to rout everything with redux.
  );
};

export default CurrentReservation;
