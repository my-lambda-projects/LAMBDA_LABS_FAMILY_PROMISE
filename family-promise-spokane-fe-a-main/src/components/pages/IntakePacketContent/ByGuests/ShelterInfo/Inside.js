import React from 'react';

//Contains info Welcome to Open Doors- Inside the Shelter pg 33

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Card } from 'antd';

const Inside = () => {
  return (
    <div>
      <Card bordered={false}>
        <Form>
          <Form.Item>
            Office:
            <ul>
              <li>
                At all times, at least one Open Doors Supervisor will be at the
                shelter, along with other interns and volunteers. Please do not
                hesitate to approach them with questions or concerns -- our
                staff is here for you!
              </li>
              <li>
                You will find the daily sign-in sheet, as well as sign-ups for
                kitchen, shower/laundry services and nightly chores here at the
                office
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            Quiet Area:
            <ul>
              <li>
                Computers: first priority for adults seeking housing,
                employment, etc., No children are allowed on the computers
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            Dining Room:
            <ul>
              <li>
                Please keep this space tidy (clear dishes, wipe tables after
                using them, etc.)
              </li>
              <li>
                Check out our bulletin board for information about local
                resources and programs
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            Kitchen:
            <ul>
              <li>Closed for the night at 6pm</li>
              <li>Come between 4 and 5pm if you hope to cook dinner</li>
              <li>
                Dry Goods:
                <ul>
                  <li>
                    Label personal items and keep them in family bin on shelf
                  </li>
                  <li>
                    Bread and other items labeled “OD” are available to all
                    guests
                  </li>
                </ul>
              </li>
              <li>
                Walk In Fridge:
                <ul>
                  <li>Label personal items and keep them properly covered</li>
                  <li>
                    Open Doors food is available to all guests however do not
                    take OD items and put them in your locker
                  </li>
                </ul>
              </li>
              <li>
                Freezers:
                <ul>
                  <li>
                    Freezer in the industrial kitchen: Open Doors food is
                    available to all guests - Please ask a supervisor to access
                    this freezer -- all items must be labeled!
                  </li>
                </ul>
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            Supply Room:
            <ul>
              <li>
                Extra supplies (toothbrushes, shampoo, towels, diapers, etc.)
                Please ask a staff member before taking any of these supplies
              </li>
              <li>
                Cleaning supplies -- ask staff for access during chore time
              </li>
              <li>
                Open Doors is not responsible for stolen food and food left for
                more than 24 hours unattended on the premises may be discarded.
                You are encouraged to buy a lock for your food lockers.
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            TV Area and Kids' Corner:
            <ul>
              <li>Child appropriate TV only</li>
              <li>
                Kids watching TV or playing with toys must be in eyesight of a
                parent at all times
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            The Cage:
            <ul>
              <li>
                All coats, backpacks and any other belongings not in outside
                lockers need to be stored in the indoor lockers
              </li>
            </ul>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Inside;
