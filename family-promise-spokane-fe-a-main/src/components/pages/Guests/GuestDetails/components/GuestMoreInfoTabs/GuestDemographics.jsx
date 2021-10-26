import React from 'react';

import { Typography } from 'antd';
const { Text } = Typography;

const GuestDemographics = ({ memberInfo }) => {
  return (
    <div>
      <h3>Guest Demographics</h3>
      <div className="Demographics">
        <div className="addInfoText">
          <Text type="secondary" strong>
            First Name
          </Text>
          <p>
            {memberInfo.demographics.first_name
              ? memberInfo.demographics.first_name
              : ''}
          </p>
        </div>

        <div className="addInfoText">
          <Text type="secondary" strong>
            Last Name
          </Text>
          <p>
            {memberInfo.demographics.last_name
              ? memberInfo.demographics.last_name
              : ''}{' '}
          </p>
        </div>

        <div className="addInfoText">
          <Text type="secondary" strong>
            Relationship
          </Text>
          <p>
            {memberInfo.demographics.relationship
              ? memberInfo.demographics.relationship
              : ''}
          </p>
        </div>

        <div className="addInfoText">
          <Text type="secondary" strong>
            Gender
          </Text>
          <p>
            {memberInfo.demographics.gender
              ? memberInfo.demographics.gender
              : ''}
          </p>
        </div>
        <div className="addInfoText">
          <Text type="secondary" strong>
            Date Of Birth
          </Text>
          <p>
            {memberInfo.demographics.DOB ? memberInfo.demographics.DOB : ''}
          </p>
        </div>
        <div className="addInfoText">
          <Text type="secondary" strong>
            SSN
          </Text>
          <p>
            {' '}
            {memberInfo.demographics.SSN ? memberInfo.demographics.SSN : ''}
          </p>
        </div>
        <div className="addInfoText">
          <Text type="secondary" strong>
            Employer
          </Text>
          <p>
            {memberInfo.demographics.employer
              ? memberInfo.demographics.employer
              : ''}
          </p>
        </div>
        <div className="addInfoText">
          <Text type="secondary" strong>
            Income
          </Text>
          <p>
            {' '}
            {memberInfo.demographics.income
              ? memberInfo.demographics.income
              : ''}
          </p>
        </div>
        <div className="addInfoText">
          <Text type="secondary" strong>
            Race
          </Text>
          <p>
            {memberInfo.demographics.race ? memberInfo.demographics.race : ''}
          </p>
        </div>
        <div className="addInfoText">
          <Text type="secondary" strong>
            Ethnicity
          </Text>
          <p>
            {memberInfo.demographics.ethnicity
              ? memberInfo.demographics.ethnicity
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestDemographics;
