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
    Button,
    useToast
  } from "@chakra-ui/react";

  import { RouterProvider,useNavigate } from 'react-router-dom'

const CandidateDashBoard = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('talent'))||""
  // console.log(loggedInUser.user);
const user=loggedInUser?.user
    const navigate=useNavigate()
    const [data,setData]=useState([])



    const toast = useToast();

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

  const handleApply=(course)=>{
    console.log(course);
    // axios.post(`http://localhost:8080/users/addCourse/${user._id}`, { courseId: course })
    //   .then(response => {
    //     console.log('job applied successfully');
    //     // Implement further actions upon successful application
    //     toast({
    //       title: "job applied successfully",
    //       duration: 3000,
    //       status: "success",
    //       isClosable: true,
    //       position: "top",
    //     });
    //   })
    //   .catch(error => {
    //     console.error('Error applying for the course:', error);
    //     // Handle error scenarios
    //   });



      axios.post(`http://localhost:8080/jobs/addUser/${course._id}`, { userID: user._id })
      .then(response => {
        console.log('job applied successfully');
        // Implement further actions upon successful application
        toast({
          title: "job applied successfully",
          duration: 3000,
          status: "success",
          isClosable: true,
          position: "top",
        });
      })
      .catch(error => {
        console.error('Error applying for the course:', error);
        // Handle error scenarios
      });

  }

  return (
    <Box backgroundColor="aliceblue">
      <Heading color="lightblue" marginBottom="10px">Available Openings for {loggedInUser.user.name}</Heading>
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
            <Button marginTop="5px" colorScheme='teal' onClick={() => handleApply(ele)}>Apply Now</Button>
          </Box>
        ))}
    </SimpleGrid>
  </Box>
  
  )
}

export default CandidateDashBoard