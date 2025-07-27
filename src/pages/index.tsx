import { Geist, Geist_Mono } from "next/font/google";
import {Box,Flex,Heading,Text,Image,Button,VStack,Avatar,AvatarGroup} from '@chakra-ui/react'
import Navigator from "@/componets/website/navigation";
import { CiCircleCheck } from "react-icons/ci";
import Rating from "@/componets/website/rating";
import { useState,useEffect } from "react";
import Footer from "@/componets/website/footer";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter()

  type Review = {
    description: string;
    name: string;
    title: string;
    rating: number;
    imageUrl: string;
  };

  const [reviews, setReviews] = useState([
    {
      description:
        "The transcription accuracy is amazing! It saved me hours of work on my podcast episodes.",
      name: "John Doe",
      title: "Podcaster",
      rating: 3,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      description:
        "This app has completely streamlined my workflow. The speaker detection feature is a game-changer.",
      name: "Jane Smith",
      title: "Content Creator",
      rating: 3,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      description:
        "As a journalist, I rely on fast and accurate transcriptions, and this app delivers every time.",
      name: "Alice Johnson",
      title: "Journalist",
      rating: 5,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      description:
        "I love how easy it is to use! The export options make it simple to integrate with my editing tools.",
      name: "Michael Brown",
      title: "Video Editor",
      rating: 4,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      description:
        "Fantastic tool for transcribing interviews. The AI even gets technical terms right most of the time.",
      name: "Emily Davis",
      title: "Researcher",
      rating: 4,
      imageUrl: "https://via.placeholder.com/150",
    },
  ]);

  const [selectedReview,setSelectedReview] = useState<Review>()

  
  useEffect(()=>{
    const data = reviews[0]
    console.log({data})
    setSelectedReview(data)
  },[])

  return (
    <Box maxWidth={'2000px'} mx={'auto'} >
      <Navigator />
      {/* section 1 */}
      <Box bg={'#010101'} padding={{lg:'1.5rem 5rem',md:'1.5rem 2rem',sm:'1rem',base:'1rem'}}>
      <Flex alignItems={'center'} flexDir={{lg:'row',md:'row',sm:'column',base:'column'}}>
         <Box  mt={'3rem'} w={{lg:'50%',md:'50%',sm:'100%',base:'100%'}} textColor={'white'}>
              <Heading fontSize={{lg:'46px',md:'46px',sm:'35px',base:'35px'}} fontWeight={'600'}>Transcription Made</Heading>
              <Heading fontSize={{lg:'46px',md:'46px',sm:'35px',base:'35px'}} fontWeight={'600'}>   Simple and </Heading>
              <Heading fontSize={{lg:'46px',md:'46px',sm:'35px',base:'35px'}} fontWeight={'600'}>   Seamless</Heading>

            <Text mt={'2rem'} fontSize={{lg:'24px',md:'24px',sm:'18px',base:'18px'}}  fontWeight={'500'}>Fast, secure, and highly accurate </Text>
            <Text fontSize={{lg:'24px',md:'24px',sm:'18px',base:'18px'}} fontWeight={'500'}>transcription services tailored to meet </Text>
            <Text fontSize={{lg:'24px',md:'24px',sm:'18px',base:'18px'}} fontWeight={'500'}>your demands.</Text>
             <Button onClick={()=>router.push('auth/sign-up')} mt={'2rem'} p={'1rem 2rem' } border={'1px solid #FCDC73'}  bg={'transparent'} borderRadius={'12px'}   w={'fit-content'} color={'#FCDC73'} >Get Started Now</Button>
              
             <Flex>
          
             </Flex>
         </Box>
         <Box   mt={'3rem'} w={{lg:'50%',md:'50%',sm:'100%',base:'100%'}}>
          <Image src={'section1image.svg'}/>
         </Box>

      </Flex>
      <Flex
      overflowX="scroll" // Enables horizontal scrolling
      // w="400px" // Width of the scrollable container
      mt="3rem"
      textColor="white"
      justifyContent="space-between" // Aligns content to the start
      gap="3rem" // Adds consistent spacing between items
      css={{
        scrollbarWidth: "none", // Hides scrollbar for Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Hides scrollbar for Chrome/Safari
        },
      }}
    >
      {/* Content Boxes */}
      <Box textAlign="center" minW="200px" p="4" bg="" borderRadius="md">
        <Heading fontSize="xl">35k +</Heading>
        <Text>Happy Customer</Text>
      </Box>
      <Box textAlign="center" minW="200px" p="4" bg="" borderRadius="md">
        <Heading fontSize="xl">50k +</Heading>
        <Text>Positive Reviews</Text>
      </Box>
      <Box textAlign="center" minW="200px" p="4" bg="" borderRadius="md">
        <Heading fontSize="xl">20+</Heading>
        <Text>Years of Experience</Text>
      </Box>
      <Box textAlign="center" minW="200px" p="4" bg="" borderRadius="md">
        <Heading fontSize="xl">35k +</Heading>
        <Text>Happy Customer</Text>
      </Box>
    </Flex>
      </Box>
      {/* section 1 */}


      {/* section 2 */}
       <Box id="Features" bg={'#010101'} textColor={'white'} padding={{lg:'5rem 5rem',md:'1.5rem 2rem',sm:' 2rem 1rem',base:'2rem 1rem'}}>
        <Heading textAlign={'center'} mb={'4rem'}>Our Features</Heading>
        <Flex justifyContent={'space-between'} gap={'3rem'} flexDir={{lg:'row',md:'row',sm:'column',base:'column'}} >
          <Box  p={{lg:'1rem',md:'1rem',sm:'0.3rem',base:'0.5rem'}} w={{lg:'25%',md:'20%',sm:'100%',base:'100%'}} border={'1px solid rgba(150, 131, 68, 0.6)'}>
            <Heading fontSize={'25px'} textAlign={'center'} mb={'1rem'}>Accuracy</Heading>
            <Text textAlign={'center'}>Achieve up to 99% precision in your transcriptions. Our advanced AI technology ensures every word and nuance is captured with exceptional clarity and attention to detail
            </Text>
          </Box>
          <Box  p={{lg:'1rem',md:'1rem',sm:'0.3rem',base:'0.5rem'}} w={{lg:'25%',md:'20%',sm:'100%',base:'100%'}} border={'1px solid rgba(29, 78, 216, 0.7)'}>
          <Heading fontSize={'25px'} textAlign={'center'} mb={'1rem'}>Accuracy</Heading>
            <Text textAlign={'center'}>Achieve up to 99% precision in your transcriptions. Our advanced AI technology ensures every word and nuance is captured with exceptional clarity and attention to detail
           </Text>
          </Box>
          <Box  p={{lg:'1rem',md:'1rem',sm:'0.3rem',base:'0.5rem'}} w={{lg:'25%',md:'20%',sm:'100%',base:'100%'}} border={'1px solid rgba(150, 131, 68, 0.6)'}>
          <Heading fontSize={'25px'} textAlign={'center'} mb={'1rem'}>Accuracy</Heading>
            <Text textAlign={'center'}>Achieve up to 99% precision in your transcriptions. Our advanced AI technology ensures every word and nuance is captured with exceptional clarity and attention to detail
           </Text>
          </Box>


        </Flex>
       </Box>
      {/* section 2 */}

      {/* section 3 */}
      <Box id="Works" bg={'#121212'}  textColor={'white'} padding={{lg:'5rem 5rem',md:'1.5rem 2rem',sm:'2rem 1rem',base:'2rem 1rem'}}>
          <Heading textAlign={'center'}>How It works</Heading>

          <Flex  flexDir={{lg:'row',md:'row',sm:'column',base:'column'}} mt={'6rem'} justifyContent={'space-between'} gap={'3rem'}>
            <Box p={'4rem 1.2rem'} borderTop={'2px solid rgba(250, 197, 21, 0.30)'} bg={'rgba(250, 197, 21, 0.02);'} w={{lg:'40%',md:'40%',sm:'100%',base:'100%'}} >
            <Heading fontSize={'25px'} textAlign={'center'} mb={'1rem'}>Accuracy</Heading>
            <Text textAlign={'center'}>Achieve up to 99% precision in your transcriptions. Our advanced AI technology ensures every word and nuance is captured with exceptional clarity and attention to detail
            </Text>
            </Box>
            <Box  w={{lg:'40%',md:'40%',sm:'100%',base:'100%'}} >
                <Image src="Rectangle.png" />
            </Box>
          </Flex>
          <Flex  flexDir={{lg:'row-reverse',md:'row-reverse',sm:'column',base:'column'}} mt={'3rem'} justifyContent={'space-between'} gap={'3rem'}>
            <Box p={'4rem 1.2rem'} borderTop={'2px solid rgba(250, 197, 21, 0.30)'} bg={'rgba(250, 197, 21, 0.02);'} w={{lg:'40%',md:'40%',sm:'100%',base:'100%'}} >
            <Heading fontSize={'25px'} textAlign={'center'} mb={'1rem'}>Accuracy</Heading>
            <Text textAlign={'center'}>Achieve up to 99% precision in your transcriptions. Our advanced AI technology ensures every word and nuance is captured with exceptional clarity and attention to detail
            </Text>
            </Box>
            <Box  w={{lg:'40%',md:'40%',sm:'100%',base:'100%'}} >
                <Image src="Rectangle.png" />
            </Box>
          </Flex>
          <Flex  flexDir={{lg:'row',md:'row',sm:'column',base:'column'}} mt={'3rem'} justifyContent={'space-between'} gap={'3rem'}>
            <Box p={'4rem 1.2rem'} borderTop={'2px solid rgba(250, 197, 21, 0.30)'} bg={'rgba(250, 197, 21, 0.02);'} w={{lg:'40%',md:'40%',sm:'100%',base:'100%'}} >
            <Heading fontSize={'25px'} textAlign={'center'} mb={'1rem'}>Accuracy</Heading>
            <Text textAlign={'center'}>Achieve up to 99% precision in your transcriptions. Our advanced AI technology ensures every word and nuance is captured with exceptional clarity and attention to detail
            </Text>
            </Box>
            <Box  w={{lg:'40%',md:'40%',sm:'100%',base:'100%'}} >
                <Image src="Rectangle.png" />
            </Box>
          </Flex>
      </Box>
      {/* section 3 */}
   
      {/* section 4  */}
      <Box 
      id="Pricing"
       bg={'black'}
       width="100%"
       bgImage="url('section4.png')"
       bgSize="cover" 
       bgPosition="center"
       bgRepeat="no-repeat"
       padding={{lg:'5rem 5rem',md:'1.5rem 2rem',sm:' 2rem 1rem',base:'2rem 1rem'}}
       textColor={'white'}
      >

        <Heading textAlign={'center'} > Pricing </Heading>
        <Text textAlign={'center'}>Lorem ipsum dolor sit amet consectetur. Semper varius ullamcorper tristique e</Text>


                <Flex mt={'6rem'} justifyContent={'space-between'} gap={5} flexDirection={{lg:'row',md:'column',sm:'column',base:'column'}}>
                        <Flex mx={'auto'} flexDir={'column'}
                            maxW="sm"
                            bg={' linear-gradient(180deg, rgba(252, 226, 140, 0.30) 0%, rgba(252, 226, 140, 0.08) 50%, rgba(252, 226, 140, 0.26) 100%);'}
                            boxShadow="lg"
                            p={6}
                            border={'0.92px solid #FAC515;'}
                            borderRadius={'29.455px;'}
                        >
                                {/* Icon */}
                                <Box>
                                <Image src="/radio.svg"></Image>
                                </Box>
                                
                                {/* Plan Name */}
                                <Heading fontSize={'20px'} fontWeight={'500'} mt={'0.5rem'}>
                                    Enterprise
                                </Heading>
                                <Text fontSize="15.6px" color={'rgba(0, 0, 0, 0.80);'} mb={3}>
                                    For large teams & corporations.
                                </Text>
        
                                {/* Price */}
                                <Flex align="baseline" mb={6}>
                                    <Heading fontSize="28px" fontWeight="500" lineHeight="1">
                                        $20
                                    </Heading>
                                    <Text fontSize="sm" color="gray.600" ml={2}>
                                        / per month
                                    </Text>
                                </Flex>
        
                                {/* Button */}
                                <Button onClick={()=>router.push('auth/sign-up')}  mx={'auto'} bg={'#0A0A0A'} textColor={'white'} _hover={{bg:'#0A0A0A'}} padding={'1rem 2rem'} mb={6}>
                                    Purchase Plan
                                </Button>
        
                                {/* Divider */}
                                <Box borderBottom="1px solid" borderColor="gray.200" mb={4} />
        
                                {/* Features List */}
                                <VStack align="start" spacing={3}>
                                    {Array(5)
                                    .fill("Advanced employee directory")
                                    .map((item, index) => (
                                        <Box key={index} display="flex" alignItems="center">
                                        <CiCircleCheck color="green.400"  />
                                        <Text>{item}</Text>
                                        </Box>
                                    ))}
                                </VStack>
                        </Flex>
                        <Flex mx={'auto'} flexDir={'column'}
                            maxW="sm"
                            bg={' linear-gradient(180deg, rgba(252, 226, 140, 0.30) 0%, rgba(252, 226, 140, 0.08) 50%, rgba(252, 226, 140, 0.26) 100%);'}
                            boxShadow="lg"
                            p={6}
                            border={'0.92px solid #FAC515;'}
                            borderRadius={'29.455px;'}
                        >
                                {/* Icon */}
                                <Box>
                                <Image src="/radio.svg"></Image>
                                </Box>
                                
                                {/* Plan Name */}
                                <Heading fontSize={'20px'} fontWeight={'500'} mt={'0.5rem'}>
                                    Enterprise
                                </Heading>
                                <Text fontSize="15.6px" color={'rgba(0, 0, 0, 0.80);'} mb={3}>
                                    For large teams & corporations.
                                </Text>
        
                                {/* Price */}
                                <Flex align="baseline" mb={6}>
                                    <Heading fontSize="28px" fontWeight="500" lineHeight="1">
                                        $20
                                    </Heading>
                                    <Text fontSize="sm" color="gray.600" ml={2}>
                                        / per month
                                    </Text>
                                </Flex>
        
                                {/* Button */}
                                <Button onClick={()=>router.push('auth/sign-up')}  mx={'auto'} bg={'#0A0A0A'} textColor={'white'} _hover={{bg:'#0A0A0A'}} padding={'1rem 2rem'} mb={6}>
                                    Purchase Plan
                                </Button>
        
                                {/* Divider */}
                                <Box borderBottom="1px solid" borderColor="gray.200" mb={4} />
        
                                {/* Features List */}
                                <VStack align="start" spacing={3}>
                                    {Array(5)
                                    .fill("Advanced employee directory")
                                    .map((item, index) => (
                                        <Box key={index} display="flex" alignItems="center">
                                        <CiCircleCheck color="green.400"  />
                                        <Text>{item}</Text>
                                        </Box>
                                    ))}
                                </VStack>
                        </Flex>
                        <Flex mx={'auto'} flexDir={'column'}
                            maxW="sm"
                            bg={' linear-gradient(180deg, rgba(252, 226, 140, 0.30) 0%, rgba(252, 226, 140, 0.08) 50%, rgba(252, 226, 140, 0.26) 100%);'}
                            boxShadow="lg"
                            p={6}
                            border={'0.92px solid #FAC515;'}
                            borderRadius={'29.455px;'}
                        >
                                {/* Icon */}
                                <Box>
                                <Image src="/radio.svg"></Image>
                                </Box>
                                
                                {/* Plan Name */}
                                <Heading fontSize={'20px'} fontWeight={'500'} mt={'0.5rem'}>
                                    Enterprise
                                </Heading>
                                <Text fontSize="15.6px" color={'rgba(0, 0, 0, 0.80);'} mb={3}>
                                    For large teams & corporations.
                                </Text>
        
                                {/* Price */}
                                <Flex align="baseline" mb={6}>
                                    <Heading fontSize="28px" fontWeight="500" lineHeight="1">
                                        $20
                                    </Heading>
                                    <Text fontSize="sm" color="gray.600" ml={2}>
                                        / per month
                                    </Text>
                                </Flex>
        
                                {/* Button */}
                                <Button onClick={()=>router.push('auth/sign-up')}  mx={'auto'} bg={'#0A0A0A'} textColor={'white'} _hover={{bg:'#0A0A0A'}} padding={'1rem 2rem'} mb={6}>
                                    Purchase Plan
                                </Button>
        
                                {/* Divider */}
                                <Box borderBottom="1px solid" borderColor="gray.200" mb={4} />
        
                                {/* Features List */}
                                <VStack align="start" spacing={3}>
                                    {Array(5)
                                    .fill("Advanced employee directory")
                                    .map((item, index) => (
                                        <Box key={index} display="flex" alignItems="center">
                                        <CiCircleCheck color="green.400"  />
                                        <Text>{item}</Text>
                                        </Box>
                                    ))}
                                </VStack>
                        </Flex>
                </Flex>
      </Box>
      {/* section 4  */}

      {/* section 5 */}
      <Box
      id="About"
       bg={'black'}
       width="100%"
       bgImage="url('footer.png')"
       bgSize="cover" 
       bgPosition="center"
       bgRepeat="no-repeat"
       padding={{lg:'5rem 5rem',md:'1.5rem 2rem',sm:' 2rem 1rem',base:'2rem 1rem'}}
       textColor={'white'}
      >  
       
       {selectedReview 
       && 
       <Flex p={'1rem'} borderRadius={'12px'} w={{lg:'60%',md:'70%',sm:'100%',base:'100%'}} mx={'auto'} flexDir={'column'} bg={'#121212'} >
       <Rating rating={selectedReview.rating}/>
       <Text m={'2rem 0'} >
          {selectedReview.description}
       </Text>

       <Flex gap={'1rem'}>
       <Avatar 
         name={selectedReview.name} 
         bg={'#FCDC73'}
       />
       <Box>
         <Text fontWeight={'600'}>{selectedReview.name}</Text>
         <Text>{selectedReview.title}</Text>
       </Box>
       </Flex>
     
 </Flex>
       }
        

          <Flex
            align="center"
            justify="center"
            mt={'1rem'}
          >

            <AvatarGroup size="lg" spacing="1.5rem">
           
            {reviews.map((review,index)=>{
               return(
                <Box key={index} >
                <Avatar onClick={()=>setSelectedReview(review)}
                 boxSize={{
                  base: review.name === selectedReview?.name ? "4rem" : "2rem",
                  sm: review.name === selectedReview?.name ? "5rem" : "2.5rem",
                  md: review.name === selectedReview?.name ? "6rem" : "3rem",
                  lg: review.name === selectedReview?.name ? "7rem" : "3.5rem",
                }}
                src={review.imageUrl} />
                </Box>
               )
            })}
            </AvatarGroup>
          </Flex>
          <Footer />

      </Box>
      {/* section 5 */}

    </Box>
  );
}
