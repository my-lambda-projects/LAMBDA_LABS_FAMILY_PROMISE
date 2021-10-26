import React from 'react';
import { Typography, Collapse } from 'antd';

import RenderFamilyMembers from './RenderFamMembers';

const { Title } = Typography;
const { Panel } = Collapse;

const RenderFormData = ({ formData, signerInfo }) => {
  const { familyInfo, familyMember } = formData;
  const {
    phone_one,
    phone_two,
    emergencyContact,
    vehicle,
    last_payment_address,
    homeless_info,
    gov_benefits,
    insurance,
    domestic_violence_info,
    pets,
  } = familyInfo;
  console.log('FAMILY INFO ', familyInfo);
  console.log('FORM DATA ', formData);
  return (
    <div>
      <h2>Lets make sure all your information is correct!</h2>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Contact Information" key="1">
          <Title level={5}>{phone_one.name}</Title>
          <ul>
            <li>Phone Number: {phone_one.number}</li>
            <li>
              {phone_one.safeToLeaveMssg
                ? 'Safe to Leave Messages'
                : 'Do Not Leave Messages'}
            </li>
          </ul>
          <Title level={5}>{phone_two.name}</Title>
          <ul>
            <li>Phone Number: {phone_two.number}</li>
            <li>
              {phone_two.safeToLeaveMssg
                ? 'Safe to Leave Messages'
                : 'Do Not Leave Messages'}
            </li>
          </ul>
          <Title level={5}>Emergency Contact</Title>
          <ul>
            <li>Name: {emergencyContact.name}</li>
            <li>Phone Number: {emergencyContact.number}</li>
          </ul>
        </Panel>
        <Panel header="Vehicle Information" key="2">
          <ul>
            <li>Make: {vehicle.make} </li>
            <li>Year: {vehicle.year} </li>
            <li>Color: {vehicle.color} </li>
            <li>Model: {vehicle.model} </li>
            <li>License Plate: {vehicle.license_plate} </li>
          </ul>
        </Panel>
        <Panel header="Housing history" key="3">
          <ul>
            <li>Last Permenant Address: {last_payment_address}</li>
            <li>
              Length of stay at last permenant residence:{' '}
              {homeless_info.length_at_prior_location}
            </li>
            <li>Most recent residency: {homeless_info.prior_location}</li>
            <li>
              Length at current residence:{' '}
              {homeless_info.length_at_current_residence}
            </li>
            <li>
              Number of times homeless in the past two years:{' '}
              {homeless_info.num_times_homeless}
            </li>
            <li>
              Total length of homelessness in teh past two years:{' '}
              {homeless_info.total_len_homeless}
            </li>
            <li>
              Most recent date you became homeless:{' '}
              {homeless_info.homeless_start_date}
            </li>
          </ul>
        </Panel>
        <Panel header="Benefits and Insurance" key="4">
          <Title level={5}>Government Benefits you receive:</Title>
          <ul>
            {gov_benefits.RRH ? <li>RRH</li> : null}
            {gov_benefits.snap ? <li>SNAP</li> : null}
            {gov_benefits.cps_fps ? <li>CPS/ FPS</li> : null}
            {gov_benefits.foodstamps ? <li>Food Stamps</li> : null}
            {gov_benefits.housing_voucher ? <li>Housing Voucher</li> : null}
            {gov_benefits.veteran_services ? <li>veteran_services</li> : null}
          </ul>
          {insurance.has_insurance ? (
            <>
              <Title level={5}>Insurance</Title>
              <ul>
                <li>Members Covered under plan: {insurance.members_covered}</li>
                <li>Insurance Type: {insurance.health_insurance_type}</li>
              </ul>
            </>
          ) : null}
        </Panel>
        {domestic_violence_info.fleeing_dv && (
          <Panel header="Domestic Violence Information" key="5">
            <ul>
              <li>
                Have you contacted the YWCA:{' '}
                {domestic_violence_info.YWCA_contacted ? 'Yes' : 'No'}
              </li>
              <li>
                Do you have a court ordered restraining order:{' '}
                {domestic_violence_info.has_court_order ? 'Yes' : 'No'}{' '}
              </li>
              <li>
                Date of Last Incident:{' '}
                {domestic_violence_info.date_last_incident}
              </li>
              <li>
                Are you handeling you DV issue anonymously:{' '}
                {domestic_violence_info.anonymity_preferred ? 'Yes' : 'No'}{' '}
              </li>
            </ul>
          </Panel>
        )}
        {pets.shelter && (
          <Panel header="Pets" key="6">
            <ul>
              <li>Name: {pets.name_one}</li>
              <li>Type: {pets.dog ? 'Dog' : 'Cat'}</li>
              <li>Service Animal: {pets.service_animal ? 'Yes' : 'No'}</li>
              <li>
                Emotional Support Animal: {pets.support_animal ? 'Yes' : 'No'}
              </li>
            </ul>
          </Panel>
        )}
      </Collapse>

      {familyMember ? (
        <>
          {Object.keys(familyMember).map((member, key) => (
            <Collapse>
              <Panel
                key={key}
                header={
                  familyMember[member].demographics.first_name +
                  ' ' +
                  familyMember[member].demographics.last_name
                }
              >
                <RenderFamilyMembers member={familyMember[member]} />
              </Panel>
            </Collapse>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default RenderFormData;
