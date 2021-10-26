//
import React from 'react';
import ShelterSchedule from '../IntakePacketContent/ByGuests/ShelterInfo/ShelterSchedule';
import NightShelter from '../IntakePacketContent/ByGuests/ShelterInfo/NightShelter';
import Welcome from '../IntakePacketContent/ByGuests/ShelterInfo/Welcome';
import Inside from '../IntakePacketContent/ByGuests/ShelterInfo/Inside';
import Outside from '../IntakePacketContent/ByGuests/ShelterInfo/Outside';
import Important from '../IntakePacketContent/ByGuests/ShelterInfo/Important';
import Resources from '../IntakePacketContent/ByGuests/ShelterInfo/Resources';

import { Collapse } from 'antd';
import 'antd/dist/antd.css';

const { Panel } = Collapse;

const ShelterInfo = () => {
  return (
    <div className="shelter-info-padding">
      <div className="shelter-info-container">
        <h1 className="shelter-info-title">
          Shelter Information and Additional Resources
        </h1>

        <Collapse accordion>
          <Panel header="Welcome to Open Doors">
            <Welcome />
          </Panel>

          <Panel header="Shelter Schedule">
            <ShelterSchedule />
          </Panel>

          <Panel header="Night Shelter Expectations and Safety">
            <NightShelter />
          </Panel>

          <Panel header="Inside the Shelter">
            <Inside />
          </Panel>

          <Panel header="Outside the Shelter">
            <Outside />
          </Panel>

          <Panel header="Important Reminders">
            <Important />
          </Panel>

          <Panel header="Important Resources and Phone Numbers">
            <Resources />
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
export default ShelterInfo;
