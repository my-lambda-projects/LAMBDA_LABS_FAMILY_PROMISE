//****** I don't think this component is being used for anything at the moment */
import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
//import LoadingComponent from '../../common/LoadingComponent';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { tableIcons } from '../../../utils/tableIcons';
import { Switch } from 'antd';

export default function SupervisorCheckIn() {
  //const [loading, setLoading] = useState(true);
  //this sets the table so that materiatable can display it
  //the data[] array is retrieved from the API and represents the row
  const [table, setTable] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Reservation', field: 'reservation_status' },
      { title: 'Reservation ID', field: 'reservation_id' },
      { title: 'Onsite (7pm)', field: 'on_site_7pm' },
      { title: 'Onsite (10pm)', field: 'on_site_10pm' },
      { title: 'Beds Reserved(Family)', field: 'beds_reserved' },
    ],
    data: [],
  });

  const clickHandler = (e, item) => {};

  //need to find user ID using the name field from logs table. Then use that user ID to update the on-site, reservation fields, etc. in the members table)
  const cancelReservation = (e, name, resId, famId) => {};

  //1)get all logs
  //2)filter by date (using filter by a random reservation ID for now as
  //no date yet)
  //3) display all guests with reservation
  useEffect(() => {
    axiosWithAuth()
      .get('/logs')
      .then(res => {
        const date = new Date();
        const fullDate = date.toDateString();
        //const hours = new Date().getHours();
        //const getMinutes = new Date().getMinutes();
        //const minutes = (getMinutes < 10 ? '0' : '') + getMinutes;

        //filter logs by today's date
        let results = res.data.filter(d => {
          if (d.date === fullDate) return d;
          // eslint-disable-next-line
          else return;
        });

        let temp = [];
        for (let i = 0; i < results.length; i++) {
          results[i].members_staying.forEach(item => {
            temp.push({
              name: item,
              family_id: results[i].family_id,
              reservation_status: (
                <Switch
                  defaultChecked={true}
                  onChange={e => {
                    cancelReservation(
                      e,
                      item,
                      results[i].reservation_id,
                      results[i].family_id
                    );
                  }}
                />
              ),
              reservation_id: results[i].reservation_id,
              on_site_7pm: <Switch />,
              on_site_10pm: (
                <Switch
                  onChange={e => {
                    clickHandler(e, item);
                  }}
                />
              ),
              beds_reserved: results[i].beds_reserved,
            });
          });
          //create the row for the table
          setTable({ ...table, data: temp });
          //setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (loading) {
  //   return (
  //     <div className="guest-table-container">
  //       <LoadingComponent />
  //     </div>
  //   );
  // }

  return (
    <div className="guest-table-container">
      <div className="guest-table">
        <h1>Guests Check-in</h1>
        <MaterialTable
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
          columns={table.columns}
          data={table.data}
        />
      </div>
    </div>
  );
}
