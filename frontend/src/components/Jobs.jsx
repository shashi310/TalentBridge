import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../Styles/MidContent.css";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
    Image,
    SimpleGrid,
    Text,
    Button,
    useToast
  } from "@chakra-ui/react";

  import { RouterProvider,useNavigate } from 'react-router-dom'

const Jobs = () => {
    const [data,setData]=useState([])
    const loggedInUser = JSON.parse(localStorage.getItem('talent'))||""
    // console.log(loggedInUser);
    const fetchData = async () => {
        try {
          const response = await  fetch("http://localhost:8080/jobs",{
            headers:{
              "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTcwMGRiOGQ3M2U5ZGNlNDMyYjA2YjAiLCJ1c2VyTmFtZSI6InNoYXNoaSIsImlhdCI6MTcwMTg0MjM2NiwiZXhwIjoxNzAyNDQ3MTY2fQ.WQuzORT71EbVKWmzj-puTZ8K1hsKJm7z-YwheCNEL9E`
            }
        });
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const responseData = await response.json();
          setData(responseData.Courses);
        //   console.log(responseData.Courses);
        
      
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      useEffect(()=>{
        fetchData();
  },[])


  const toast = useToast();
const handleDelete = (ele) => {
    const id = ele._id;
  
    // Token for authorization
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTcwMGRiOGQ3M2U5ZGNlNDMyYjA2YjAiLCJ1c2VyTmFtZSI6InNoYXNoaSIsImlhdCI6MTcwMTg0MjM2NiwiZXhwIjoxNzAyNDQ3MTY2fQ.WQuzORT71EbVKWmzj-puTZ8K1hsKJm7z-YwheCNEL9E"; 
  
    // Axios delete request with headers for authorization
    axios.delete(`http://localhost:8080/jobs/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`, // 
      },
    })
      .then((response) => {
        console.log(`Item with ID ${id} deleted successfully`, response.data);
        // Perform further actions upon successful deletion
        toast({
            title: "Deleted successfully",
            duration: 3000,
            status: "success",
            isClosable: true,
            position: "top",
          });
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        // Handle error scenarios
      });
  };

  return (
    <Box backgroundColor="aliceblue">
    <Heading color="lightblue" marginBottom="10px">Available Openings </Heading>
  <SimpleGrid
    w="100%"
    gap="35px"
    columns={{ base: "1", sm: "2", md: "3", lg: "3", xl: "3" }}
  >
    {data.length > 0 &&
      data.map((ele, index) => (
        <Box className="card_item" key={ele._id} p="20px" borderRadius="10px">
           <Heading as='h2' size='lg'>{ele.job_title}</Heading>
          <Text>
            <strong>Description:</strong> {ele.description}
          </Text>
          <Text>
            <strong>Location:</strong> {ele.location}
          </Text>
          <Text>
            <strong>Experience:</strong> {ele.experience}
          </Text>
          <Text>
            <strong>Company Name:</strong> {ele.company_name}
          </Text>
          <Text>
            <strong>Role Category:</strong> {ele.role_category}
          </Text>
          <Text>
          <strong>Status:</strong> {ele.status?"open":"closed"}
          </Text>
          <Text>
            <strong>Required Skills:</strong> {ele.required_skills}
          </Text>
          <Text>
            <strong>Salary:</strong> {ele.salary}
          </Text>
          <Text>
            <strong>HR Email:</strong> {ele.hr_Email}
          </Text>
          {<Link to={`/jobs/single/${ele._id}`}><Button marginTop="5px" marginLeft="5px" colorScheme='teal'>Details</Button></Link>}
          {<Link to={`/jobs/update/${ele._id}`}><Button marginTop="5px" marginLeft="5px" colorScheme='teal'>Edit</Button></Link>}
          
          <Button marginTop="5px" marginLeft="5px" colorScheme='teal' onClick={() => handleDelete(ele)}>Delete</Button>
        </Box>
      ))}
  </SimpleGrid>
</Box>
  )
}

export default Jobs