import React, { useState } from 'react';

import GuestDemographics from './GuestMoreInfoTabs/GuestDemographics';
import GuestBarriers from './GuestMoreInfoTabs/GuestBarriers';
import GuestAdditionalInfo from './GuestMoreInfoTabs/GuestAdditionalInfo';

import { Card } from 'antd';

const tabList = [
  {
    key: 'Demographics',
    tab: 'Demographics',
  },
  {
    key: 'Barriers',
    tab: 'Barriers',
  },
  {
    key: 'Additional Info',
    tab: 'Additional Info',
  },
];

const GuestMoreInfo = ({ memberInfo }) => {
  const [tab, setTab] = useState({ key: 'tab1', component: 'Demographics' });

  const onTabChange = (key, type) => {
    setTab({ [type]: key });
  };

  const contentListNoTitle = {
    Demographics: <GuestDemographics memberInfo={memberInfo} />,
    Barriers: <GuestBarriers memberInfo={memberInfo} />,
    'Additional Info': <GuestAdditionalInfo memberInfo={memberInfo} />,
  };

  return (
    <div>
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={tab.component}
        onTabChange={key => {
          onTabChange(key, 'component');
        }}
      >
        {memberInfo ? contentListNoTitle[tab.component] : ''}
      </Card>
    </div>
  );
};

export default GuestMoreInfo;
