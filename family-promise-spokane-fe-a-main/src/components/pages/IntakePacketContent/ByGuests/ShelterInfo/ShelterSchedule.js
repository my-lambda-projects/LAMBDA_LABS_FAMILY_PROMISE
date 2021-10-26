import React from 'react';

//Previous/Next buttons

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Card, Row, Col } from 'antd';

const ShelterSchedule = () => {
  return (
    <div>
      <Card bordered={false}>
        <Form>
          <strong>Shelter Schedule:</strong>
          <Form.Item>
            <Row>
              <Col span={6}>
                <ul>
                  <li>
                    <u>6:00 am</u>
                  </li>
                </ul>
              </Col>
              <Col span={12}>
                Wake up. Start cleaning and putting away mats, pillows and
                blankets.
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row>
              <Col span={6}>
                <ul>
                  <li>
                    <u>6:45-7:00 am</u>
                  </li>
                </ul>
              </Col>
              <Col span={12}>
                Have all bedding and mats put back in the appropriate places,
                and be out of the warming shelter/Night Shelter.
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row>
              <Col span={6}>
                <ul>
                  <li>
                    <u>7:00 am</u>
                  </li>
                </ul>
              </Col>
              <Col span={12}>Sign-in, breakfast and daily chores</Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row>
              <Col span={6}>
                <ul>
                  <li>
                    <u>3:00-6:00 pm</u>
                  </li>
                </ul>
              </Col>
              <Col span={12}>Recommended dinner time</Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row>
              <Col span={6}>
                <ul>
                  <li>
                    <u>5:00 pm</u>
                  </li>
                </ul>
              </Col>
              <Col span={12}>Nightly check-in. Turn in Daily Plan</Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row>
              <Col span={6}>
                <ul>
                  <li>
                    <u>6:00-7:00 pm</u>
                  </li>
                </ul>
              </Col>
              <Col span={12}>Kitchen closes. Chore Check-in at 6pm</Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row>
              <Col span={6}>
                <ul>
                  <li>
                    <u>7:00 pm</u>
                  </li>
                </ul>
              </Col>
              <Col span={12}>
                Night Shelter Check-in and house meeting/announcements
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row>
              <Col span={6}>
                <ul>
                  <li>
                    <u>8:00 pm</u>
                  </li>
                </ul>
              </Col>
              <Col span={12}>
                Night Shelter Doors Locked. If you leave after anytime between
                8:00pm and 6am, you may not re-enter the shelter until 7am.
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row>
              <Col span={6}>
                <ul>
                  <li>
                    <u>9:00 pm</u>
                  </li>
                </ul>
              </Col>
              <Col span={12}>
                Lights out, shelter quiet, headphones please, Device lights
                dimmed
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row>
              <Col span={6}>
                <ul>
                  <li>
                    <u>8:00pm - 6:00 am</u>
                  </li>
                </ul>
              </Col>
              <Col span={12}>
                Smoking Area/Outside, kitchen area and walk-in cooler area is
                closed
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <strong>
              To be considerate to those sleeping around you, please do not get
              up and move around once lights are off, since this could disturb
              other sleeping guests. If you do need to get up early to go to
              work or get your kids to school, please ask a supervisor on how to
              put away your bedding.
            </strong>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ShelterSchedule;
