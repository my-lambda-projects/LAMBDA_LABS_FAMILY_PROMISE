// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Import action TYPES at the top of the file

import { axiosWithAuth } from '../../api/axiosWithAuth';

export const setCurrentUser = () => async dispatch => {
  dispatch({ type: 'LOG_IN' });
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    let currentUser = await axiosWithAuth()
      .get('/users/me')
      .then(res => res.data.user);
    dispatch({ type: 'SET_CURRENT_USER', payload: currentUser });
  } catch (error) {
    alert('error');
    console.log(error);
    console.log(error?.response);
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

export const getFamily = () => async dispatch => {
  dispatch({ type: 'GET_FAMILY_FETCHING' });
  const currentUser = await axiosWithAuth().get('/users/me');
  if (currentUser.data.user.role === 'guest') {
    try {
      let myFamily = await axiosWithAuth().get(
        `families/user/${currentUser.data.user.id}`
      );
      dispatch({ type: 'GET_FAMILY_SUCCESS', payload: myFamily.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'GET_FAMILY_FAILURE', payload: error.message });
    }
  }
};

export const getHousehold = () => async dispatch => {
  dispatch({ type: 'GET_HOUSEHOLD_FETCHING' });
  const currentUser = await axiosWithAuth().get('/users/me');
  if (currentUser.data.user.role === 'guest') {
    try {
      let myFamily = await axiosWithAuth().get(
        `families/user/${currentUser.data.user.id}`
      );
      let household = await axiosWithAuth().get(
        `families/${myFamily.data.id}/household`
      );
      dispatch({ type: 'GET_HOUSEHOLD_SUCCESS', payload: household.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'GET_HOUSEHOLD_FAILURE', payload: error.message });
    }
  }
};

export const getMembers = () => async dispatch => {
  dispatch({ type: 'GET_MEMBERS_FETCHING' });
  const currentUser = await axiosWithAuth().get('/users/me');
  if (currentUser.data.user.role === 'guest') {
    try {
      let myFamily = await axiosWithAuth().get(
        `families/user/${currentUser.data.user.id}`
      );
      let members = await axiosWithAuth().get(
        `families/${myFamily.data.id}/members`
      );
      dispatch({ type: 'GET_MEMBERS_SUCCESS', payload: members.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'GET_MEMBERS_FAILURE', payload: error.message });
    }
  }
};

export const getSpecificMember = id => async dispatch => {
  dispatch({ type: 'GET_SPEC_MEMBER_FETCHING' });
  const currentUser = await axiosWithAuth().get('/users/me');
  if (currentUser.data.user.role !== 'guest') {
    try {
      let specificMember = await axiosWithAuth().get(`/members/${id}`);
      console.log('actions 87', specificMember);
      dispatch({
        type: 'GET_SPEC_MEMBER_SUCCESS',
        payload: specificMember.data,
      });
    } catch (error) {
      console.log('actions 93', error);
      dispatch({ type: 'GET_SPEC_MEMBER_FAILURE', payload: error.message });
    }
  }
};

export const getBeds = () => async dispatch => {
  dispatch({ type: 'TOTAL_BEDS_FETCHING' });
  try {
    const beds = await axiosWithAuth().get('/beds');
    dispatch({ type: 'TOTAL_BEDS_SUCCESS', payload: beds.data[0].total_beds });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'TOTAL_BEDS_FAILURE', payload: error.message });
  }
};

export const updateBedCount = count => async dispatch => {
  dispatch({ type: 'BEDS_UPDATE_LOADING' });
  try {
    axiosWithAuth().put('/beds', { id: 1, total_beds: count });

    dispatch({ type: 'BEDS_UPDATE_SUCCESS', payload: count });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'BEDS_UPDATE_FAILURE', payload: error.message });
  }
};

export const getLatestLog = () => async dispatch => {
  dispatch({ type: 'LATEST_LOG_FETCHING' });
  const currentUser = await axiosWithAuth().get('/users/me');
  if (currentUser.data.user.role === 'guest') {
    try {
      let myFamily = await axiosWithAuth().get(
        `families/user/${currentUser.data.user.id}`
      );
      const logs = await axiosWithAuth().get(
        `/logs/family/${myFamily.data.id}`
      );
      let log = {};
      if (logs.data !== []) {
        log = logs.data[logs.data.length - 1];
      }

      dispatch({ type: 'LATEST_LOG_SUCCESS', payload: log });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LATEST_LOG_FAILURE', payload: error.message });
    }
  }
};

export const getDailyReservationLogs = () => dispatch => {
  dispatch({ type: 'LOGS_DAILY_LOADING' });
  axiosWithAuth()
    .get('/logs/memberLogs')
    .then(res => {
      dispatch({ type: 'LOGS_DAILY_SUCCESS', payload: res.data });
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: 'LOGS_DAILY_FAILURE', payload: error.message });
    });
};
//DOCUSIGN
export const getDocuSignUrl = redirect => dispatch => {
  console.log('*******DOCUSIGN ACTION********', redirect);
  dispatch({ type: 'DOCUSIGN_REDIRECT', payload: redirect });
};
export const getSignerInfo = sigInfo => dispatch => {
  dispatch({ type: 'SIGNER_INFO', payload: sigInfo });
};
