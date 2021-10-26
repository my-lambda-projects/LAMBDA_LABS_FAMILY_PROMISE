import React from 'react';

import { Typography } from 'antd';

const { Title } = Typography;

const RenderFamilyMembers = ({ member }) => {
  const { demographics, barriers, schools } = member;
  console.log(member);
  return (
    <div>
      <Title level={5}>Basic Information</Title>
      <ul>
        <li>Gender: {demographics.gender}</li>
        <li>Relationship: {demographics.relationship}</li>
        <li>Date of Birth: {demographics.DOB}</li>
        {demographics.income && <li>Monthly Income: {demographics.income}</li>}
      </ul>
      <Title level={5}>Barriers</Title>
      <ul>
        <li>Alcohol Abuse: {barriers.alcohol_abuse ? 'Yes' : 'No'}</li>
        <li>
          Chronic Health Issues: {barriers.chronic_health_issues ? 'Yes' : 'No'}
        </li>
        <li>Drug Abuse: {barriers.drug_abuse ? 'Yes' : 'No'}</li>
        <li>HIV/AIDs: {barriers.HIV_AIDs ? 'Yes' : 'No'}</li>
        <li>Mental Illness: {barriers.mental_illness ? 'Yes' : 'No'}</li>
        <li>
          Physical Disabilites: {barriers.physical_disabilities ? 'Yes' : 'No'}
        </li>
      </ul>
      {demographics.relationship === 'Child' && (
        <>
          <Title level={5}>Education:</Title>
          <ul>
            <li>Highest Completed Grade: {schools.highest_grade_completed}</li>
            <li>
              Are they currently enrolled:{' '}
              {schools.enrolled_status ? 'Yes' : 'No'}
            </li>
            {!schools.enrolled_status && (
              <li>
                Reason they are not Enrolled: {schools.reason_not_enrolled}
              </li>
            )}
            {schools.enrolled_status && (
              <>
                <li>Attendance Status: {schools.attendance_status}</li>
                <li>Type of School: {schools.school_type}</li>
                <li>Name of School: {schools.school_name}</li>
                <li>
                  Is the school associated with McKinney:{' '}
                  {schools.mckinney_school ? 'Yes' : 'No'}
                </li>
              </>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default RenderFamilyMembers;
