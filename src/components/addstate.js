import React from "react";
import Header from "../components/Header";
import { Center, Box, Text, Spacer, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Edit from "../svg/Edit";
import { useEffect, useState } from "react";

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

export default function Addstate() {
  const navigate = useNavigate();

  const [statesData, setStateData] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [statecodeEdit, setStatecodeEdit] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const allStates = async () => {
    try {
      const auth = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/v1/states/allstates`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
        // credentials: "include"
      });
      const result = await response.json();
      // console.log(result.data);
      if (!result.success) {
        localStorage.removeItem("token");
    
        navigate("/");
      }

      setStateData(result.data);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("token");

    if (!auth) {
      localStorage.removeItem("token");
      // localStorage.removeItem("statecode");
      // localStorage.removeItem("statename");
      navigate("/");
    }

    allStates();
  }, [fetchAgain]);

  const handleAddstate = () => {
    navigate("/newstates");
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

      const response = await fetch(`${API_URL}/api/v1/states/editstatename`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify({
          statecode: statecodeEdit,
          statename: nameEdit,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success === false) {
        navigate("/");
      }
      if (data.success === true) {
        toast({
          title: "Successful",
          position: "top",
          description: "This state edited successfully",
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

  const handleAddDistrict = (statecode) => {
    // const encryptedStateCode = encryptData(statecode);
    // const encryptedStateName = encryptData(statename);

    // localStorage.setItem("statename", encryptedStateName);
    // localStorage.setItem("statecode", encryptedStateCode);
    navigate(`/districts?statecode=${statecode}`);
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
          <ModalHeader>Edit State Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Edit state name"
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

      <Center>
        <Center width={"90%"} display={"flex"} flexWrap="wrap" gap={2}>
          {statesData
            ? statesData.map((state) => {
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
                    key={state.code}
                  >
                    <Spacer></Spacer>
                    <Text
                      fontSize={["10px", "13px"]}
                      fontFamily={"Barlow, sans-serif"}
                      fontWeight={700}
                      cursor={"pointer"}
                      onClick={() => {
                        handleAddDistrict(state.statecode);
                      }}
                    >
                      {state.statename}
                    </Text>
                    <Spacer></Spacer>

                    <Box
                      display={"flex"}
                      flexDir={"row-reverse"}
                      cursor={"pointer"}
                      onClick={() => {
                        setNameEdit(state.statename);
                        setStatecodeEdit(state.statecode);

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
              onClick={handleAddstate}
            >
              +
            </Text>
            <Text
              fontSize={"20px"}
              fontFamily={"Barlow, sans-serif"}
              lineHeight={"42px"}
              fontWeight={400}
            >
              Add State
            </Text>
          </Box>
        </Center>
      </Center>
    </>
  );
}
