// //*****This component is being rendered in the SupervisorAnalytics component */
// import React, { useEffect, useState } from 'react';
// import MaterialTable from 'material-table';
// import { axiosWithAuth } from '../../../api/axiosWithAuth';
// import { useHistory } from 'react-router-dom';
// import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
// import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
// import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
// import { tableIcons } from '../../../utils/tableIcons';
// import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
// import FlagGuest from '../../modals/FlagGuest';
// import GuestNotes from '../../modals/GuestNotes';
// import LoadingComponent from '../../common/LoadingComponent';
// import Modal from 'react-modal';
// import '../Guests/guest.css';
// import GuestMoreInfo from '../Guests/GuestMoreInfo';
// import { Paper } from '@material-ui/core';
// import { useSelector, useDispatch } from 'react-redux';
// import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
// Modal.setAppElement('#root');

// const Guests = ({ guestsCheckedInCount, setGuestsCheckedInCount }) => {
//   const [isFlagOpen, setIsFlagOpen] = useState(false);
//   const [isNotesOpen, setIsNotesOpen] = useState(false);
//   const [guestId, setGuestId] = useState(null);
//   const [result, setResult] = useState(null);
//   const [clicked, setClicked] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isOpen, setIsOpen] = useState(false);
//   const globalLogs = useSelector(state => state.RESERVATION_LOGS);
//   const history = useHistory();
//   const [state, setState] = useState({
//     columns: [
//       { title: 'First', field: 'first_name', type: 'hidden' },
//       { title: 'Last ', field: 'last_name' },
//       { title: 'Relationship', field: 'relationship' },
//       { title: 'Checked In', field: '0.on_site_10pm', type: 'boolean' },
//     ],
//     data: [],
//   });
//   function toggleModal(e) {
//     e.preventDefault();
//     setIsOpen(!isOpen);
//   }

//   useEffect(() => {
//     let copy = { ...state };
//     let filter = globalLogs.filter(
//       member =>
//         member.reservation_status === true &&
//         member.check_in[0].reservation_status === true
//     );
//     // this reformats the filtered logs to spread out the nested values
//     let formattedData = filter.map(member => {
//       return {
//         ...member.demographics,
//         ...member.bearers,
//         ...member.schools,
//         ...member.check_in,
//         flag_level: 0,
//         ...member,
//       };
//     });

//     // if there is no data, we populate our table
//     if (copy.data.length === 0) {
//       copy.data.push(...formattedData);
//       console.log(copy);
//       setState(copy);
//     }

//     setLoading(false);
//   }, [globalLogs, state]);

//   const handleCheckInClick = rowData => {
//     setClicked(!clicked);
//     const checkIn = {
//       check_in: [
//         {
//           waitlist: rowData.waitlist,
//           on_site_7pm: rowData.on_site_7pm,
//           on_site_10pm: !rowData.check_in[0].on_site_10pm,
//           reservation_id: rowData.reservation_id,
//           reservation_status: rowData.reservation_status,
//         },
//       ],
//     };
//     axiosWithAuth()
//       .put(`/members/${rowData.id}`, checkIn)
//       .then(res => console.log(res.data))
//       .catch(err => console.log(err.message));
//     // / in state.data, iterate through, if the id matches rowData.id then we set 0.on_site_10pm to opposite its value
//     const newMembers = state.data.map(member => {
//       if (member.id === rowData.id) {
//         const newMem = {
//           ...member,
//           0: {
//             ...member['0'],
//             on_site_10pm: !member['0'].on_site_10pm,
//           },
//         };
//         return newMem;
//       } else return member;
//     });
//     if (rowData['0'].on_site_10pm) {
//       setGuestsCheckedInCount(guestsCheckedInCount - 1);
//     } else {
//       setGuestsCheckedInCount(guestsCheckedInCount + 1);
//     }
//     setState({ ...state, data: newMembers });
//   };

//   if (loading) {
//     return (
//       <div className="exec-guest-table-container">
//         <LoadingComponent />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={toggleModal}
//         contentLabel="My dialog"
//         className="mymodal"
//         overlayClassName="myoverlay"
//         closeTimeoutMS={500}
//       >
//         {result ? <GuestMoreInfo familyInfo={result} /> : ''}
//       </Modal>
//       <div className="exec-guest-table-container">
//         {isNotesOpen && <GuestNotes setIsNotesOpen={setIsNotesOpen} />}
//         {isFlagOpen && (
//           <FlagGuest
//             setIsFlagOpen={setIsFlagOpen}
//             setState={setState}
//             guestId={guestId}
//           />
//         )}
//         <div className="exec-guest-table">
//           <MaterialTable
//             components={{
//               Container: props => <Paper {...props} elevation={0} />,
//             }}
//             options={{
//               actionsColumnIndex: -1,
//               exportButton: true,
//               rowStyle: rowData => ({
//                 backgroundColor:
//                   rowData.flag_level == 2
//                     ? 'rgba(255, 255, 0, 0.419)'
//                     : rowData.flag_level == 3
//                     ? 'rgba(255, 0, 0, 0.418)'
//                     : 'white',
//               }),
//             }}
//             icons={tableIcons}
//             title="Guests"
//             columns={state.columns}
//             data={state.data}
//             actions={[
//               {
//                 onClick: (e, rowData) => {
//                   console.log(rowData);
//                   handleCheckInClick(rowData);
//                 },
//                 icon: () => <DoneOutlinedIcon />,
//                 tooltip: 'Check In',
//               },
//               {
//                 icon: PeopleOutlinedIcon,
//                 tooltip: 'Family Members',
//                 onClick: (event, rowData) => {
//                   // Do save operation
//                   console.log(rowData);
//                   history.push(`/family/${rowData.family_id}`);
//                 },
//               },
//               {
//                 icon: NoteOutlinedIcon,
//                 tooltip: 'Notes',
//                 onClick: (event, rowData) => {
//                   // Do save operation
//                   setIsNotesOpen(true);
//                 },
//               },
//               {
//                 icon: FlagOutlinedIcon,
//                 tooltip: 'Flag Guest',
//                 onClick: (event, rowData) => {
//                   setIsFlagOpen(true);
//                   setGuestId(rowData.id);
//                 },
//               },
//               {
//                 icon: InfoOutlinedIcon,
//                 tooltip: 'More Info',
//                 onClick: (event, rowData) => {
//                   setResult(rowData);
//                   toggleModal(event);
//                   // Do save operation
//                 },
//               },
//             ]}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Guests;
