import React, { useEffect, useState } from 'react';
import OffHours from './OffHours';
import CurrentReservation from './CurrentReservation';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { getLatestLog, updateBedCount } from '../../../state/actions/index';
// UI
import { Divider, Typography } from 'antd';
import { Checkbox, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../../../styles/app.scss';
//redux
import actions from '../../../state/actions/families';
import { connect } from 'react-redux';
// state
import { useSelector, useDispatch } from 'react-redux';

const GuestDashboard = ({ fetchHousehold, fetchFamily, fetchMembers }) => {
  const dispatch = useDispatch();
  // The current user
  const user = useSelector(state => state.CURRENT_USER);
  const log = useSelector(state => state.LATEST_LOG);
  const globalCount = useSelector(state => state.TOTAL_BEDS);
  const fam = useSelector(state => state.FAMILY);
  const household = useSelector(state => state.HOUSEHOLD);
  //UserState
  const [users, setUsers] = useState([]);
  //Mock beds counter
  const [count, setCount] = useState();
  const [alert, setAlert] = useState();

  const date = new Date();
  const fullDate = date.toDateString();

  useEffect(() => {
    dispatch(getLatestLog());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (log.date === fullDate && log.reservation_status === true) {
      setIsReserved(true);
      setResID(log.reservation_id);
    }
    // eslint-disable-next-line
  }, []);

  const { Text } = Typography;

  // For Members Staying
  const [membersStaying, setMembersStaying] = useState([]);

  // For Waitlist
  const [waitList, setWaitList] = useState([]);

  //logs user state of reservation status
  const [isReserved, setIsReserved] = useState(false);
  const [familyMemberIDs, setFamilyMemberIDs] = useState([]);
  // eslint-disable-next-line
  const [localBedCount, setLocalBedCount] = useState(0);

  //************THIS COULD BE A FUNCTION BECAUSE IT IS BEING USED TWICE:******************
  // This will target the checked members and add or take them away from the holding array or state of the membersStaying list. It will also update the state of the count for total beds.
  const familyStaying = e => {
    if (e.target.checked === true) {
      if (count > 0) {
        setCount(count - 1);
      }

      if (membersStaying.indexOf(e.target.value) === -1)
        setMembersStaying([...membersStaying, e.target.value]);
    } else if (e.target.checked === false) {
      setCount(count + 1);
      //taking member out if canceling
      let temp = membersStaying;
      temp = temp.filter(item => item !== e.target.value);
      setMembersStaying(temp);
    }
  };

  // This will target the checked members and add or take them away from the holding array or state of the waitlist.
  const waitListMembers = e => {
    if (e.target.checked === true) {
      if (waitList.indexOf(e.target.value) === -1);
      setWaitList([...waitList, e.target.value]);
      console.log('waitlist', waitList);
    } else if (e.target.checked === false) {
      let temp = waitList;
      temp = temp.filter(item => item !== e.target.value);
      setWaitList(temp);
    }
  };

  //This function is pulling in data from 2 apis. The second api (/families/:id/members) is getting the family information which is holding the state of the users.
  const fetchFamilyInformation = async () => {
    try {
      const res = await axiosWithAuth().get(`/users/${user.id}/family`);

      const family = res.data.family;

      axiosWithAuth()
        .get(`/families/${family.id}/members`)
        .then(res => {
          setUsers(res.data);
          axiosWithAuth()
            .get(`logs/${res.data[0].family_id}`)
            // .then(res => console.log(res.data[0].reservation_status))
            .catch(err => console.log(err));
        })
        .catch(err => console.log('get family error'));
    } catch (error) {
      console.log(error);
    }
  };

  //Warning shows for this but it is needed in order to render the checkboxes *******************
  useEffect(() => {
    fetchFamilyInformation()
      // .then(res => console.log(res))
      .catch(err => console.log('ERROR IN GLOBAL COUNT USE EFFECT', err));
    //eslint-disable-next-line
  }, []);

  //Reserve button - Will post to the logs endpoint with the membersStaying , will set isReserved to true, will return the reservation ID for put requeset, Confirm that the user has made a reservation.
  const reserveButton = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('/logs', {
        supervisor_id: '00u2lh0bsAliwLEe75d6',
        family_id: fam.id,
        reservation_status: true,
        waitlist: false,
        on_site_7pm: false,
        on_site_10pm: false,
        date: fullDate,
        time: `${hours}:${minutes}`,
        beds_reserved: membersStaying.length,
        actual_beds_reserved: membersStaying.length,
        members_staying: membersStaying,
      })
      .then(res => {
        const resId = res.data.logs.reservation_id;
        setResID(resId);
        setIsReserved(res.data.logs.reservation_status);
      })
      .catch(err => {
        console.log('Nope', err);
      });

    const checkIn = {
      check_in: [
        {
          waitlist: false,
          on_site_7pm: false,
          on_site_10pm: false,
          reservation_id: resID,
          reservation_status: true,
        },
      ],
    };
    let memberIDs = [];

    membersStaying.forEach(membername => {
      let fname = membername.split(' ')[0];
      household.forEach(hmember => {
        if (fname === hmember.demographics.first_name) {
          memberIDs.push(hmember.id);
        }
      });
    });

    setFamilyMemberIDs(memberIDs);

    for (let i = 0; i < memberIDs.length; i++) {
      axiosWithAuth()
        .put(`/members/${memberIDs[i]}`, checkIn)
        .then(res =>
          console.log(
            `Updated family id ${familyMemberIDs[i]} check in status`,
            res
          )
        )
        .catch(err => console.log(err));
    }
    dispatch(updateBedCount(globalCount - membersStaying.length));
    dispatch(getLatestLog()); //We want to get log by res id ***********
  };

  // the cancel button
  const [resID, setResID] = useState(0); // This is set in the post request to retrieve the reservation ID which is needed in order to edit the reservation.

  const cancelButton = (e, resId) => {
    console.log('before put inside cancel function', resID);
    e.preventDefault();

    dispatch(updateBedCount(globalCount + log.actual_beds_reserved));

    membersStaying.length = 0;

    // setCount(count); //This might be causing a weird bug?????

    axiosWithAuth()
      .put(`/logs/${resID}`, {
        supervisor_id: '00u2lh0bsAliwLEe75d6',
        family_id: fam.id,
        reservation_status: false,
        waitlist: false,
        on_site_7pm: true,
        on_site_10pm: false,
        date: fullDate,
        time: `${hours}:${minutes}`,
        beds_reserved: 0,
        actual_beds_reserved: 0,
        members_staying: membersStaying,
      })
      .then(res => {
        setIsReserved(res.data.logs.reservation_status);
        setAlert('You have canceled your reservation.');
      })
      .catch(err => {
        console.log('Nope', err);
      });

    const checkIn = {
      check_in: [
        {
          waitlist: false,
          on_site_7pm: false,
          on_site_10pm: false,
          reservation_id: resID,
          reservation_status: false,
        },
      ],
    };
    for (let i = 0; i < household.length; i++) {
      console.log(household[i].id);
      axiosWithAuth()
        .put(`/members/${household[i].id}`, checkIn)
        .then(res =>
          console.log(
            `Updated family id ${household[i].id} check in status`,
            res
          )
        )
        .catch(err => console.log(err));
    }

    dispatch(getLatestLog());

    /*
    1. This button will change the membersStaying array length to 0
    2. Number of beds will be updated
    3. Message will pop ups stating: You have canceled your reservation, if you want to reserve, please refresh this page and make another reservation.
    */
  };

  //For Date and time

  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const hours = new Date().getHours();
  const getMinutes = new Date().getMinutes();
  const minutes = (getMinutes < 10 ? '0' : '') + getMinutes;
  // const getTime = fullDate + hours + '-' + minutes;
  // This seconds will not be seen, but this will allow the clock to rerender accordingly.
  //eslint-disable-next-line
  const [seconds, setSeconds] = useState();
  let sec = new Date().getSeconds();
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(sec);
    }, 1000);
    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, []);

  //-----------------------------------------------------------------
  // --------------------------START OF RENDER-----------------------
  //-----------------------------------------------------------------
  return 7 < hours < 21 ? (
    <div className="guest-container">
      <div className="checkin-area">
        <h1>Family Check In</h1>
        <h2>{globalCount} Beds Available</h2>
        <h2>{`${days[date.getDay()]} - ${date.toLocaleString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`}</h2>
        <div className="semiwidth">
          <Divider />
        </div>

        {/* When the user logs back in or when the user makes a reservation, they will need to have their session stored locally so they can see that they have already made a reservation and can cancel. */}

        {isReserved && (
          <CurrentReservation
            membersStaying={log.members_staying}
            cancelButton={cancelButton}
            beds={log.beds_reserved}
          />
        )}

        {count === 0 && isReserved === false ? (
          //WAITLIST ________________________________
          <>
            <p>To join the waitlist, please click below</p>
            {users.map(member => {
              return (
                <div className="members">
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={`${member.demographics.first_name} ${member.demographics.last_name}`}
                        onChange={waitListMembers}
                        color="primary"
                      >
                        {member.demographics.first_name}{' '}
                        {member.demographics.last_name}
                      </Checkbox>
                    }
                    label={`${member.demographics.first_name} ${member.demographics.last_name}`}
                  />
                </div>
              );
            })}
            <Button shape="round" className="reservation-button">
              Reserve Beds
            </Button>
            <p>
              Message: Please be sure to arrive at the shelter by 7pm. The
              supervisor will announce if there are any more beds available
            </p>
          </>
        ) : (
          //MEMBERS STAYING ___________________________
          <div className={isReserved === true ? 'isReserved' : ''}>
            <Text strong>
              Select which family members you would like to check in:
            </Text>
            <div className="membersContainer">
              {users.map((member, idx) => {
                return (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        value={`${member.demographics.first_name} ${member.demographics.last_name}`}
                        onChange={familyStaying}
                        color="primary"
                        size="medium"
                      >
                        {member.demographics.first_name}{' '}
                        {member.demographics.last_name}
                      </Checkbox>
                    }
                    label={`${member.demographics.first_name} ${member.demographics.last_name}`}
                  />
                );
              })}
            </div>
            <Text strong>
              {' '}
              {membersStaying.length !== 0
                ? `After you select family members, click the button below.`
                : 'Remember to select family members to reserve.'}
            </Text>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              size={'large'}
              onClick={reserveButton}
            >
              {membersStaying.length === 0
                ? `Check in`
                : `Reserve ${membersStaying.length} Beds + Check In`}
            </Button>
          </div>
        )}
        <br />
        {alert && <Alert>{alert}</Alert>}
      </div>
    </div>
  ) : (
    <OffHours />
  );
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  fetchHousehold: actions.fetchHousehold,
  fetchFamily: actions.fetchFamily,
  fetchBeds: actions.fetchBeds,
  fetchMembers: actions.fetchMembers,
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestDashboard);
