import "../Styles/Navbar.css";
import { Flex, Image, Text ,Input,Link} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// import { faBasketShoppingSimple } from "@fortawesome/free-duotone-svg-icons";


import { useState } from 'react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody,useBreakpointValue } from '@chakra-ui/react';
import { RouterProvider,useNavigate } from "react-router-dom";


const  Navbar=()=> {
  // const cartIcon = <FontAwesomeIcon size="md" icon={faBasketShoppingSimple} />
  const userIcon = <FontAwesomeIcon size="sm" icon={faUser} />;

const navigate=useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const display = useBreakpointValue({ base: 'block', md: 'none', });
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const loggedInUser = JSON.parse(localStorage.getItem('talent'))||""
  // console.log(loggedInUser?.user);

  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      gap="15px"
      h="70px"
      alignItems="center"
      bg="white"
      position="fixed"
      top="0"
      
      zIndex="999"
      boxShadow="rgba(0, 0, 0, 0.192) 0px 3px 8px"
      p={{
        base: "0 10px",
        sm: "0 20px",
        md: "0 30px",
        lg: "0 30px",
        xl: "0 30px",
      }}
    >
      <Image
        cursor="pointer"
        onClick={()=>navigate("/")}
        w="110px"
        src="https://p.kindpng.com/picc/s/465-4652155_talentbridge-talentbridge-logo-hd-png-download.png"
        alt="logo"
      />

      {loggedInUser.user.email=="admin@gmail.com" ? <Flex
        className="navbar_mid"
        gap="30px"
        justifyContent="space-between"
        alignItems="center"
        fontWeight="600"
        display={{
          base: "none",
          sm: "none",
          md: "flex",
          lg: "flex",
          xl: "flex",
        }}
      >
        <Text onClick={()=>navigate("/jobs")}>job openings</Text>
        <Text onClick={()=>navigate("/hr")}>Recruiter Dashboard</Text>
        {/* <Text>Pass</Text>
        <Text>Explore</Text> */}
      </Flex> : 
      <Flex
      className="navbar_mid"
      gap="30px"
      justifyContent="space-between"
      alignItems="center"
      fontWeight="600"
      display={{
        base: "none",
        sm: "none",
        md: "flex",
        lg: "flex",
        xl: "flex",
      }}
    >
      <Text onClick={()=>navigate("/cand")}>Applied jobs</Text>
      <Text onClick={()=>navigate("/dashboard")}>My Dashboard</Text>
      {/* <Text>Pass</Text>
      <Text>Explore</Text> */}
    </Flex>
      }

      <Flex
        className="navbar_last"
        gap="20px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Input
        w="43%"
        display={{
          base: "none",
          sm: "none",
          md: "flex",
          lg: "flex",
          xl: "flex",
        }}
        placeholder='Search ' />
        <Text>
          <span style={{ color: "rgb(235, 127, 12)" }}>📌</span>{" "}
          {loggedInUser.user.location}
        </Text>
        <Text
          display={{
            base: "none",
            sm: "block",
            md: "block",
            lg: "block",
            xl: "block",
          }}
        >
        👜
        </Text>
        {loggedInUser ? <Text
          display={{
            base: "none",
            sm: "block",
            md: "block",
            lg: "block",
            xl: "block",
          }}
          onClick={()=>navigate("/login")}
        >
          {userIcon} {loggedInUser?loggedInUser.user.name:"login"}
        </Text>:
        <Text
        display={{
          base: "none",
          sm: "block",
          md: "block",
          lg: "block",
          xl: "block",
        }}
        onClick={()=>navigate("/login")}
      >
        {userIcon} login
      </Text>
        }
        
      </Flex>

      <IconButton
        aria-label="Menu"
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        onClick={toggleMenu}
        variant="ghost"
        display={display}
      />

      <Drawer placement="left" onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
          <Image
        cursor="pointer"
        w="120px"
        src="https://djgt4pi2uqo7n.cloudfront.net/prod/assets/images/eatfit-logo-horizontal.svg"
        alt="logo"
      />

          </DrawerHeader>
          <DrawerBody>
            
            <Link>Dashboard</Link>
        <Text>jobs</Text>
        <Text>Explore</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </Flex>
  );
}


export default Navbar