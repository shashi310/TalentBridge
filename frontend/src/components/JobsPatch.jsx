import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Checkbox,
  Textarea,
  Select,
  useToast
} from "@chakra-ui/react";

const JobsPatch = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('talent')) || "";

  const initialFormData = {
    job_title: "",
    description: "",
    location: "",
    experience: "",
    company_name: "",
    role_category: "",
    status: true,
    required_skills: "",
    salary: "",
    hr_Email: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

 

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const patchData = data?.find((ele) => ele._id === id);

    if (patchData) {
      setFormData({
        ...initialFormData,
        job_title: patchData.job_title || "",
        description: patchData.description || "",
        location: patchData.location || "",
        experience: patchData.experience || "",
        company_name: patchData.company_name || "",
        role_category: patchData.role_category || "",
        status: patchData.status || true,
        required_skills: patchData.required_skills || "",
        salary: patchData.salary || "",
        hr_Email: patchData.hr_Email || "",
      });
    }
  }, [data, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: value ? "" : `Please enter ${name.replace(/_/g, " ")}`,
    });
  };


  const toast = useToast();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:8080/jobs/update/${id}`, formData, {
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTcwMGRiOGQ3M2U5ZGNlNDMyYjA2YjAiLCJ1c2VyTmFtZSI6InNoYXNoaSIsImlhdCI6MTcwMTg0MjM2NiwiZXhwIjoxNzAyNDQ3MTY2fQ.WQuzORT71EbVKWmzj-puTZ8K1hsKJm7z-YwheCNEL9E`
        }
      });
      toast({
        title: "Patched successfully",
        duration: 3000,
        status: "success",
        isClosable: true,
        position: "top",
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      console.log('Form data submitted successfully:', response.data);
      // Add further actions upon successful submission
  
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle error scenarios
    }
  };




  return (
    <Box p="4" paddingLeft="5%" paddingRight="5%">
      <Heading as="h1" mb="4">
       Update the form
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4" isInvalid={!!formErrors.job_title}>
          <FormLabel>Job Title</FormLabel>
          <Input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{formErrors.job_title}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!formErrors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{formErrors.description}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!formErrors.location}>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{formErrors.location}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!formErrors.experience}>
          <FormLabel>Experience Required (min)</FormLabel>
          <Input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{formErrors.experience}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!formErrors.company_name}>
          <FormLabel>Company Name</FormLabel>
          <Input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{formErrors.company_name}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!formErrors.role_category}>
          <FormLabel>Role Category</FormLabel>
          <Input
            type="text"
            name="role_category"
            value={formData.role_category}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{formErrors.role_category}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!formErrors.required_skills}>
          <FormLabel>Required Skills</FormLabel>
          <Input
            type="text"
            name="required_skills"
            value={formData.required_skills}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{formErrors.required_skills}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!formErrors.salary}>
          <FormLabel>Salary</FormLabel>
          <Input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{formErrors.salary}</FormErrorMessage>
        </FormControl>

        <FormControl mb="4" isInvalid={!!formErrors.hr_Email}>
          <FormLabel>HR Email</FormLabel>
          <Input
            type="email"
            name="hr_Email"
            value={formData.hr_Email}
            onChange={handleInputChange}
          />
          <FormErrorMessage>{formErrors.hr_Email}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="blue" type="submit" >
          Update
        </Button>
      </form>
    </Box>
  )
}

export default JobsPatch