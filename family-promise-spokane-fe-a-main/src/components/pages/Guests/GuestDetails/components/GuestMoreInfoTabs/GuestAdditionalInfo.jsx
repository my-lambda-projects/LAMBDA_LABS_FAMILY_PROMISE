import React from 'react';

import { Typography } from 'antd';
const { Text } = Typography;

const GuestAdditionalInfo = ({ memberInfo }) => {
  return (
    <div className="additional_info">
      <div className="addInfoText">
        <Text type="secondary">Date of Enrollment: </Text>
        <p>
          {memberInfo.date_of_enrollment ? memberInfo.date_of_enrollment : ''}
        </p>
      </div>
      <div className="addInfoText">
        <Text type="secondary">Flag</Text>
        <p>{memberInfo.flag ? memberInfo.flag : ''}</p>
      </div>
      <div className="addInfoText">
        <Text type="secondary">Flag Level</Text>
        <p>{memberInfo.flag_level ? memberInfo.flag_level : ''}</p>
      </div>
      <div className="addInfoText">
        <Text type="secondary">Length of Stay:</Text>
        <p>{memberInfo.length_of_stay ? memberInfo.length_of_stay : ''}</p>
      </div>
      <div className="addInfoText">
        <Text type="secondary">School: </Text>
        <p>
          {memberInfo.schools.attendance_status
            ? memberInfo.schools.attendance_status
            : ''}
        </p>
      </div>
      <div className="addInfoText">
        <Text type="secondary">School Name: </Text>
        <p>
          {memberInfo.schools.school_name ? memberInfo.schools.school_name : ''}
        </p>
      </div>
      <div className="addInfoText">
        <Text type="secondary">Mc Kinney School:</Text>
        <p>
          {memberInfo.schools.mckinney_school
            ? memberInfo.schools.mckinney_school
            : ''}
        </p>
      </div>
    </div>
  );
};

export default GuestAdditionalInfo;
