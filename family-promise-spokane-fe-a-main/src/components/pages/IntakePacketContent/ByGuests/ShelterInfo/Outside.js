import React from 'react';

//Contains info Welcome to Open Doors- Outside the Shelter pg 34

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Card } from 'antd';

const Outside = () => {
  return (
    <div>
      <Card bordered={false}>
        <Form>
          <Form.Item>
            Parking Lot:
            <ul>
              <li>
                Hanging out in the parking lot or in cars is not permitted
              </li>
              <li>
                Smoking is allowed only in designated smoking area behind the
                storage container
              </li>
              <li>Please be respectful of our neighbors</li>
              <li>
                Please do not leave trash in the parking lot or clean out your
                car in the parking lot
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            Storage:
            <ul>
              <li>
                First come, first serve. -- our lockers are fairly large (about
                3’x3’)
              </li>
              <li>
                Indoor lockers are also available for storage of smaller daily
                items
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            Smoking Area:
            <ul>
              <li>
                This is the only place on Open Doors campus where smoking is
                permitted
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            Laundry and Showers:
            <ul>
              <li>
                Sign up to use laundry/shower services by using the sign-up
                sheet in the office
              </li>
              <li>
                Keep track of when your laundry needs to be moved/taken out!
              </li>
              <li>Do not leave the campus while you have laundry going</li>
            </ul>
          </Form.Item>

          <Form.Item>
            Night Shelter:
            <ul>
              <li>
                Guests will share a communal sleeping space and will sleep on
                mats on the floor - there are NO designated sleeping areas. Your
                sleeping area may change each night
              </li>
            </ul>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Outside;
