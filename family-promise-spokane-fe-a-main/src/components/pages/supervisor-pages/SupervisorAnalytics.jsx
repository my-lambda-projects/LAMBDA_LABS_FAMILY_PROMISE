import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// Components
import SupervisorGuestLogs from './SupervisorGuestLogs';
import DevSupervisorAnalytics from './DevSupervisorAnalytics';
// UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// Utils
import { getDailyReservationLogs } from '../../../state/actions/index';

const useStyles = makeStyles({
  bigContainer: {
    marginLeft: '100px',
    width: '90%',
    opacity: 0.87,
  },
  heading: {
    marginTop: '2rem',
  },
  hr: {
    border: '1px solid grey',
    opacity: '8%',
  },
  formControl: {
    minWidth: 150,
    height: 15,
  },
  container1: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '1rem',
    paddingBottom: '1rem',
  },
  monthlyContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '1rem',
    paddingBottom: '1rem',
  },
  monthly: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 0,
  },
  container2: {
    margin: '1rem 0',
    paddingBottom: '1rem',
  },
  root: {
    width: '32%',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
  },
  number: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
  },

  exitStats: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: 20,
    fontWeight: 'bold',
  },
  h2: {
    opacity: 0.67,
  },
});

const Analytics = () => {
  const [logs, setLogs] = useState([]);
  const [card, setCard] = useState(false);
  const [totalBedsReserved, setTotalBedsReserved] = useState(0);
  const [monthlyExit, setMonthlyExit] = useState({});
  const [monthlyIncome, setMonthlyIncome] = useState();
  const [monthlyStay, setMonthlyStay] = useState();
  const [guestsCheckedInCount, setGuestsCheckedInCount] = useState(0);
  const [rangeValue, setRangeValue] = useState(90);

  const classes = useStyles();

  const dispatch = useDispatch();

  const globalCount = useSelector(state => state.TOTAL_BEDS);
  const globalLogs = useSelector(state => state.RESERVATION_LOGS);

  useEffect(() => {
    dispatch(getDailyReservationLogs());
    //eslint-ignore-next-line
  }, [dispatch]);

  useEffect(() => {
    let filteredLogs = [];
    if (globalLogs !== []) {
      filteredLogs = globalLogs.filter(
        member =>
          member.reservation_status === true &&
          member.check_in[0].reservation_status === true
      );
    }
    setTotalBedsReserved(filteredLogs.length);
    setLogs(globalLogs);
    let guestCount = 0;
    filteredLogs.forEach(log => {
      // sets the number of guests checked in by checking check_in status of each member
      if (log.check_in) {
        if (log.check_in[0].on_site_10pm) {
          guestCount += 1;
        }
      }
    });
    setGuestsCheckedInCount(guestCount);
  }, [globalLogs]);

  const fetchLogs = e => {
    e.preventDefault();
    setCard(!card);
  };

  //----Call to DS API for Monthly Stats -----//

  const changeRange = e => {
    e.preventDefault();
    setRangeValue(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `http://fam-promise-ds-teamb.eba-sj7vxixq.us-east-1.elasticbeanstalk.com/exits/${rangeValue}`
      )
      .then(res => {
        console.log('***********MONTHLY EXITS************', res.data);
        setMonthlyExit(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(
        `http://fam-promise-ds-teamb.eba-sj7vxixq.us-east-1.elasticbeanstalk.com/average_stay/${rangeValue}`
      )
      .then(res => {
        console.log('***********MONTHLY STAY************', res.data);
        setMonthlyIncome(Math.round(res.data['Average Stay']));
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`https://b-ds.familypromisesofspokane.dev/income/${rangeValue}`)
      .then(res => {
        console.log('**********MONTHLY INCOME************', res.data);
        setMonthlyStay(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [rangeValue]);

  return (
    <>
      <Container className={classes.bigContainer}>
        <Container className={classes.heading}>
          <h1>Dashboard</h1>
        </Container>
        <Container>
          <hr className={classes.hr}></hr>
          <h2 className={classes.h2}>Daily Shelter Stats</h2>
        </Container>
        <Container className={classes.container1}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Beds Reserved
              </Typography>
              <Typography className={classes.number}>
                {totalBedsReserved}
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Guests Checked In
              </Typography>
              <Typography className={classes.number}>
                {guestsCheckedInCount}
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Beds Available
              </Typography>
              <Typography className={classes.number}>{globalCount}</Typography>
            </CardContent>
          </Card>
        </Container>
        <Container>
          <hr className={classes.hr}></hr>
          <Container className={classes.monthly}>
            <h2 className={classes.h2}>Monthly Stats</h2>
            <FormControl className={classes.formControl}>
              <Select
                value={rangeValue}
                onChange={changeRange}
                label="Range"
                displayEmpty
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={90}>90 days</MenuItem>
                <MenuItem value={365}>365 days</MenuItem>
              </Select>
            </FormControl>
          </Container>
        </Container>
        <Container className={classes.monthlyContainer}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.guestExit}>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Guests Exit To
              </Typography>
              <Typography className={classes.exitStats}>
                <div className="exitCategory">Permanent</div>
                <div className="exitNum">{monthlyExit['Permanent Exits']}</div>
              </Typography>
              <Typography className={classes.exitStats}>
                <div className="exitCategory">Temporary</div>
                <div className="exitNum">
                  {monthlyExit['Temporary Exits'] +
                    monthlyExit['Emergency Shelter']}
                </div>
              </Typography>
              <Typography className={classes.exitStats}>
                <div className="exitCategory">Transitional</div>
                <div className="exitNum">
                  {monthlyExit['Transitional Homes'] +
                    monthlyExit['Unknown/Other']}
                </div>
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Increased Family Income
              </Typography>
              <Typography className={classes.number}>
                {monthlyIncome}
              </Typography>
              <Typography>Families</Typography>
            </CardContent>
          </Card>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Guest Average Stay
              </Typography>
              <Typography className={classes.number}>{monthlyStay}</Typography>
              <Typography>Days</Typography>
            </CardContent>
          </Card>
        </Container>
        <Container>
          <hr className={classes.hr}></hr>
          <h2 className={classes.h2}>Daily Guest Logs</h2>
        </Container>
        <Container className={classes.container2}>
          <SupervisorGuestLogs
            setGuestsCheckedInCount={setGuestsCheckedInCount}
            guestsCheckedInCount={guestsCheckedInCount}
          />
        </Container>
        {/* Used for development purposes, this will display all global logs from the redux store*/}
        <DevSupervisorAnalytics fetchLogs={fetchLogs} card={card} logs={logs} />
      </Container>
    </>
  );
};

export default Analytics;
