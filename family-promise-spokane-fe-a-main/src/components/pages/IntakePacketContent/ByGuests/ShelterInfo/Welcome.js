import React from 'react';

//Contains info Welcome to Open Doors pg 33

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Card } from 'antd';

const NightShelter = () => {
  return (
    <div>
      <Card bordered={false}>
        <Form>
          <Form.Item>
            <p>
              Here at Open Doors, we seek to welcome our guests with warmth,
              respect, and compassion. As a staff, our goal is to provide a safe
              and caring space for you and your family during your stay here at
              Open Doors and to empower you as you search for a permanent
              housing. Please let us know how we can best support you in this
              transition.
            </p>
          </Form.Item>

          <Form.Item>
            <strong>Our Core Values:</strong>
            <ol>
              <li>Be non-judgemental</li>
              <li>Be respectfully compassionate</li>
              <li>Be present</li>
              <li>Be competent</li>
              <li>Be empowering</li>
              <li>Be a good neighbor</li>
            </ol>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NightShelter;
