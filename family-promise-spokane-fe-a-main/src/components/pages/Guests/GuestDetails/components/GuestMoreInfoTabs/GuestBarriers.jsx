import React from 'react';

import { Typography } from 'antd';
const { Text } = Typography;

const GuestBarriers = ({ memberInfo }) => {
  return (
    <div>
      <div className="barriers">
        <div className="addInfoText">
          <Text type="secondary">HIV/AIDS:</Text>

          {memberInfo.barriers.HIV_AIDs
            ? memberInfo.barriers.HIV_AIDs === true
              ? 'yes'
              : 'no'
            : ''}

          <br></br>
        </div>
        <div className="addInfoText">
          <Text type="secondary">Alcohol Abuse:</Text>
          <p>
            {memberInfo.barriers.alcohol_abuse
              ? memberInfo.barriers.alcohol_abuse === true
                ? 'yes'
                : 'no'
              : ''}
          </p>
        </div>
        <div className="addInfoText">
          <Text type="secondary">Chronic Health Issues:</Text>
          <p>
            {memberInfo.barriers.chronic_health_issues
              ? memberInfo.barriers.chronic_health_issues === true
                ? 'yes'
                : 'no'
              : ''}
          </p>
        </div>
        <br></br>
        <div className="addInfoText">
          <Text type="secondary">Physcial Disabilites:</Text>
          <p>
            {memberInfo.barriers.physcial_disabilites
              ? memberInfo.barriers.physcial_disabilites === true
                ? 'yes'
                : 'no'
              : ''}
          </p>
        </div>

        <div className="addInfoText">
          <Text type="secondary">Development Disabilites:</Text>
          <p>
            {memberInfo.barriers.developmental_disabilites
              ? memberInfo.barriers.developmental_disabilites === true
                ? 'yes'
                : 'no'
              : ''}
          </p>
        </div>
        <div className="addInfoText">
          <Text type="secondary">Drug Abuse:</Text>
          <p>
            {memberInfo.barriers.drug_abuse
              ? memberInfo.barriers.drug_abuse === true
                ? 'yes'
                : 'no'
              : ''}
          </p>
        </div>
        <div className="addInfoText">
          <Text type="secondary">Indefinite Conditions:</Text>
          <p>
            {memberInfo.barriers.list_indefinite_conditions
              ? memberInfo.barriers.list_indefinite_conditions === true
                ? 'yes'
                : 'no'
              : ''}
          </p>
        </div>
        <div className="addInfoText">
          <Text type="secondary">Issues:</Text>
          <p>
            {memberInfo.barriers.issues
              ? memberInfo.barriers.issues === true
                ? 'yes'
                : 'no'
              : ''}
          </p>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default GuestBarriers;
