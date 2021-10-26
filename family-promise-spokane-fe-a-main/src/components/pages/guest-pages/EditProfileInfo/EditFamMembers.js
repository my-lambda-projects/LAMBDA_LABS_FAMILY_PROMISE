import React, { useState } from 'react';
import { Form, Input, Radio, Button } from 'antd';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const RenderFamilyMembers = ({ member, setCloseModal }) => {
  const { demographics, schools } = member;
  const [madeChanges, setMadeChanges] = useState(false);

  const [editFormValues, setEditFormValues] = useState({
    income: demographics.income,
    employer: demographics.employer,
    highest_grade_completed: schools.highest_grade_completed,
    enrolled_status: schools.enrolled_status,
    attendance_status: schools.attendance_status,
    school_type: schools.school_type,
    school_name: schools.school_name,
    mckinney_school: schools.mckinney_school,
  });

  const newData = {
    ...member,
    demographics: {
      ...demographics,
      income: JSON.parse(editFormValues.income),
      employer: editFormValues.employer,
    },
    schools: {
      ...schools,
      highest_grade_completed: editFormValues.highest_grade_completed,
      enrolled_status: editFormValues.enrolled_status,
      attendance_status: editFormValues.attendance_status,
      school_type: editFormValues.school_type,
      school_name: editFormValues.school_name,
      mckinney_school: editFormValues.mckinney_school,
    },
  };

  const handleChange = e => {
    setEditFormValues({
      ...editFormValues,
      [e.target.name]: e.target.value,
    });
    setMadeChanges(true);
  };

  setCloseModal(madeChanges);

  const submitChanges = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/members/${member.id}`, newData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    setMadeChanges(false);
  };

  return (
    <div>
      <Form onSubmitCapture={submitChanges} layout={'vertical'}>
        <h3>Work</h3>
        <Form.Item label="Monthly Income:">
          <Input
            name="income"
            type="text"
            value={editFormValues.income}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Emplyoyer:">
          <Input
            name="employer"
            type="text"
            value={editFormValues.employer}
            onChange={handleChange}
          />
        </Form.Item>
        <h3>School</h3>
        <Form.Item label="Highest Completed Grade:">
          <Input
            name="highest_grade_completed"
            type="text"
            value={editFormValues.highest_grade_completed}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Are they currently enrolled:">
          <Radio.Group
            name="enrolled_status"
            value={editFormValues.enrolled_status}
            onChange={handleChange}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
        {schools.enrolled_status && (
          <>
            <Form.Item label="Attendance Status:">
              <Input
                name="attendance_status"
                type="text"
                value={editFormValues.attendance_status}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Type of School:">
              <Input
                name="school_type"
                type="text"
                value={editFormValues.school_type}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="School Name:">
              <Input
                name="school_name"
                type="text"
                value={editFormValues.school_name}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Is the school associated with McKinney:">
              <Radio.Group
                name="mckinney_school"
                value={editFormValues.mckinney_school}
                onChange={handleChange}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )}
        <Button type="primary" disabled={!madeChanges} onClick={submitChanges}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default RenderFamilyMembers;
