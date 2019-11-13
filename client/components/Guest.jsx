import React from 'react';
import styled from 'styled-components';

const GuestDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  padding-top: 15px;
`;

const GuestBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  height: min-content;
  border: 1px solid rgb(228, 231, 231);
  border-radius: 1px;
  font-size: 16px;
  color: rgb(72,72,72);
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Guest = () => (
  <GuestDiv>
    <div style={{ fontSize: '12px', color: 'rgb(72,72,72)', fontWeight: '600' }}>
      Guests
    </div>
    <GuestBox>
      1 guest
      <div style={{
        marginRight: '16px', fontSize: '16px', color: 'rgb(72,72,72)', fontWeight: '200',
      }}
      >
        V
      </div>
    </GuestBox>
  </GuestDiv>
);

export default Guest;
