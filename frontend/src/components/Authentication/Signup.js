// --------------- All Required Imports ---------------------

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

// ----------------- Sign Up Page -----------------------------

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 300,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    // --------- Checking if Password and Confirm Password filds are smae or not same ------------

    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 300,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // ------------- Data Collection ----------------------- 
      
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);

      // ------------- Message After completing ------------      
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 300,
        isClosable: true,
        position: "bottom",
      });

      // --------------- Local Storage for Picture ------------

      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 300,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };


  // ----------------- Pic Upload Work ----------------------

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 300,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);

    // ------------ If user doesnt upload an image we will add a dummy image in profile ------

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "roadsidecoder");

      // ----------- Cloudinary API to get dummy or random images --------

      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 300,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">

      {/* -------------- Name Field ------------------- */}

      <FormControl id="first-name" isRequired>
        <FormLabel color="white">Name</FormLabel>
        <Input 
          color="white"
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      {/* -------------- Email Field ------------------- */}

      <FormControl id="email" isRequired>
        <FormLabel color="white">Email Address</FormLabel>
        <Input 
          color="white"
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* -------------- Password Field ------------------- */}

      <FormControl id="password" isRequired>
        <FormLabel color="white">Password</FormLabel>
        <InputGroup size="md">

        {/* ---------   Hide Show Password Functionality -------- */}
          <Input
            color="white"
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

      {/* -------------- Confirm Pass field ------------- */}
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel color="white">Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            color="white"
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />

          {/* ------- Hide show pass functionailty --------- */}

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">

      {/* ---------------- Image Uploading field ------------- */}

        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
