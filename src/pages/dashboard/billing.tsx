import SidebarWithHeader from "@/componets/layouts/dashboard";
import { Box, Text, Heading, Button, VStack, Icon, Flex ,Image} from "@chakra-ui/react";
import { CiCircleCheck } from "react-icons/ci";
import { useCreateUserSubscribtion } from "@/libs/hooks/stripeHook";
import { use, useState,useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import LoadingSpinner from "@/componets/loadingSpinner";
import { useGetUserInfo } from "@/libs/hooks/userHooks";
import { useUpgradeUserSubscribtion,useDowngradeUserSubscribtion } from "@/libs/hooks/stripeHook";


interface Subscription { 
    plan:string
    subscription:string
  }
  
 const Billing = function (){
     const mutation = useCreateUserSubscribtion()
     const upgradeSubscriptionMutation = useUpgradeUserSubscribtion()
     const downgradeSubscriptionMutation = useDowngradeUserSubscribtion()
     const router = useRouter()
     const [ showLoadingSpinner,setShowLoadingSpinner] = useState<boolean>(false)
     const {data, isLoading}  = useGetUserInfo()
     const [subscription,setSubscription] = useState<Subscription>()

     

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

    async function freeSubscribtionHandler(){
        if (subscription?.plan === 'free'){
            toast.success('you are currently on this plan')
        }

        if (subscription?.plan !== 'free'){
            toast.error('you no longer have access to the free plan')
        }

        
    }

    

    useEffect(()=>{
        console.log(data)
        setSubscription(data?.subscription)
    },[data])


   return (
    <SidebarWithHeader>
        <LoadingSpinner showLoadingSpinner={showLoadingSpinner} />
        <Flex justifyContent={'space-between'} gap={5} flexDirection={{lg:'row',md:'column',sm:'column',base:'column'}}>
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
                           Free Plan
                        </Heading>
                        <Text fontSize="15.6px" color={'rgba(0, 0, 0, 0.80);'} mb={3}>
                            {/* For large teams & corporations. */}
                        </Text>

                        {/* Price */}
                        <Flex align="baseline" mb={6}>
                            <Heading fontSize="28px" fontWeight="500" lineHeight="1">
                                $0
                            </Heading>
                            <Text fontSize="sm" color="gray.600" ml={2}>
                                / Only Available for 7 days
                            </Text>
                        </Flex>

                        {/* Button */}
                        <Button onClick={freeSubscribtionHandler} mx={'auto'} bg={'#0A0A0A'} textColor={'white'} _hover={{bg:'#0A0A0A'}} padding={'1rem 2rem'} mb={6}>
                        { subscription?.plan === 'free'? 'Active Subscription' : 'Purchase Plan'}
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
                            Basic Plan
                        </Heading>
                        <Text fontSize="15.6px" color={'rgba(0, 0, 0, 0.80);'} mb={3}>
                            {/* For large teams & corporations. */}
                        </Text>

                        {/* Price */}
                        <Flex align="baseline" mb={6}>
                            <Heading fontSize="28px" fontWeight="500" lineHeight="1">
                                $99
                            </Heading>
                            <Text fontSize="sm" color="gray.600" ml={2}>
                                / per month
                            </Text>
                        </Flex>

                        {/* Button */}
                        <Button onClick={()=>subscribtionHandler('basic')} mx={'auto'} bg={'#0A0A0A'} textColor={'white'} _hover={{bg:'#0A0A0A'}} padding={'1rem 2rem'} mb={6}>
                        { subscription?.plan === 'basic'? 'Active Subscription' : 'Purchase Plan'}
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
                            Pro Plan
                        </Heading>
                        <Text fontSize="15.6px" color={'rgba(0, 0, 0, 0.80);'} mb={3}>
                            {/* For large teams & corporations. */}
                        </Text>

                        {/* Price */}
                        <Flex align="baseline" mb={6}>
                            <Heading fontSize="28px" fontWeight="500" lineHeight="1">
                                $120
                            </Heading>
                            <Text fontSize="sm" color="gray.600" ml={2}>
                                / per month
                            </Text>
                        </Flex>

                        {/* Button */}
                        <Button onClick={()=>subscribtionHandler('pro')} mx={'auto'} bg={'#0A0A0A'} textColor={'white'} _hover={{bg:'#0A0A0A'}} padding={'1rem 2rem'} mb={6}>
                        { subscription?.plan === 'pro'? 'Active Subscription' : 'Purchase Plan'}
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

    </SidebarWithHeader>
   )
}


export default Billing