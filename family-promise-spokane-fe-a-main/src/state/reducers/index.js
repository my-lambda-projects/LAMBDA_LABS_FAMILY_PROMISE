// since this reducer is still relatively short we kept it in one file
// once it starts to get longer it can be broken down into more files

import {
  LOG_IN,
  SET_LOADING,
  SET_CURRENT_USER,
  GET_FAMILY_FETCHING,
  GET_FAMILY_SUCCESS,
  GET_FAMILY_FAILURE,
  GET_HOUSEHOLD_FETCHING,
  GET_HOUSEHOLD_FAILURE,
  GET_HOUSEHOLD_SUCCESS,
  GET_MEMBERS_FETCHING,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_FAILURE,
  TOTAL_BEDS_FAILURE,
  TOTAL_BEDS_FETCHING,
  TOTAL_BEDS_SUCCESS,
  LATEST_LOG_FETCHING,
  LATEST_LOG_SUCCESS,
  LATEST_LOG_FAILURE,
  BEDS_UPDATE_LOADING,
  BEDS_UPDATE_SUCCESS,
  BEDS_UPDATE_FAILURE,
  LOGS_DAILY_LOADING,
  LOGS_DAILY_SUCCESS,
  LOGS_DAILY_FAILURE,
  DOCUSIGN_REDIRECT,
  SIGNER_INFO,
  GET_SPEC_MEMBER_FETCHING,
  GET_SPEC_MEMBER_SUCCESS,
  GET_SPEC_MEMBER_FAILURE,
  // Total beds at shelter
} from '../types';

const INITIAL_STATE = {
  CURRENT_USER: {},
  FAMILY: {},
  MEMBER: {},
  HOUSEHOLD: {},
  LOGGED_IN: false,
  LOADING: false,
  ERROR: '',
  TOTAL_BEDS: 90,
  LATEST_LOG: {},
  RESERVATION_LOGS: [],
  DOCUSIGN_URL: '',
  SIGNER_INFORMATION: {},
  SPECIFIC_MEMBER: {},
};

export const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, CURRENT_USER: action.payload };
    case LOG_IN:
      return { ...state, LOGGED_IN: true };
    case 'LOG_OUT':
      return { ...state, LOGGED_IN: false };
    case SET_LOADING:
      return { ...state, LOADING: action.payload };
    case GET_FAMILY_FETCHING:
      return { ...state, LOADING: true };
    case GET_FAMILY_FAILURE:
      return { ...state, LOADING: false, ERROR: action.payload };
    case GET_FAMILY_SUCCESS:
      return { ...state, LOADING: false, FAMILY: action.payload };
    case GET_HOUSEHOLD_FETCHING:
      return { ...state, LOADING: true };
    case GET_HOUSEHOLD_FAILURE:
      return { ...state, LOADING: false, ERROR: action.payload };
    case GET_HOUSEHOLD_SUCCESS:
      return { ...state, LOADING: false, HOUSEHOLD: action.payload };
    case GET_MEMBERS_FETCHING:
      return { ...state, LOADING: true };
    case GET_MEMBERS_SUCCESS:
      return { ...state, LOADING: false, MEMBER: action.payload };
    case GET_MEMBERS_FAILURE:
      return { ...state, LOADING: false, ERROR: action.payload };
    case TOTAL_BEDS_FETCHING:
      return { ...state, LOADING: true };
    case TOTAL_BEDS_SUCCESS:
      return { ...state, LOADING: false, TOTAL_BEDS: action.payload };
    case TOTAL_BEDS_FAILURE:
      return { ...state, LOADING: false, ERROR: action.payload };
    case LATEST_LOG_FETCHING:
      return { ...state, LOADING: true };
    case LATEST_LOG_SUCCESS:
      return { ...state, LOADING: false, LATEST_LOG: action.payload };
    case LATEST_LOG_FAILURE:
      return { ...state, LOADING: false, ERROR: action.payload };
    case BEDS_UPDATE_FAILURE:
      return { ...state, LOADING: false, ERROR: action.payload };
    case BEDS_UPDATE_LOADING:
      return { ...state, LOADING: true };
    case BEDS_UPDATE_SUCCESS:
      return { ...state, TOTAL_BEDS: action.payload, LOADING: false };
    case LOGS_DAILY_FAILURE:
      return { ...state, LOADING: false, ERROR: action.payload };
    case LOGS_DAILY_LOADING:
      return { ...state, LOADING: true };
    case LOGS_DAILY_SUCCESS:
      return { ...state, RESERVATION_LOGS: action.payload, LOADING: false };
    case DOCUSIGN_REDIRECT:
      return { ...state, DOCUSIGN_URL: action.payload, LOADING: false };
    case SIGNER_INFO:
      return { ...state, SIGNER_INFORMATION: action.payload };
    case GET_SPEC_MEMBER_FETCHING:
      return { ...state, LOADING: true };
    case GET_SPEC_MEMBER_SUCCESS:
      return { ...state, LOADING: false, SPECIFIC_MEMBER: action.payload };
    case GET_SPEC_MEMBER_FAILURE:
      return { ...state, LOADING: false, ERROR: action.payload };
    default:
      return state;
  }
};
