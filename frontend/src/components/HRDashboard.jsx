import React, { useState } from "react";
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
} from "@chakra-ui/react";

const HRDashboard = () => {

  const loggedInUser = JSON.parse(localStorage.getItem('talent'))||""
  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = `Please enter ${key.replace(/_/g, " ")}`;
      }
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      // POST request to dummy endpoint (change URL as needed)
      axios
        .post("http://localhost:8080/jobs/add", formData, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTcwMGRiOGQ3M2U5ZGNlNDMyYjA2YjAiLCJ1c2VyTmFtZSI6InNoYXNoaSIsImlhdCI6MTcwMTg0MjM2NiwiZXhwIjoxNzAyNDQ3MTY2fQ.WQuzORT71EbVKWmzj-puTZ8K1hsKJm7z-YwheCNEL9E`,
          },
        })
        .then((response) => {
          console.log("Data submitted successfully:", response.data);
          // Perform further actions upon successful submission
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
          // Handle error scenarios
        });
    }
  };

  return (
    <Box p="4" paddingLeft="5%" paddingRight="5%">
      <Heading as="h1" mb="4">
       Add Job Opening
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

        <Button colorScheme="blue" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default HRDashboard;
