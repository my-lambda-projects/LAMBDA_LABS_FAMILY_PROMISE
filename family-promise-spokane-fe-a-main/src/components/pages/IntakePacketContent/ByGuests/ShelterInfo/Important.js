import React from 'react';

//Contains info Welcome to Open Doors- Important Reminders pg 34

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Card } from 'antd';

const Important = () => {
  return (
    <div>
      <Card bordered={false}>
        <Form>
          <strong>
            <u>Shelter Safety Protocol:</u>
          </strong>

          <Form.Item>
            <ul>
              <li>
                <strong>
                  If you hear a staff member or volunteer blow a whistle, there
                  is a safety emergency in the shelter
                </strong>
              </li>
              <li>
                If this occurs, all guests must respond by taking the following
                steps:
              </li>
              <ol>
                <li>Find your family members</li>
                <li>
                  Clear the area: stand against the wall or move to a safe place
                  away from the situation
                </li>
              </ol>
              <li>
                <strong>
                  <u>DO NOT </u>
                </strong>
                INVOLVE YOURSELF IN THE SITUATION UNLESS ASKED TO DO SO BY A
                STAFF MEMBER. FOLLOW ALL STAFF INSTRUCTIONS IMMEDIATELY.
              </li>
            </ul>
          </Form.Item>

          <strong>Check-In Times:</strong>
          <Form.Item>
            6pm Night Shelter check-in:
            <ul>
              <li>
                Your family must be signed in and present at the Shelter at this
                time to be eligible for housing in the Night Shelter - Turn in
                your completed daily goal sheet to the Supervisor
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            6pm Chore check-in:
            <ul>
              <li>
                We ask that all guests who plan to use our Night Shelter
                services sign up for an evening chore and are present on time to
                complete it
              </li>
            </ul>
          </Form.Item>

          <p>
            <strong>
              *If your family is unable to arrive on time for check-in for a
              medical or work-related reason, you must provide some form of
              documented proof upon arrival
            </strong>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default Important;
