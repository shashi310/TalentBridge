import React from 'react'
import { Select,Box ,Image,SimpleGrid,HStack,Text,Heading,Link,Button} from '@chakra-ui/react'


import { RouterProvider,useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate=useNavigate()
  return (
   <Box>
{/* <Box boxSize='3xl' textAlign="center" ml="15%">
  <Image w="100%" alignItems="center" src='https://unblast.com/wp-content/uploads/2020/05/Job-Interview-Illustration.jpg' alt='Dan Abramov' />
</Box> */}

<Heading as="h1" size="xl" mb={4}>
          Welcome to Talent Bridge
        </Heading>

        {/* Subheading */}
        <Text fontSize="lg" color="gray.500" mb={8}>
          Your Premier Job Search Platform
        </Text>

        {/* Call-to-Action Button */}
        <Link to="/login">
          <Button colorScheme="teal" size="lg" onClick={()=>navigate("/login")}>
            Explore Jobs
          </Button>
        </Link>



<SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={12}>
        <Box>
          <HStack align="start" spacing={4}>
            <Box>
            <Heading as="h2" size="lg" mb={4}>
              Why Talent Bridge?
            </Heading>
            <Text>
              Discover a world of exciting career opportunities tailored to your
              skills and preferences.
            </Text>
            </Box>
            <Image src="https://www.insidehighered.com/sites/default/files/media/70123913_thumbnail.jpg" boxSize="200px" borderRadius="md" />
          </HStack>
        </Box>

        <Box>
          <HStack align="start" spacing={4}>
            <Box>
            <Heading as="h2" size="lg" mb={4}>
              How It Works
            </Heading>
            <Text>
              Create an account, explore jobs, and apply with ease. Apex Recruit
              simplifies your job search journey.
            </Text>
            </Box>
            <Image src="https://img.freepik.com/premium-vector/hands-with-curriculum-vitae_24877-14468.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1699228800&semt=ais" boxSize="200px" borderRadius="md" />
          </HStack>
        </Box>
      </SimpleGrid>

   </Box>
  )
}

export default Home