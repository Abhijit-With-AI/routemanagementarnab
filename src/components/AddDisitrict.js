import React, { useEffect } from "react";
import Header from "../components/Header";
import { Center, Box, Text, Spacer, Button } from "@chakra-ui/react";
import Back from "../svg/Back";
import Edit from "../svg/Edit";
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Input,
  
} from "@chakra-ui/react";

const API_URL = "http://localhost:5000";

export default function AddDisitrict() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [districtcodeEdit, setDistrictcodeEdit] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);
  const toast = useToast();
  const [districtData, setDistrictData] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const allDistricts = async () => {

    try{
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
      setStateName(result.statename)
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
    setDistrictData(result.data);
  
    setStateName(result.statename)}
    catch(err){
      console.error("Error:", err.message);
    }
  };


  const editchangehandler = (event) => {
    setNameEdit(event.target.value.toUpperCase());
  };

  useEffect(() => {
    // const statename = decryptData(localStorage.getItem("statename"));
    // setStateName(statename);
    const statecode = params.get("statecode");
    setStateCode(statecode);
    // const statecode = decryptData(localStorage.getItem("statecode"));
    // setStateCode(statecode);
    const auth = localStorage.getItem("token");
    if (!auth) {
      localStorage.removeItem("token");
      // localStorage.removeItem("statecode");
      // localStorage.removeItem("statename");
      navigate("/");
    }
    if ( !statecode) {
      navigate("/states");
    }

    allDistricts();
  }, [fetchAgain]);


  const handleEditSubmit = async () => {
 
    try{
    const auth = localStorage.getItem("token");

    if (!auth) {
      // localStorage.removeItem("statename");
      // localStorage.removeItem("statecode");
      navigate("/");
    }
    if (nameEdit.trim() === "") {
      toast({
        title: "Enter District name",
        position: "top",
        description: "please make sure you have entered District name ",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const response = await fetch(`${API_URL}/api/v1/districts/editdistrictname`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      // credentials: "include",
      body: JSON.stringify({
        districtcode: districtcodeEdit,
        districtname: nameEdit,
      }),
    });

    const data = await response.json();
    if (data.success === false) {
      navigate("/");
    }
    if (data.success === true) {
      toast({
        title: "Successful",
        position: "top",
        description: "This district edited successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    onClose();
    setFetchAgain(!fetchAgain);}
    catch(err){
      console.error("Error:", err.message);
    }
  };





  const handleAddDistrict = () => {

    const auth = localStorage.getItem("token");
    const code = params.get("statecode");
    if(!auth){
      localStorage.removeItem('token');
      navigate('/')
    }
    if (!code) {
      navigate("/states");
    }


    navigate(`/newdistricts?statecode=${code}`);
  };
  const handleTowns = (distcode) => {
    navigate(`/towns?districtcode=${distcode}`);
  };

  return (
    <>
      <Header></Header>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit District Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Edit district name"
              value={nameEdit}
              onChange={editchangehandler}
            />
          </ModalBody>
          <Center margin={4}>
            <Button
              colorScheme="blue"
              onClick={handleEditSubmit}
            >
              Save
            </Button>
          </Center>
        </ModalContent>
      </Modal>

      <Center display={"flex"} flexDirection={"column"} gap={4} >
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

        <Center width={"90%"} display={"flex"} flexWrap="wrap" gap={2}>
          {districtData
            ? districtData.map((district) => {
                return (
                  <Box
                    bgColor={"white"}
                    width={["40%", "30%", "20%", "10%"]}
                    height={"120px"}
                    textAlign={"center"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    borderRadius={"25px"}
                    padding={2}
                    overflow={"hidden"}
                    key={district.districtcode}
                  >
                    <Spacer></Spacer>
                    <Text
                      fontSize={["10px", "13px"]}
                      fontFamily={"Barlow, sans-serif"}
                      fontWeight={700}
                      cursor={"pointer"}
                      onClick={()=>{handleTowns(district.districtcode)}}
                    >
                      {district.districtname}
                    </Text>
                    <Spacer></Spacer>
                    <Box
                      display={"flex"}
                      flexDir={"row-reverse"}
                      cursor={"pointer"}
                      onClick={() => {
                        setNameEdit(district.districtname);
                        setDistrictcodeEdit(district.districtcode);

                        onOpen(); // Open the modal
                      }}
                    >
                      <Edit></Edit>
                    </Box>
                  </Box>
                );
              })
            : ""}
          <Box
            bgColor={"white"}
            width={["40%", "30%", "20%", "10%"]}
            height={"120px"}
            textAlign={"center"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            borderRadius={"25px"}
            padding={2}
          >
            <Text
              fontSize={"24px"}
              fontFamily={"Barlow, sans-serif"}
              lineHeight={"28.8px"}
              fontWeight={500}
              cursor={"pointer"}
              onClick={handleAddDistrict}
            >
              +
            </Text>
            <Text
              fontSize={"20px"}
              fontFamily={"Barlow, sans-serif"}
              lineHeight={"42px"}
              fontWeight={400}
            >
              Add District
            </Text>
          </Box>
        </Center>
        <Button
          bgColor={"rgba(149, 85, 93, 1)"}
          colorScheme={"rgba(149, 85, 93, 1)"}
          color={"white"}
          borderRadius={"30.5px"}
          variant={"solid"}
          marginTop={4}
          onClick={() => {
            navigate("/states");
          }}
        >
          <Back></Back>
          <Text marginLeft={2}>PREVIOUS</Text>
        </Button>
      </Center>
    </>
  );
}
