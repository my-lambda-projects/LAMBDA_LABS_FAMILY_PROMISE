import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../../../api/axiosWithAuth';
import LoadingComponent from '../../common/LoadingComponent';

import MaterialTable, { MTableToolbar } from 'material-table';
import { Button } from '@material-ui/core';
import { tableIcons } from '../../../utils/tableIcons';

const FamilyMembers = () => {
  const history = useHistory();
  const params = useParams();

  const familyId = params.id;

  const [loading, setLoading] = useState(true);
  // State below is unused
  //const [familyInfo, setFamilyInfo] = useState({});
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', type: 'date' },
      { title: 'relationship', field: 'relationship' },
    ],
    data: [],
  });

  const fetchFamilyInfo = async () => {
    try {
      // eslint-disable-next-line
      const info = await axiosWithAuth()
        .get(`/families/${familyId}`)
        .then(res => res.data);

      //setFamilyInfo(info);

      const data = await axiosWithAuth()
        .get(`/families/${familyId}/members`)
        .then(res => res.data);
      const formattedData = data.map(member => {
        return { ...member.demographics };
      });
      let copy = { ...state };
      copy.data.push(...formattedData);

      setState(copy);
    } catch (error) {
      console.log('error family.jsx 45', error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilyInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="guest-table-container">
      <div className="guest-table">
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
          title="Members"
          columns={state.columns}
          data={state.data}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ padding: '0px 10px' }}>
                  <Button
                    onClick={() => history.push(`/families/${familyId}/notes`)}
                  >
                    Notes
                  </Button>
                  <Button
                    onClick={() => history.push(`/familyprofile/${familyId}`)}
                  >
                    Additional Information
                  </Button>
                </div>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default FamilyMembers;
