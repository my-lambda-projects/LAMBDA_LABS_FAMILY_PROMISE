import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
// ant design
import { Progress } from 'antd';
//redux
import { connect, useSelector } from 'react-redux';
import actions from '../../../state/actions/families';
// utils
import { returnPercentComplete } from '../../../utils/percentComplete';
import _ from 'underscore';

const GuestAnalytics = ({
  loading,
  household,
  fetchHousehold,
  fetchFamily,
  family,
}) => {
  const user = useSelector(state => state.CURRENT_USER);
  // const family = useSelector(state => state.FAMILY);
  const [percentComplete, setPercentComplete] = useState(0);
  const [missingFields, setMissingFields] = useState([]);

  const fetchFamilyHousehold = async () => {
    try {
      const res = await axiosWithAuth().get(`/users/${user.id}/family`);
      const family = res.data.family;
      fetchHousehold(family.id);
    } catch (error) {
      alert('error');
    }
  };

  useEffect(() => {
    fetchFamilyHousehold();

    // calculates a percentage of complete values
    const percent = returnPercentComplete(household);
    setPercentComplete(percent[0]);
    setMissingFields(percent[1]);
    // eslint-disable-next-line
  }, []);
  // fetch household data object

  const formatMissingData = () => {
    // counts all missing fields using underscore countby library to cound a modified key value
    // example modified values changes list_indefinite_conditions to "List indefinite conditions"
    // countBy method return an object of keys and their count
    const countMissing = _.countBy(missingFields, function (field) {
      let modified = field;
      return (
        field.toString().charAt(0).toUpperCase() +
        modified.slice(1).split('_').join(' ')
      );
    });
    let modifiedStringValues = [];

    // builds an array of messages to render
    for (let value in countMissing) {
      let string = `${value} missing from ${countMissing[value]} family member(s). `;
      modifiedStringValues.push(string);
    }

    return modifiedStringValues;
  };

  return (
    <div className="analytics-container">
      <div className="progess-container">
        <div className="progress-section">
          <Progress type="circle" percent={percentComplete} />
          <p></p>
          <h4>
            You have completed {percentComplete}% of your household's intake
            form!
          </h4>
        </div>
        <div className="missing-info-section">
          <h2>Missing household information: </h2>
          {formatMissingData().map((msg, idx) => {
            return (
              <ul key={idx}>
                <li key={idx}>{msg}</li>
              </ul>
            );
          })}
        </div>
      </div>
      <div />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    household: state.HOUSEHOLD,
    loading: state.LOADING,
    family: state.FAMILY,
  };
}

const mapDispatchToProps = {
  fetchHousehold: actions.fetchHousehold,
  fetchFamily: actions.fetchFamily,
};
export default connect(mapStateToProps, mapDispatchToProps)(GuestAnalytics);
