// this is the component that renders either the admin or guest analytics component based on the user role

import React from 'react';

//components
import SupervisorAnalitcs from './supervisor-pages/SupervisorAnalytics';
import GuestAnalitics from './guest-pages/GuestAnalytics';

//redux
import { useSelector } from 'react-redux';

const Analytics = () => {
  const user = useSelector(state => state.CURRENT_USER);

  return (
    <div>
      {['supervisor', 'case_manager', 'executive_director'].includes(
        user.role
      ) ? (
        <SupervisorAnalitcs />
      ) : (
        <div className="dashboard-container">
          <GuestAnalitics />
        </div>
      )}
    </div>
  );
};

export default Analytics;
