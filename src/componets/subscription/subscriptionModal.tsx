import React,{useState,useEffect} from "react";
import {
  Box,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useUpgradeUserSubscribtion,useDowngradeUserSubscribtion,useCreateUserSubscribtion } from "@/libs/hooks/stripeHook";
import { useGetUserInfo } from "@/libs/hooks/userHooks";
import toast from "react-hot-toast";
import LoadingSpinner from "@/componets/loadingSpinner";
import { useRouter } from "next/router";

interface Subscription { 
  plan:string
  subscription:string
}


function SubscriptionModal({ isOpen,plan,upgradeTo}: {isOpen: boolean; plan: string | undefined; upgradeTo : string[]}) {
const [subscription,setSubscription] = useState<Subscription>()
const mutation = useCreateUserSubscribtion()
const upgradeSubscriptionMutation = useUpgradeUserSubscribtion()
const downgradeSubscriptionMutation = useDowngradeUserSubscribtion()
const {data, isLoading}  = useGetUserInfo()
const [ showLoadingSpinner,setShowLoadingSpinner] = useState<boolean>(false)
const router = useRouter()




useEffect(()=>{
      console.log(data)
      setSubscription(data?.subscription)
  },[data])

  async function subscribtionHandler(data:string){
    try {

       if(subscription?.plan === data ){
           toast.success('you are currently on this plan')
           return
       }
       
       if(subscription?.subscription !== 'active' || subscription.plan === 'free'){
           setShowLoadingSpinner(true)
           const response = await mutation.mutateAsync({plan:data})
           console.log({response})
           router.push(response.url)
       }

       if(subscription?.subscription === 'active' && subscription.plan !== 'free'){
           setShowLoadingSpinner(true)
           console.log(data)
            
           // handle downgrade 
           if(subscription.plan === 'pro' &&  data ==='basic') {
               const response = await downgradeSubscriptionMutation.mutateAsync({plan:data})
               toast.success(response?.message)
               console.log(1,response)

           }
            
           //handle  upgrade
           if(subscription.plan === 'basic' &&  data ==='pro'){
           const response = await upgradeSubscriptionMutation.mutateAsync({plan:data})
           setSubscription({plan:'pro',subscription:'active'})
           toast.success('subscription upgraded')
           }


       }


       
    } catch (error:any) {
       toast.error(error.message)
    }finally{
       setShowLoadingSpinner(false)
    }
}


  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <Box
        position="fixed"
        top="0"
        left="15%"
        right="0"
        bottom="0"
        bg="blackAlpha.500"
        backdropFilter="blur(1px)" // Apply blur to the backdrop
        zIndex={1} // Set the backdrop below the modal
      />
      <LoadingSpinner showLoadingSpinner={showLoadingSpinner} />

      {/* Modal content */}
      <Flex
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        alignItems="center"
        justifyContent="center"
        zIndex={2} // Ensure modal is above the backdrop
        width="90%"
        maxWidth="500px"
      >
        <Box
          borderRadius="12px"
          boxShadow="lg"
          bg="white"

          p={6}
          textAlign="center"
          width="100%"
        >
          <Text fontSize="lg" fontWeight="bold">
            You are currently on the {plan} plan
          </Text>
          <Text mt={4}>
            Upgrade to the pro plan to access exclusive features.
          </Text>
          <Flex justifyContent={'center'} gap={'2rem'}flexDir={{lg:'row',md:'row',sm:'column',base:'column'}}>
          {upgradeTo.map((plan,index)=>{
            return(
                <Button
                key={index}
                p={"1rem 2rem"}
                mt={"3rem"}
                bg={"#101828"}
                borderRadius={"12px"}
                w={"fit-content"}
                color={"white"}
                onClick={()=>subscribtionHandler(plan)}
              >
                Purchase {plan} Plan
              </Button>
            )
          })
          }
          </Flex>
         
        </Box>
      </Flex>
    </>
  );
}

export default SubscriptionModal;
