/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const EditHouseHoldInfo = ({ familyInfo, setCloseModal }) => {
  const {
    phone_one,
    phone_two,
    emergencyContact,
    vehicle,
    gov_benefits,
    insurance,
  } = familyInfo;
  console.log(familyInfo);

  const [familyInfoForm, setFamilyInfoForm] = useState({});
  const [madeChanges, setMadeChanges] = useState(false);

  useEffect(() => {
    setFamilyInfoForm({
      number1: phone_one?.number,
      number2: phone_two?.number,
      foodStamps: gov_benefits?.foodstamps, // radio
      emergencyContactName: emergencyContact?.name,
      emergencyContactNumber: emergencyContact?.number,
      has_insurance: insurance?.has_insurance, // radio
      health_insurance_type: insurance?.health_insurance_type,
      members_covered: insurance?.members_covered, // int
      pregnancies: insurance?.pregnancies, // radio
      vehicle_make: vehicle?.make,
      vehicle_model: vehicle?.model,
      vehicle_year: vehicle?.year, // int
      vehicle_color: vehicle?.color,
      vehicle_plate: vehicle?.license_plate,
    });
  }, [familyInfo]);

  const newData = {
    ...familyInfo,
    emergencyContact: {
      ...emergencyContact,
      name: familyInfoForm.emergencyContactName,
      number: familyInfoForm.emergencyContactNumber,
    },
    gov_benefits: {
      ...gov_benefits,
      foodstamps: familyInfoForm.foodStamps,
    },
    insurance: {
      ...insurance,
      has_insurance: familyInfoForm.has_insurance,
      health_insurance_type: familyInfoForm.health_insurance_type,
      members_covered: familyInfoForm.members_covered,
      pregnancies: familyInfoForm.pregnancies,
    },
    phone_one: {
      ...phone_one,
      number: familyInfoForm.number1,
    },
    phone_two: {
      ...phone_two,
      number: familyInfoForm.number2,
    },
    vehicle: {
      ...vehicle,
      make: familyInfoForm.vehicle_make,
      year: familyInfoForm.vehicle_year,
      color: familyInfoForm.vehicle_color,
      model: familyInfoForm.vehicle_color,
      license_plate: familyInfoForm.vehicle_plate,
    },
  };

  const handleChange = e => {
    setFamilyInfoForm({
      ...familyInfoForm,
      [e.target.name]: e.target.value,
    });
    setMadeChanges(true);
  };

  setCloseModal(madeChanges);

  const submitChanges = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/families/${familyInfo.id}`, newData)
      .catch(err => {
        console.log(err);
      });
    setMadeChanges(false);
  };

  return (
    <div>
      <Form onSubmitCapture={submitChanges} layout={'vertical'}>
        <h3>Phone Numbers</h3>
        <Form.Item label="Phone 1">
          <Input
            name="number1"
            type="text"
            value={familyInfoForm.number1}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Phone 2">
          <Input
            name="number2"
            type="text"
            value={familyInfoForm.number2}
            onChange={handleChange}
          />
        </Form.Item>

        <h3>Government Benefits</h3>
        <Form.Item label="On Food Stamps?">
          <Radio.Group
            name="foodStamps"
            value={familyInfoForm.foodStamps}
            onChange={handleChange}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <h3>Emergency Contact</h3>
        <Form.Item label="Name">
          <Input
            name="emergencyContactName"
            type="text"
            value={familyInfoForm.emergencyContactName}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Number">
          <Input
            name="emergencyContactNumber"
            type="text"
            value={familyInfoForm.emergencyContactNumber}
            onChange={handleChange}
          />
        </Form.Item>

        <h3>Insurance</h3>
        <Form.Item label="Have Insurance?">
          <Radio.Group
            name="has_insurance"
            value={familyInfoForm.has_insurance}
            onChange={handleChange}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Health Insurance Type">
          <Input
            name="health_insurance_type"
            type="text"
            value={familyInfoForm.health_insurance_type}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Members Covered">
          <Input
            name="members_covered"
            type="text"
            value={familyInfoForm.members_covered}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Pregnancies?">
          <Radio.Group
            name="pregnancies"
            value={familyInfoForm.pregnancies}
            onChange={handleChange}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <h3>Vehicle Info</h3>
        <Form.Item label="Make">
          <Input
            name="vehicle_make"
            type="text"
            value={familyInfoForm.vehicle_make}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Model">
          <Input
            name="vehicle_model"
            type="text"
            value={familyInfoForm.vehicle_model}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Year">
          <Input
            name="vehicle_year"
            type="text"
            value={familyInfoForm.vehicle_year}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="License Plate">
          <Input
            name="vehicle_plate"
            type="text"
            value={familyInfoForm.vehicle_plate}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Color">
          <Input
            name="vehicle_color"
            type="text"
            value={familyInfoForm.vehicle_color}
            onChange={handleChange}
          />
        </Form.Item>
        <Button disabled={!madeChanges} type="primary" onClick={submitChanges}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditHouseHoldInfo;
