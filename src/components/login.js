import React from "react";
import { useState } from "react";
import { Center, Box, Text, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logo from "../svg/Logo";
import { useToast } from "@chakra-ui/react";
const API_URL = "http://localhost:5000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handlesubmit = async () => {

    try{
    if (email === "" || password === "") {
      toast({
        title: "Enter email and password",
        position: "top",
        description: "please make sure you have entered Email and password",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const response = await fetch(`${API_URL}/api/v1/users/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      
      // withCredentials:true
    });
    const data = await response.json();
    // console.log(data);
    if (data.success === false) {
      toast({
        title: "Try logging valid credentials",
        position: "top",
        description: "please make sure currect Email and password",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (data.success === true) {
      toast({
        title: "Welcome to TravelAnyWhereIndia",
        position: "top",
        description: "Don't share your loggin details",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      await localStorage.setItem("token", data.token);
      navigate("/states");
    }}
    catch(err){
      console.error("Error:", err.message);
    }
  };

  return (
    <Center display={"flex"} flexDirection={"column"} gap={4} margin={2}>
      <Logo></Logo>
      <Box width={"50%"} marginBottom={5}>
        <Text
          color={"rgba(33, 92, 126, 1)"}
          fontWeight={900}
          fontSize={["24px", "36px"]}
          fontFamily={"Barlow, sans-serif"}
          marginBottom={4}
        >
          Sign In
        </Text>
        <Input
          type="text"
          bgColor={"white"}
          placeholder="Enter email"
          marginBottom={4}
          value={email}
          focusBorderColor="white"
          onChange={(event) => setEmail(event.target.value)}
          required
        ></Input>
        <Input
          type="password"
          bgColor={"white"}
          placeholder="Enter password"
          value={password}
          focusBorderColor="white"
          onChange={(event) => setPassword(event.target.value)}
        ></Input>
      </Box>
      <Button
        bgColor={"rgba(33, 92, 126, 1)"}
        colorScheme="blue"
        type="submit"
        color={"white"}
        borderRadius={"30.5px"}
        variant={"solid"}
        onClick={handlesubmit}
      >
        SUBMIT
      </Button>
    </Center>
  );
}
