import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import LoadingComponent from '../../common/LoadingComponent';
import MaterialTable, { MTableToolbar } from 'material-table';
import { useHistory } from 'react-router-dom';
import { tableIcons } from '../../../utils/tableIcons';
import { Button } from '@material-ui/core';

import { useSelector } from 'react-redux';

const MembersPage = () => {
  const user = useSelector(state => state.CURRENT_USER);
  const history = useHistory();
  // const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [familyInfo, setFamilyInfo] = useState({});
  const [familyId, setFamilyId] = useState();
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', type: 'date' },
      { title: 'Relationship', field: 'relationship' },
    ],
    data: [],
  });

  const fetchFamilyInfo = async () => {
    try {
      const family = await axiosWithAuth().get(`/families/user/${user.id}`);

      const famId = family.data.id;

      setFamilyId(famId);

      const data = await axiosWithAuth()
        .get(`/families/${famId}/members`)
        .then(res => res.data);
      const formattedData = data.map(member => {
        return { ...member.demographics };
      });

      let copy = { ...state };
      copy.data.push(...formattedData);

      setState(copy);
    } catch (error) {
      alert('failure');
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
                    Additonal Information
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

export default MembersPage;
