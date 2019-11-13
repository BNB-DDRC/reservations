import React from 'react';
import Calendar from './Calendar';
import styled from 'styled-components';

const DateDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  `;

const DateBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: min-content;
  border: 1px solid rgb(228, 231, 231);
  border-radius: 1px;
  font-size: 16px;
`;
// height for DateBox was at 40px
// width was 324px
const CheckInOut = styled.div`
  display: inline;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 5px;
  width: 100%;
  height: max-content;
  color: rgb(143,143,143);

  &:hover {
    cursor: pointer;
  }
`;

class Date extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkIn: false,
      checkOut: false,
    };

    this.showHideCalendarCheckIn = this.showHideCalendarCheckIn.bind(this);
    this.showHideCalendarCheckOut = this.showHideCalendarCheckOut.bind(this);
    this.hideCalendar = this.hideCalendar.bind(this);
    document.body.addEventListener('click', this.hideCalendar);
  }

  hideCalendar({ target: { classList } }) {
    const classListArray = [...classList];
    // console.dir(classListArray);
    const isClickOffCalendar = (
      !(classListArray.includes('check-in-box')
        || classListArray.includes('check-out-box')
        || classListArray.includes('check-in-out-calendar'))
    );
    if (isClickOffCalendar) {
      const newState = { checkIn: false, checkOut: false };
      this.setState(newState, () => {
        const checkInBox = document.getElementsByClassName('check-in-box')[0];
        const checkOutBox = document.getElementsByClassName('check-out-box')[0];
        checkInBox.setAttribute('style', 'none');
        checkOutBox.setAttribute('style', 'none');
      });
    }
  }

  showHideCalendarCheckIn() {
    const { checkIn, checkOut } = this.state;
    const newState = { checkIn: !checkIn, checkOut };
    if (!checkIn) newState.checkOut = checkIn;
    this.setState(newState, () => {
      const checkInBox = document.getElementsByClassName('check-in-box')[0];
      const checkOutBox = document.getElementsByClassName('check-out-box')[0];
      const newStyle = 'background-color: rgb(153,237,230); border-radius: 3px; color: rgb(45,151,159);';
      checkInBox.setAttribute('style', !checkIn ? newStyle : 'none');
      checkOutBox.setAttribute('style', 'none');
    });
  }

  showHideCalendarCheckOut() {
    const { checkIn, checkOut } = this.state;
    const newState = { checkIn, checkOut: !checkOut };
    if (!checkOut) newState.checkIn = checkOut;
    this.setState(newState, () => {
      const checkInBox = document.getElementsByClassName('check-in-box')[0];
      const checkOutBox = document.getElementsByClassName('check-out-box')[0];
      const newStyle = 'background-color: rgb(153,237,230); border-radius: 3px; color: rgb(45,151,159);';
      checkInBox.setAttribute('style', 'none');
      checkOutBox.setAttribute('style', !checkOut ? newStyle : 'none');
    });
  }

  render() {
    const { checkIn, checkOut } = this.state;

    return (
      <DateDiv onClick={this.hideCalendar}>
        <div style={{ fontSize: '12px', color: 'rgb(72,72,72)', fontWeight: '600' }}>
          Dates
        </div>
        <DateBox>
          <CheckInOut onClick={this.showHideCalendarCheckIn} className="check-in-box">Check-in</CheckInOut>
          ⟶
          <CheckInOut onClick={this.showHideCalendarCheckOut} className="check-out-box">Checkout</CheckInOut>
          {checkIn || checkOut ? <Calendar className="check-in-out-calendar" /> : <div />}
        </DateBox>
      </DateDiv>
    );
  }
}

export default Date;
