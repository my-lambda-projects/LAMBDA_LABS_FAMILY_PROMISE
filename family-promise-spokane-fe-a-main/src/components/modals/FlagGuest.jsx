import React from 'react';
import CardShadow from '../CardShadow';
import { axiosWithAuth } from '../../api/axiosWithAuth';

const FlagGuest = ({ state, setState, setIsFlagOpen, guestId }) => {
  const handleModalClose = e => {
    setIsFlagOpen(false);
  };

  const handleChildClick = e => {
    e.persist();
    e.stopPropagation();

    axiosWithAuth().put();

    setState(prevState => {
      const data = prevState.data;

      data.map(el => {
        if (el.id === guestId) {
          el.flag_level = e.target.value;
        }
        return el;
      });

      setIsFlagOpen(false);
      return { ...prevState, data };
    });
  };
  return (
    <CardShadow onClick={handleModalClose}>
      <div className="flag-guest-container">
        <div className="flag-guest-option-container">
          <li
            value="1"
            onClick={handleChildClick}
            className="flag-guest-option"
          >
            Normal
          </li>
          <li
            value="2"
            onClick={handleChildClick}
            className="flag-guest-option"
          >
            Warning
          </li>
          <li
            value="3"
            onClick={handleChildClick}
            className="flag-guest-option"
          >
            Dangerous
          </li>
        </div>
      </div>
    </CardShadow>
  );
};

export default FlagGuest;
