import React from "react";
import Header from "../components/Header";
import { Input, Center, Text, Button, Box } from "@chakra-ui/react";
import Back from "../svg/Back";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Checkbox } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
const API_URL = "http://localhost:5000";

export default function Newtown() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [statename, setStateName] = useState("");
  const [districtname, setDistrictName] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [stateCode, setStatecode] = useState("");
  const [input, setInput] = useState("");
  const toast = useToast();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const alltowns = async () => {
    try {
      const auth = localStorage.getItem("token");
      const code = params.get("districtcode");
      const response = await fetch(`${API_URL}/api/v1/towns/alltowns/${code}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
        // credentials: "include"
      });
      const result = await response.json();

      if (result.success === false) {
        navigate("/districts");
      }
      setDistrictName(result.districtname);
      setStateName(result.statename);
      setStatecode(result.statecode);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (!auth) {
      navigate("/");
    }

    const code = params.get("districtcode");

    if (!code) {
      navigate("/states");
    }
    setDistrictCode(code);
    alltowns();
  }, []);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const handleInput = (e) => {
    setInput(e.target.value.toUpperCase());
  };

  const handlesubmit = async () => {
    try {
      if (input.trim() === "") {
        toast({
          title: "Enter town name",
          position: "top",
          description: "please make sure you have entered town name ",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      const auth = localStorage.getItem("token");
      if (!auth) {
        navigate("/");
      }

      const response = await fetch(`${API_URL}/api/v1/towns/addtowns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${auth}`,
        },
        credentials: "include",
        body: JSON.stringify({
          statecode: stateCode,
          districtcode: districtCode,
          townname: input,
          ismaintown: isChecked,
        }),
      });

      // console.log(stateCode, input, districtCode, isChecked);

      const result = await response.json();
      // console.log(result);

      if (result.msg === "This data already exists") {
        toast({
          title: "This Town already exists",
          position: "top",
          description: "Enter a unique Town",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      if (result.msg === "Token is not correct") {
        navigate("/");
      }

      if (result.success === false) {
        navigate("/states");
        return;
      }

      if (result.success === true) {
        toast({
          title: "Successful",
          position: "top",
          description: "This town added successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <>
      <Header></Header>
      <Center display={"flex"} flexDirection={"column"} gap={4}>
        <Box
          bgColor={"rgba(149, 85, 93, 1)"}
          color={"rgba(245, 240, 225, 1)"}
          width={["60%", "60%", "40%"]}
          textAlign={"center"}
          borderRadius={"20px"}
          fontFamily={"Barlow, sans-serif"}
          fontWeight={600}
          fontSize={["15px", "15px", "20px", "24px"]}
          paddingY={1}
          marginBottom={"4%"}
        >
          {`-: ${districtname} , ${statename} :-`}
        </Box>
        <Center width={"50%"} display={"flex"} flexDirection={"column"} gap={4}>
          <Input
            type="text"
            bgColor={"white"}
            placeholder="Town Name"
            marginBottom={4}
            focusBorderColor="white"
            value={input}
            onChange={handleInput}
          ></Input>
          <Checkbox
            colorScheme="green"
            size={"lg"}
            borderColor={"gray"}
            fontSize={"25px"}
            fontWeight={400}
            onChange={handleChange}
            value={isChecked}
          >
            This city is main city
          </Checkbox>
          <Button
            bgColor={"rgba(149, 85, 93, 1)"}
            colorScheme={"rgba(149, 85, 93, 1)"}
            color={"white"}
            borderRadius={"30.5px"}
            variant={"solid"}
            fontWeight={500}
            paddingX={"4%"}
            type="submit"
            onClick={handlesubmit}
          >
            ADD TOWN
          </Button>
          <Button
            bgColor={"rgba(149, 85, 93, 1)"}
            colorScheme={"rgba(149, 85, 93, 1)"}
            color={"white"}
            borderRadius={"30.5px"}
            variant={"solid"}
            onClick={() => {
              navigate(`/districts?statecode=${stateCode}`);
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
