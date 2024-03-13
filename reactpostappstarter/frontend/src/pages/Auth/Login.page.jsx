import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';

import classes from './AuthenticationTitle.module.css';
import React from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(e.target.getInputProps);
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* <form onSubmit={onLogin}> */}
        <div>
          <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
              Welcome back!
            </Title>
            <Paper component="form" withBorder shadow="md" p={30} mt={30} radius="md" onSubmit={onLogin}>
              <TextInput name ='email' label="Email" placeholder="Username" required />
              <PasswordInput name ='password' label="Password" placeholder="Password" required mt="md" />
              <Button type='submit' fullWidth mt="xl">
                Sign in
              </Button>
            </Paper>
          </Container>
          {authLoading ? <h2>Loading...</h2> : null}
        </div>
      {/* </form> */}
    </div>
  );
};

export default LoginPage;
