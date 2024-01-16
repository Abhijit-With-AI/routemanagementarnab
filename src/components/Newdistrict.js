import React from "react";
import Header from "../components/Header";
import { Input, Center, Text, Button, Box } from "@chakra-ui/react";
import Back from "../svg/Back";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";


const API_URL = "http://localhost:5000";

export default function Newdistrict() {
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [districtName, setDistrictName] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const allDistricts = async () => {
    try {
      const auth = localStorage.getItem("token");
      // const statecode = decryptData(localStorage.getItem("statecode"));
      const statecode = params.get("statecode");
      setStateCode(statecode);

      const response = await fetch(
        `${API_URL}/api/v1/districts/alldistricts/${statecode}`,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
          // credentials: "include"
        }
      );
      const result = await response.json();
      // console.log(result)

      if (result.msg === "No district is this state is there") {
        setStateName(result.statename);
        return;
      } else {
        if (!result.success) {
          //if server down go to login page
          localStorage.removeItem("token");
          // localStorage.removeItem("statecode");
          // localStorage.removeItem("statename");
          navigate("/");
        }
      }

      setStateName(result.statename);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
 
    const statecode = params.get("statecode");
    const auth = localStorage.getItem("token");
    if (!auth) {
      navigate("/");
    }
    if (!statecode) {
      navigate("/states");
    }

    allDistricts();
  }, []);

  const handleAddistrict = async (req, res) => {
    try {
      // const statename = decryptData(localStorage.getItem("statename"));
      // const statecode = decryptData(localStorage.getItem("statecode"));
      // console.log(statecode)
      const statecode = params.get("statecode");
      const auth = localStorage.getItem("token");
      if (!auth) {
        // localStorage.removeItem("statename");
        // localStorage.removeItem("statecode");
        navigate("/");
      }
      if ( !statecode) {
        navigate("/states");
      }
      if (districtName === "") {
        toast({
          title: "Enter district name",
          position: "top",
          description: "please make sure you have entered district name ",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      const response = await fetch(`${API_URL}/api/v1/districts/adddistricts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        // credentials: "include",
        body: JSON.stringify({
          statecode: stateCode,
          districtname: districtName,
        }),
      });

      const data = await response.json();
      // console.log(data);

      if (data.msg === "This data already exists") {
        toast({
          title: "This district already exists",
          position: "top",
          description: "Enter a unique District name",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      if (data.msg === "Token is not correct") {
        navigate("/");
      }

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
          {`-: ${stateName} :-`}
        </Box>
        <Center width={"50%"} display={"flex"} flexDirection={"column"} gap={4}>
          <Input
            type="text"
            bgColor={"white"}
            placeholder="District Name"
            marginBottom={4}
            focusBorderColor="white"
            value={districtName}
            onChange={(e) => {
              setDistrictName(e.target.value.toUpperCase());
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
            onClick={handleAddistrict}
          >
            ADD DISTRICT
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
