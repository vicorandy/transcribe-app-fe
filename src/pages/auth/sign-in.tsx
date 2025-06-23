import {Flex, Box, Button, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "@/componets/loadingSpinner";
import { useLoginUser } from "@/libs/hooks/userHooks";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const SignIn = () => {

    const [email,setEmail] = useState<string>('')
    const [password,setPassword] =useState<string>('')
    const [showLoadingSpinner,setShowLoadingSpinner] = useState<boolean>(false)
    const mutation = useLoginUser() 
    const router = useRouter()


    async function loginHandler(){
        try {
            if(!email || !password){
                toast.error('please fill in all the required fields ')
                return
            }
            setShowLoadingSpinner(true)
            const {token,user} = await mutation.mutateAsync({email,password})
            if(token)  Cookies.set('usertoken',token , {secure: true ,sameSite: 'None'});
            router.push('/dashboard')        
        } catch (error:any) {
            console.log(error)
            toast.error(error?.message)
        }finally{
            setShowLoadingSpinner(false)
        }
       
    }

  return (
    <Flex h={'100vh'} alignItems={'center'} justifyContent={'center'}>
    <LoadingSpinner showLoadingSpinner={showLoadingSpinner} />
    <Box w={{lg:'50%',md:'50%',sm:'100%',base:'100%'}} p="4" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="lg" mb="6" textAlign="center">
        Sign In
      </Heading>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Feature Preference Input */}
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input
           focusBorderColor="#FAC515"
          p={'2rem 1rem'}
            name="featurePreference"
            placeholder="Enter Your Name"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </FormControl>

        {/* Language Support Input */}
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input
           focusBorderColor="#FAC515"
          p={'2rem 1rem'}
            name="languageSupport"
            placeholder="Enter your email"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </FormControl>



        {/* Submit Button */}
        <Button
          width="100%"
          colorScheme="#101828"
          bg="#101828"
          p={'2rem 0'}
          color="white"
          _hover={{ bg: "blue.700" }}
          onClick={loginHandler}
        >
          Continue
        </Button>
      </form>
    </Box>
    </Flex>
  );
};

export default SignIn;
