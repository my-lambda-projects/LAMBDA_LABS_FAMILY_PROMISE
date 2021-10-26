import React, { useState, useEffect } from 'react';

import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

import { Collapse } from 'antd';
const { Panel } = Collapse;

const FamilyDetails = ({ familyId }) => {
  const [membersInfo, setMembersInfo] = useState([]);

  const fetchMembersInfo = async familyId => {
    try {
      const data = await axiosWithAuth()
        .get(`/families/${familyId}/members`)
        .then(res => res.data);

      const formattedData = data.map(member => ({ ...member.demographics }));
      setMembersInfo(formattedData);
    } catch (error) {
      console.log('error FamilyDetail.jsx 9');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembersInfo(familyId);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Collapse>
        {membersInfo.map((member, idx) => {
          return (
            <>
              <Panel
                header={member.first_name + ' ' + member.last_name}
                key={idx}
              >
                <p key={idx}>Relationship: {member.relationship}</p>
                <p key={idx}>Date of Birth: {member.DOB}</p>
              </Panel>
            </>
          );
        })}
      </Collapse>
    </div>
  );
};

export default FamilyDetails;
