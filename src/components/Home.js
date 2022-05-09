import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Home = () => {
  
  const [book, setBook] = useState();
  
  return (
    <div>
      <InputContainer>
        <Input type="text" placeholder="Search for an author..." />
      </InputContainer>
    </div>
  );
}

const InputContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const Input = styled.input`
  border: 2px solid black;
  border-radius: 7px;
  padding: 10px;
  font-size: 18px;
`;

export default Home;
