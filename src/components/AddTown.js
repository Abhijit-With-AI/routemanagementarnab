import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Center, Box, Text, Spacer, Button } from "@chakra-ui/react";
import Back from "../svg/Back";
import Edit from "../svg/Edit";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";

const API_URL = "http://localhost:5000";

export default function AddTown() {
  const navigate = useNavigate();
  const [districtcode, setDistrictCode] = useState("");
  const [statename, setStateName] = useState("");
  const [statecode, setStateCode] = useState("");
  const [districtname, setDistrictName] = useState("");
  const [districtdata, setDistrictData] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [towncodeEdit, setTowncodeEdit] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddTown = () => {
    const auth = localStorage.getItem("token");
    const code = params.get("districtcode");
    if (!auth) {
      localStorage.removeItem("token");
      navigate("/");
    }
    if (!code) {
      navigate("/states");
    }

    navigate(`/newtowns?districtcode=${code}`);
  };

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
        navigate("/states");
      }

      setDistrictData(result.data);
      setDistrictName(result.districtname);
      setStateName(result.statename);
      setStateCode(result.statecode);
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
  }, [fetchAgain]);

  const handleprevious = () => {
    navigate(`/districts?statecode=${statecode}`);
  };

  const handleEditSubmit = async () => {
    try {
      const auth = localStorage.getItem("token");

      if (!auth) {
        // localStorage.removeItem("statename");
        // localStorage.removeItem("statecode");
        navigate("/");
      }
      if (nameEdit.trim() === "") {
        toast({
          title: "Enter state name",
          position: "top",
          description: "please make sure you have entered state name ",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      const response = await fetch(`${API_URL}/api/v1/towns/edittownname`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        // credentials: "include",
        body: JSON.stringify({
          towncode: towncodeEdit,
          townname: nameEdit,
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
          description: "This town edited successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
      onClose();
      setFetchAgain(!fetchAgain);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };
  const editchangehandler = (event) => {
    setNameEdit(event.target.value.toUpperCase());
  };

  return (
    <>
      <Header></Header>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Town Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Edit town name"
              value={nameEdit}
              onChange={editchangehandler}
            />
          </ModalBody>
          <Center margin={4}>
            <Button colorScheme="blue" onClick={handleEditSubmit}>
              Save
            </Button>
          </Center>
        </ModalContent>
      </Modal>
      ;
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
        <Center width={"90%"} display={"flex"} flexWrap="wrap" gap={2}>
          {districtdata
            ? districtdata.map((towns) => {
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
                    key={towns.code}
                  >
                    <Spacer></Spacer>
                    <Text
                      fontSize={["10px", "13px"]}
                      fontFamily={"Barlow, sans-serif"}
                      fontWeight={700}
                      cursor={"pointer"}
                    >
                      {towns.townname}
                    </Text>
                    <Spacer></Spacer>
                    <Box
                      display={"flex"}
                      flexDir={"row-reverse"}
                      cursor={"pointer"}
                      onClick={() => {
                        setNameEdit(towns.townname);
                        setTowncodeEdit(towns.towncode);
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
              onClick={handleAddTown}
            >
              +
            </Text>
            <Text
              fontSize={"20px"}
              fontFamily={"Barlow, sans-serif"}
              lineHeight={"42px"}
              fontWeight={400}
            >
              Add Town
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
          onClick={handleprevious}
        >
          <Back></Back>
          <Text marginLeft={2}>PREVIOUS</Text>
        </Button>
      </Center>
    </>
  );
}
