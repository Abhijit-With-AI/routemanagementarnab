import React from "react";
import Header from "../components/Header";
import { Input, Center, Text, Button } from "@chakra-ui/react";
import Back from "../svg/Back";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useToast } from "@chakra-ui/react";
const API_URL = "http://localhost:5000";

export default function Newstate() {
  const navigate = useNavigate();
  const [stateCode, setStateCode] = useState("");
  const [stateName, setStateName] = useState("");
  const toast = useToast();


  useEffect(()=>{
    const auth = localStorage.getItem("token");
    if (!auth) {
      navigate("/");
    }
  },[])

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if(inputValue.length>2){
      setStateCode(stateCode);
    }
    else{
    setStateCode(inputValue);}
  };

  // console.log(stateCode);
  const handleSubmit = async () => {
try{
    const auth = localStorage.getItem("token");

    if (!auth) {
      navigate("/");
    }

    if (stateCode === "" || stateName === "") {
      toast({
        title: "Enter state name and code",
        position: "top",
        description: "please make sure you have entered state name and code",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const response = await fetch(`${API_URL}/api/v1/states/addstates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      // credentials: "include",
      body: JSON.stringify({ statecode: stateCode, statename: stateName }),
    });
    const data = await response.json();
    // console.log(data);
    if (data.success === false) {
      toast({
        title: "Some Error happened",
        position: "top",
        description: "Try after some time",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (data.success === "Already Exists") {
      toast({
        title: "This state code already exists",
        position: "top",
        description: "Enter a unique state code",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (data.success === true) {
      toast({
        title: "Successful",
        position: "top",
        description: "This state added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      return;
    }}catch(err){
      console.error("Error:", err.message);
    }
  };
  return (
    <>
      <Header></Header>
      <Center>
        <Center width={"50%"} display={"flex"} flexDirection={"column"} gap={4}>
          <Input
            type="number"
            bgColor={"white"}
            placeholder="State Code"
            marginBottom={4}
            value={stateCode}
            maxLength={2}
            pattern="[0-9]+"
            focusBorderColor="white"
            onChange={handleChange}
          ></Input>
          <Input
            type="text"
            bgColor={"white"}
            placeholder="State Name"
            marginBottom={4}
            focusBorderColor="white"
            value={stateName}
            onChange={(e) => {
              setStateName(e.target.value.toUpperCase());
            }}
          ></Input>
          <Button
            bgColor={"rgba(149, 85, 93, 1)"}
            colorScheme={"rgba(149, 85, 93, 1)"}
            color={"white"}
            borderRadius={"30.5px"}
            variant={"solid"}
            fontWeight={500}
            paddingX={"4%"}
            type="submit"
            onClick={handleSubmit}
          >
            ADD STATE
          </Button>
          <Button
            bgColor={"rgba(149, 85, 93, 1)"}
            colorScheme={"rgba(149, 85, 93, 1)"}
            color={"white"}
            borderRadius={"30.5px"}
            variant={"solid"}
            onClick={() => {
              navigate("/states");
            }}
          >
            <Back></Back>
            <Text marginLeft={2}>PREVIOUS</Text>
          </Button>
        </Center>
      </Center>
    </>
  );
}
