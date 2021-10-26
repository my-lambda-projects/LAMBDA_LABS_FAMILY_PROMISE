import React, { useEffect } from 'react';
import RenderHomePage from './RenderHomePage';
import {
  setCurrentUser,
  getFamily,
  getHousehold,
  getBeds,
  getLatestLog,
  getMembers,
} from '../../../state/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';
import StaffSig from '../IntakePacketContent/BySupervisor/ClientReleaseStaffSig';

function HomeContainer({ LoadingComponent }) {
  const dispatch = useDispatch();
  const LOGGED_IN = useSelector(state => state.LOGGED_IN);
  const LOADING = useSelector(state => state.LOADING);
  const lastLocation = useLastLocation();
  // eslint-disable-next-line

  useEffect(() => {
    if (!LOGGED_IN) {
      dispatch(setCurrentUser());
      dispatch(getFamily());
      dispatch(getHousehold());
      dispatch(getBeds());
      dispatch(getMembers());
      dispatch(getLatestLog());
    }
  }, [LOGGED_IN, dispatch]);

  if (LOADING) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  } else if (lastLocation && lastLocation.pathname === '/outtake') {
    return <StaffSig />;
  } else {
    return (
      <>
        <RenderHomePage />
      </>
    );
  }
}

export default HomeContainer;
