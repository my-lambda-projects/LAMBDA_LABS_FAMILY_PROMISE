// we started to transition into declaring user types in this file
// although you can probabably tell some of these we didn't get enough time to start using
// you will find in some files throughout the app we did data fetching in the useEffect hook
// something the next team can focus on is centralizing all state and data fetching to come from redux
// declare all types here and import them in the reducer/action files

// user types
export const LOG_IN = 'LOG_IN';
export const SET_LOADING = 'SET_LOADING';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// family types
export const GET_FAMILY_FETCHING = 'GET_FAMILY_FETCHING';
export const GET_FAMILY_SUCCESS = 'GET_FAMILY_SUCCESS';
export const GET_FAMILY_FAILURE = 'GET_FAMILY_FAILURE';

// members types
export const GET_MEMBERS_FETCHING = 'GET_MEMBERS_FETCHING';
export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE';

// household types
export const GET_HOUSEHOLD_FETCHING = 'GET_HOUSEHOLD_FETCHING';
export const GET_HOUSEHOLD_SUCCESS = 'GET_HOUSEHOLD_SUCCESS';
export const GET_HOUSEHOLD_FAILURE = 'GET_HOUSEHOLD_FAILURE';

// total beds types
export const TOTAL_BEDS_FETCHING = 'TOTAL_BEDS_FETCHING';
export const TOTAL_BEDS_SUCCESS = 'TOTAL_BEDS_SUCCESS';
export const TOTAL_BEDS_FAILURE = 'TOTAL_BEDS_FAILURE';

// guests latest logs if any
export const LATEST_LOG_FETCHING = 'LATEST_LOG_FETCHING';
export const LATEST_LOG_SUCCESS = 'LATEST_LOG_SUCCESS';
export const LATEST_LOG_FAILURE = 'LATEST_LOG_FAILURE';

export const BEDS_UPDATE_FAILURE = 'BEDS_UPDATE_FAILURE';
export const BEDS_UPDATE_SUCCESS = 'BEDS_UPDATE_SUCCESS';
export const BEDS_UPDATE_LOADING = 'BEDS_UPDATE_LOADING';

export const LOGS_DAILY_LOADING = 'LOGS_DAILY_LOADING';
export const LOGS_DAILY_SUCCESS = 'LOGS_DAILY_SUCCESS';
export const LOGS_DAILY_FAILURE = 'LOGS_DAILY_FAILURE';
//docusign
export const DOCUSIGN_REDIRECT = 'DOCUSIGN_REDIRECT';
export const SIGNER_INFO = 'SIGNER_INFO';

//getting a specific user for rendering their data
export const GET_SPEC_MEMBER_FETCHING = 'GET_SPEC_MEMBER_FETCHING';
export const GET_SPEC_MEMBER_SUCCESS = 'GET_SPEC_MEMBER_SUCCESS';
export const GET_SPEC_MEMBER_FAILURE = 'GET_SPEC_MEMBER_FAILURE';
