import React from 'react';
import styled from 'styled-components';

const Button = styled.input`
  width: 100%;
  height: min-content;
  color: white;
  background-color: rgb(255,90,95);
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid rgb(234,85,92);
  border-radius: 4px;
  margin-top: 24px;
  margin-right: 24px;
  padding-top: 7px;
  padding-bottom: 7px;

  &:hover {
    cursor: pointer;
  }
`;

const ButtonTagline = styled.div`
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: rgb(72,72,72);
  margin-top: 10px;
`;

const ReserveButton = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" value="Check availability" />
      <ButtonTagline>You won&#39;t be charged yet</ButtonTagline>
    </form>
  );
};

export default ReserveButton;
