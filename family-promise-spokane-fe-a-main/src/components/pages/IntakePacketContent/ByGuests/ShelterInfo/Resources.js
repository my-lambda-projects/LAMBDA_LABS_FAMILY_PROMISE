import React from 'react';

//Contains info Welcome to Open Doors- Important Reminders pg 34

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Card } from 'antd';

const Resources = () => {
  return (
    <div>
      <Card bordered={false}>
        <p>
          <strong>
            This is NOT an exhaustive list however it should help you get
            started. Ask your Case Manager for more resource suggestions if you
            need help.
          </strong>
        </p>
        <Form>
          <Form.Item>
            HFCA ASSESSMENT: All homeless families in Spokane should go to the
            HFCA and do an assessment
            <ul>
              <li>
                HFCA
                <ul>
                  <li>19 W. Pacific Ave</li>
                  <li>Hours: Monday & Wednesday from 12:30pm to 4:30pm</li>
                  <li>Tuesday & Thursday from 8:30am to 12:30pm</li>
                  <li>(Closed on Fridays)</li>
                  <li>Phone: (509) 325-5005</li>
                </ul>
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            Register with WorkSource for assistance with finding employment
            <ul>
              <li>
                WorkSource
                <ul>
                  <li>130 S. Arthur</li>
                  <li>Hours: M-F 9-5</li>
                </ul>
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            If you have a disability and are unable to work you will need to
            contact SSI to apply for benefits
            <ul>
              <li>
                Social Security Administration:
                <ul>
                  <li>714 N. Iron Bridge Way Ste 100</li>
                  <li>Phone: 800-772-1213</li>
                  <li>Walk in hours are: M,T,Th,F 9-4 and Wed 9-12</li>
                </ul>
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            If you qualify for TANF benefits you will need to contact DSHS to
            apply
            <ul>
              <li>Phone: 877-501-223</li>
              <li>
                <a
                  href="https://www.dshs.wa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dshs.wa.gov
                </a>
              </li>
            </ul>
          </Form.Item>

          <Form.Item>
            CHILDCARE: Do you need childcare for your children? If so, call DSHS
            to see if you qualify for daycare through the state or any free
            preschool programs.
            <ul>
              <li>Phone: 877-501-223</li>
            </ul>
          </Form.Item>

          <Form.Item>
            SCHOOL: All school-aged children must be enrolled in school. Contact
            the HEART program to help your child(ren) with transportation to and
            from school and other school related needs. Ask a staff member when
            a HEART representative may be visiting Open Doors.
            <ul>
              <li>Heart program</li>
              <li>Phone: 509-354-7302</li>
            </ul>
          </Form.Item>

          <Form.Item>
            HEALTH INSURANCE: Do you need health insurance for your family?
            <ul>
              <li>Apply Online:</li>
              <li>
                <a
                  href="https://www.wahealthplanfinder.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.wahealthplanfinder.org
                </a>
              </li>
            </ul>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Resources;
