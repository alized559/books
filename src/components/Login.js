import React, { useState } from 'react';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';
import ClientId from '../common/Client';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  function Submit() {
    navigate("/home");
  }

  return (
    <LoginContainer>
      <Title>Hello. Login using Google Account To Continue</Title>
      <Submit navigate={navigate} />
      <GoogleLogin
        clientId={ClientId}
        onSuccess={Submit}
        buttonText="Sign in with Google"
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: gray;
`;

export default Login;
