/*
General infromation about EACH family member.
This component contains:
  -Gender (dropdown)
  -Birth date (date picker)
  -SSN (number input)
  -income source (input)
  -income monthly amount (number input)
Suggestions:
  -Make income source a dropdown (stakeholder)
  -Add more gender options(stakeholder)
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import {
  Form,
  Space,
  DatePicker,
  InputNumber,
  Card,
  Select,
  Progress,
  Divider,
  Row,
  Col,
  Checkbox,
} from 'antd';

//moment is for the date picker (learn more: https://devhints.io/moment)
import moment from 'moment';

const options = ['Job', 'TANF', 'SSI', 'SSDI', 'Child Support', 'Other'];

const optionDataName = {
  Job: 'job',
  TANF: 'TANF',
  SSI: 'SSI',
  SSDI: 'SSDI',
  'Child Support': 'child_support',
  Other: 'other',
};

const FamilyDemographics = ({
  navigation,
  formData,
  setForm,
  tempFormStyle,
  nameString,
  steps,
  step,
}) => {
  //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  //FamilyMember Data Structure from ../../intakePacket.jsx (props)
  const { familyMember } = formData;

  //Options for gender drop down
  const genderOptions = ['Male', 'Female', 'Decline to Answer'];

  /*Issues with setForm on inputs other than Input and Checkbox. 
  The following functions manually update the entire form. 

  Unable make keys dynamic in spread (currently not DRY code)
  You must create a new function for each input feild or make keys dynamic.
  */
  const setFormDate = mem => (e, dateString) => {
    familyMember[mem] = Object.assign(familyMember[mem], {
      ...familyMember[mem],
      demographics: { ...familyMember[mem].demographics, DOB: dateString },
    });
  };
  const setFormNumber = mem => value => {
    familyMember[mem] = Object.assign(familyMember[mem], {
      ...familyMember[mem],
      demographics: { ...familyMember[mem].demographics, employer: value },
    });
  };
  const setFormSSN = mem => value => {
    familyMember[mem] = Object.assign(familyMember[mem], {
      ...familyMember[mem],
      demographics: { ...familyMember[mem].demographics, SSN: value },
    });
  };
  const setFormSelect = mem => value => {
    familyMember[mem] = Object.assign(familyMember[mem], {
      ...familyMember[mem],
      demographics: { ...familyMember[mem].demographics, gender: value },
    });
  };
  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />

      <Card title="Family Demographics" bordered={false}>
        <IntakeButton navigation={navigation} />

        <Form layout="vertical">
          {/*Displays family members currently in formData.familyMember*/}
          {Object.keys(formData.familyMember).map((mem, key) => (
            <div key={key}>
              <Divider orientation="left" plain>
                {familyMember[mem].demographics.first_name}
              </Divider>

              {/*Space aligns Form.item(s) vertically*/}
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item label="Gender" style={{ width: '200px' }}>
                  <Select
                    placeholder="Please select an option"
                    defaultValue={familyMember[mem].demographics.gender}
                    onChange={setFormSelect(mem)}
                  >
                    {genderOptions.map(option => (
                      <Select.Option value={option}>{option}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Birthdate">
                  <DatePicker
                    format="MM/DD/YYYY"
                    name={nameString(mem, 'demographics.DOB')}
                    defaultValue={moment(
                      familyMember[mem].demographics.DOB != null
                        ? familyMember[mem].demographics.DOB
                        : '01/01/2020',
                      'MM/DD/YYYY'
                    )}
                    onChange={setFormDate(mem)}
                  />
                </Form.Item>

                <Form.Item label="Last 4 of SSN">
                  <InputNumber
                    placeholder="0000"
                    onChange={setFormSSN(mem)}
                    defaultValue={familyMember[mem].demographics.employer}
                  />
                </Form.Item>

                <Form.Item label="Monthly Income">
                  <InputNumber
                    onChange={setFormNumber(mem)}
                    formatter={value => `$ ${value}`}
                    defaultValue={familyMember[mem].demographics.employer}
                  />
                </Form.Item>
              </Space>

              <Form.Item label="Income Source (Choose all that apply)">
                <Row
                  justify={'space-between'}
                  align={'top'}
                  gutter={[16, 0]}
                  wrap={false}
                >
                  {options.map(source => (
                    <Col span={5.7}>
                      <Form.Item
                        label={source}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          flexDirection: 'column-reverse',
                          paddingRight: '20px',
                        }}
                      >
                        <Checkbox
                          defaultChecked={
                            familyMember[mem].demographics.income_source[
                              optionDataName[source]
                            ]
                          }
                          name={nameString(
                            mem,
                            `demographics.income_source.${optionDataName[source]}`
                          )}
                          onChange={setForm}
                        />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </Form.Item>
            </div>
          ))}
        </Form>
      </Card>
    </div>
  );
};

export default FamilyDemographics;
