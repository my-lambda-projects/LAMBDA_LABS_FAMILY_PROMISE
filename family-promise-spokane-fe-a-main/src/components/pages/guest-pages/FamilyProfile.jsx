/* eslint-disable no-restricted-globals */
/*
Displays information for a family.
This component contains:
  -Informatin for family
  -**does NOT include info for individual member
*/
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Members from './Members';
import EditGuestInformation from './EditProfileInfo/EditGuestInformation';

//Ant Design imports (https://ant.design/components/overview/)
import { Avatar, Descriptions, Card, Button, Modal, notification } from 'antd';

//redux
import { connect } from 'react-redux';
import actions from '../../../state/actions/families';
import GuestAnalytics from './GuestAnalytics';

//For tabs component from Ant Design
//The key refrences the keys in the contentListNoTitle varible below
const tabListNoTitle = [
  {
    key: 'Contact Info',
    tab: 'Contact Info',
  },
  {
    key: 'Members',
    tab: 'Members',
  },
  {
    key: 'Additional Info',
    tab: 'Additional Info',
  },
  {
    key: 'Missing Information',
    tab: 'Missing Information',
  },
  {
    key: 'History',
    tab: 'History',
  },
];

const FamilyProfile = ({ familyInfo, fetchFamily }) => {
  const params = useParams();
  const familyId = params.familyId;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        Confirm
      </Button>
    );
    notification.open({
      message: 'You have unsaved changes',
      description: 'If you close this window now, your changes will be lost.',
      key,
      btn,
      // eslint-disable-next-line
      onClose: close,
    });
  };

  const handleCancel = () => {
    if (closeModal) {
      openNotification();
      setCloseModal(false);
    } else {
      setIsModalVisible(false);
    }
  };

  useEffect(() => {
    fetchFamily(familyId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [tab, setTab] = useState({ key: 'tab1', noTitleKey: 'Contact Info' });

  const onTabChange = (key, type) => {
    setTab({ [type]: key });
  };

  let contentListNoTitle = {};

  //This makes sure it fetches completely before calling to prevet an error
  if (familyInfo?.phone_one !== undefined && familyInfo?.phone_one !== {}) {
    contentListNoTitle = {
      'Contact Info': (
        <div className="contact_info">
          <Descriptions title="Main Contact(s):">
            <Descriptions.Item label="Name">
              {familyInfo?.phone_one?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Number">
              {familyInfo?.phone_one?.number}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="Name">
              {familyInfo?.phone_two?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Number">
              {familyInfo?.phone_two?.number}
            </Descriptions.Item>
          </Descriptions>
          <br></br>
          <Descriptions title="Alternative Contact:">
            <Descriptions.Item label="Name">
              {familyInfo?.safe_alternate?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Number">
              {familyInfo?.safe_alternate?.number}
            </Descriptions.Item>
          </Descriptions>
          <br></br>
          <Descriptions title="Emergency Contact:">
            <Descriptions.Item label="Name">
              {familyInfo?.emergencyContact?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Number">
              {familyInfo?.emergencyContact?.number}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ),
      History: (
        <div className="history">
          <Descriptions title="Last Permanent Address:">
            <Descriptions.Item>
              {familyInfo?.last_permanent_address}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Current Location:">
            <Descriptions.Item>
              {familyInfo?.homeless_info?.current_location}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Time at Current Location:">
            <Descriptions.Item>
              {familyInfo?.homeless_info?.length_at_current_location}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Prior Location:">
            <Descriptions.Item>
              {familyInfo?.homeless_info?.prior_location}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Time at Prior Location:">
            <Descriptions.Item>
              {familyInfo?.homeless_info?.length_at_prior_location}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Times Homeless in Last Three Years:">
            <Descriptions.Item>
              {familyInfo?.homeless_info?.num_times_homeless}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Months Homeless in Last Three Years:">
            <Descriptions.Item>
              {familyInfo?.homeless_info?.total_len_homeless}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ),
      'Additional Info': (
        <div className="additional_info">
          <Descriptions title="Insurance:">
            <Descriptions.Item label="Insurance Type">
              {familyInfo?.insurance?.health_insurance_type}
            </Descriptions.Item>
            <Descriptions.Item label="Members Covered">
              {familyInfo?.insurance?.members_covered}
            </Descriptions.Item>
            <Descriptions.Item label="Has Pregnant Member">
              {familyInfo?.insurance?.pregnancies === true ? 'yes' : 'no'}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Government Benefits:">
            <Descriptions.Item label="RRH">
              {familyInfo?.gov_benefits?.RRH === true ? 'yes' : 'no'}
            </Descriptions.Item>
            <Descriptions.Item label="CPS/FPS">
              {familyInfo?.gov_benefits?.cps_fps === true ? 'yes' : 'no'}
            </Descriptions.Item>
            <Descriptions.Item label="Food Stamps">
              {familyInfo?.gov_benefits?.foodstamps === true ? 'yes' : 'no'}
            </Descriptions.Item>
            <Descriptions.Item label="Housing Voucher">
              {familyInfo?.gov_benefits?.housing_voucher === true
                ? 'yes'
                : 'no'}
            </Descriptions.Item>
            <Descriptions.Item label="SNAP">
              {familyInfo?.gov_benefits?.snap === true ? 'yes' : 'no'}
            </Descriptions.Item>
            <Descriptions.Item label="Veteran Services">
              {familyInfo?.gov_benefits?.veteran_servcies === true
                ? 'yes'
                : 'no'}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Vehicle:">
            <Descriptions.Item label="Make">
              {familyInfo?.vehicle?.make}
            </Descriptions.Item>
            <Descriptions.Item label="Model">
              {familyInfo?.vehicle?.model}
            </Descriptions.Item>
            <Descriptions.Item label="Year">
              {familyInfo?.vehicle?.year}
            </Descriptions.Item>
            <Descriptions.Item label="Color">
              {familyInfo?.vehicle?.color}
            </Descriptions.Item>
            <Descriptions.Item label="License Plate">
              {familyInfo?.vehicle?.license_plate}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Domestic Violence:">
            <Descriptions.Item label="Date of Last Incident">
              {familyInfo?.domestic_violence_info?.date_last_incident}
            </Descriptions.Item>
            <Descriptions.Item label="YWCA Has Been Contacted">
              {familyInfo?.domestic_violence_info?.YWCA_contacted === true
                ? 'yes'
                : 'no'}
            </Descriptions.Item>
            <Descriptions.Item label="Anonymity Preferred">
              {familyInfo?.domestic_violence_info?.anonymity_preferred === true
                ? 'yes'
                : 'no'}
            </Descriptions.Item>
            <Descriptions.Item label="Fleeing Domestic Violence">
              {familyInfo?.domestic_violence_info?.fleeing_dv === true
                ? 'yes'
                : 'no'}
            </Descriptions.Item>
            <Descriptions.Item label="Has Court Order of Protection">
              {familyInfo?.domestic_violence_info?.has_court_order === true
                ? 'yes'
                : 'no'}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ),
      'Missing Information': <GuestAnalytics />,
      Members: <Members />,
    };
  }

  return (
    <div className="user-container">
      <div className="profile-header-container">
        <Avatar
          size={{ xs: 100, sm: 150, md: 200, lg: 200, xl: 200, xxl: 200 }}
          src={familyInfo?.avatar_url}
        />
        <Button onClick={showModal}>Edit Family Info</Button>
        <Modal
          title="Edit Family Info"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <EditGuestInformation setCloseModal={setCloseModal} />
        </Modal>
      </div>

      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={tab.noTitleKey}
        onTabChange={key => {
          onTabChange(key, 'noTitleKey');
        }}
      >
        {contentListNoTitle[tab.noTitleKey]}
      </Card>
    </div>
  );
};

function mapStateToProps(state) {
  return { familyInfo: state.FAMILY };
}
const mapDispatchToProps = {
  fetchFamily: actions.fetchFamily,
};
export default connect(mapStateToProps, mapDispatchToProps)(FamilyProfile);
