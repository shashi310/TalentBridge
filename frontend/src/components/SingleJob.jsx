import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
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

const SingleJob = () => {

    const { id } = useParams();
    // console.log(id);

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
  


  return (
    <Box backgroundColor="aliceblue">
    <Heading color="lightblue" marginBottom="10px">Details for {formData.job_title}' post </Heading>
  
    
        <Box className="card_item" key={formData._id} p="20px" borderRadius="10px">
           <Heading as='h2' size='lg'>{formData.job_title}</Heading>
          <Text>
            <strong>Description:</strong> {formData.description}
          </Text>
          <Text>
            <strong>Location:</strong> {formData.location}
          </Text>
          <Text>
            <strong>Experience:</strong> {formData.experience}
          </Text>
          <Text>
            <strong>Company Name:</strong> {formData.company_name}
          </Text>
          <Text>
            <strong>Role Category:</strong> {formData.role_category}
          </Text>
          <Text>
          <strong>Status:</strong> {formData.status?"open":"closed"}
          </Text>
          <Text>
            <strong>Required Skills:</strong> {formData.required_skills}
          </Text>
          <Text>
            <strong>Salary:</strong> {formData.salary}
          </Text>
          <Text>
            <strong>HR Email:</strong> {formData.hr_Email}
          </Text>
          
        </Box>
    
    <Text>Applications</Text>
    
 
</Box>
  )
}

export default SingleJob