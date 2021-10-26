// Used for development purposes, this will display all global logs from the redux store
import React from 'react';

import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '32%',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
  },
});

const DevSupervisorAnalytics = ({ fetchLogs, card, logs }) => {
  const classes = useStyles();

  return (
    <Container>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            Logs
          </Typography>
          <Button
            onClick={e => {
              fetchLogs(e);
            }}
          >
            Fetch Logs
          </Button>
          {card
            ? logs.map(log => (
                <Card key={log.id}>
                  <CardContent>
                    <p> Checked in: {log.checked_in ? 'Yes' : 'No'}</p>
                    <p>Date: {log.date}</p>
                    <p>Family Id: {log.family_id}</p>
                    <p> On-Site: {log.on_sight ? 'Yes' : 'No'}</p>
                    <p>Supervisor Id: {log.supervisor_id}</p>
                    <p> Time: {log.time}</p>
                    <p>Beds Reserved: {log.beds_reserved}</p>
                    <p>
                      Reservation Status:{' '}
                      {log.reservation_status ? 'Yes' : 'No'}
                    </p>
                  </CardContent>
                </Card>
              ))
            : ''}
        </CardContent>
      </Card>
    </Container>
  );
};

export default DevSupervisorAnalytics;
