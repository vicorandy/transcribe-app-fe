import React from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Heading,
  HStack,
  Input,
  Button,
  Link,
  Icon,
} from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    
    <Box color="white" py={10} px={6}    >
      <Flex
        justify="space-between"
        flexWrap="wrap"
        gap={8}
      >
        
        <Flex flexDir={'column'} gap={'2rem'} w={{base:'100%',sm:'100%',md:'30%',lg:'30%'}}>
          <Heading size="md" color="whiteAlpha.900">
            Deskmayte
          </Heading>
          <Text color="gray.400">
            The purpose of a FAQ is generally to provide information on frequent
            questions or concerns.
          </Text>
          <HStack spacing={4}>
            <Icon as={FaTwitter} boxSize={5} cursor="pointer" />
            <Icon as={FaFacebookF} boxSize={5} cursor="pointer" />
            <Icon as={FaInstagram} boxSize={5} cursor="pointer" />
            <Icon as={FaPinterestP} boxSize={5} cursor="pointer" />
          </HStack>
        </Flex>

        {/* Center Columns */}
        <Flex flex="2" justify="space-between" w={{base:'100%',sm:'100%',md:'70%',lg:'70%'}} gap={8} flexDir={{base:'column',sm:'column',md:'row',lg:'row'}}>
          <Flex w={{base:'100%',sm:'100%',md:'50%',lg:'50%'}} justifyContent={'space-between'} gap={'3rem'}>
              <VStack align="start" spacing={3}>
                <Heading size="sm" color="whiteAlpha.800">
                  Company
                </Heading>
                <Link href="#" color="gray.400">
                  Service
                </Link>
                <Link href="#" color="gray.400">
                  Resources
                </Link>
                <Link href="#" color="gray.400">
                  About us
                </Link>
              </VStack>

              <VStack align="start" spacing={3}>
                <Heading size="sm" color="whiteAlpha.800">
                  Helpful Links
                </Heading>
                <Link href="#" color="gray.400">
                  Help Center
                </Link>
                <Link href="#" color="gray.400">
                  Contact Us
                </Link>
                <Link href="#" color="gray.400">
                  Terms & Conditions
                </Link>
                <Link href="#" color="gray.400">
                  Privacy Policy
                </Link>
                <Link href="#" color="gray.400">
                  FAQs
                </Link>
              </VStack>
          </Flex>

          <Box w={{base:'100%',sm:'100%',md:'50%',lg:'50%'}} >
          <Heading size="sm" mb={'1rem'} color="whiteAlpha.800">
            Subscribe to Newsletter
          </Heading>
          <HStack w="100%">
            <Input
              placeholder="Enter email address"
              bg="white"
              color="black"
              borderRadius="md"
              _placeholder={{ color: "gray.500" }}
            />
            <Button colorScheme="blue" borderRadius="md">
              Join
            </Button>
          </HStack>
          </Box>
        </Flex>
     
      </Flex>

      {/* Bottom Bar */}
      <Box borderTop="1px solid" borderColor="gray.600" mt={10} pt={4}>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          © Copyright 2024, All Rights Reserved by Transparent.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
