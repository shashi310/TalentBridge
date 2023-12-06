import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Select,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
  
} from "@chakra-ui/react";
import { FaUserAlt, FaLock ,FaHome } from "react-icons/fa";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaHome = chakra(FaHome);

const Signup = () => {
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const [email,setEmail]=useState("");
  const[password,setPassword] = useState("")
  const[name,setName]=useState("")
  const[location,setLocation] = useState("")
  const [skill,setSkill] = useState("")
  const [bio,setBio] = useState("")
  const [status,setStatus] = useState("")


  const toast = useToast();
const handleLogin= async (e) =>{
  e.preventDefault()
  const obj={
    name,
    email,
    password,
    status,
    location,
    skill,
    bio,
   
  }
  console.log(obj);

  try {
    const response = await axios.post('http://localhost:8080/users/register', obj);
   console.log(response.data);
   toast({
    title: "signup successfully",
    duration: 3000,
    status: "success",
    isClosable: true,
    position: "top",
  });
   navigate("/login")
  } catch (error) {
    console.log(error.message);
  }
}

  return (
    <>
    
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      paddingBottom="40px"
      paddingTop="20px"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Job Seeker Registration</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
      <Select placeholder='Select Work Status' onChange={(e)=>setStatus(e.target.value)}>
        <option value='fresher'>Fresher</option>
        <option value='experienced'>Experienced</option>

      </Select>
              </FormControl>

                <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input  value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                  value={password} onChange={(e)=>setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaHome color="gray.300" />}
                  />
                  <Input type="text" placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" placeholder="Skills or Education" value={skill} onChange={(e)=>setSkill(e.target.value)}/>
                </InputGroup>
              </FormControl><FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" placeholder="Bio" value={bio} onChange={(e)=>setBio(e.target.value)}/>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={(e)=>handleLogin(e)}
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Alreay Joined?{" "}
        <Link to="/login" style={{ color: 'teal' }}>
  Login
</Link>
      </Box>
    </Flex>
    </>
  );
};

export default Signup;
