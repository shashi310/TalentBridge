import React, { useEffect, useState } from 'react'
import  axios  from 'axios';
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
    Button
  } from "@chakra-ui/react";

  import { RouterProvider,useNavigate } from 'react-router-dom'

const CandApplied = () => {
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const loggedInUser = JSON.parse(localStorage.getItem('talent'))||""
    console.log(loggedInUser.user._id);
    const fetchData = async () => {
        try {
          const response = await  fetch(`http://localhost:8080/users/userCourse/${loggedInUser?.user?._id}`,{
            headers:{
              "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTcwMGRiOGQ3M2U5ZGNlNDMyYjA2YjAiLCJ1c2VyTmFtZSI6InNoYXNoaSIsImlhdCI6MTcwMTg0MjM2NiwiZXhwIjoxNzAyNDQ3MTY2fQ.WQuzORT71EbVKWmzj-puTZ8K1hsKJm7z-YwheCNEL9E`
            }
        });
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const responseData = await response.json();
          setData(responseData.course);
          console.log(responseData.course);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      useEffect(()=>{
        fetchData();
  },[])

//   const handleApply=(course)=>{
//     console.log(course);
//     axios.post(`http://localhost:8080/users/userCourse/65700db8d73e9dce432b06b0`)
//       .then(response => {
//         console.log('Course applied successfully');
//         // Implement further actions upon successful application
//       })
//       .catch(error => {
//         console.error('Error applying for the course:', error);
//         // Handle error scenarios
//       });
//   }

  return (
    <Box>
        <Heading color="lightblue" marginBottom="10px">Applied jobs for {loggedInUser.user.name}</Heading>
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
            {/* <Button onClick={() => handleApply(ele)}>Apply</Button> */}
          </Box>
        ))}
    </SimpleGrid>
  </Box>
  
  )
}

export default CandApplied