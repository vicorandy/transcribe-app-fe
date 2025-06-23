import { Box,Flex,Image, Link,Button,Icon } from "@chakra-ui/react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";

export const DesktopView = () =>{
    return(
      <Flex bg={'#010101'} padding={'1.5rem 5rem'} maxWidth={'2000px'}  mx={'auto'} textColor={'white'} display={{lg:'flex',md:'none',sm:'none',base:'none'}} >
        <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'} >
            {/* Logo */}
            <Image src="SmallLogo.svg"/>

            {/* menu */}
            <Flex gap={'1rem'}>
                <Link href="#Features">Features</Link>
                <Link href="#Works">How It Works</Link>
                <Link href="#Pricing">Pricing</Link>
                <Link href="#About">About Us</Link>
            </Flex>

            {/* button */}
            <Flex gap={'1rem'}>
            <Link href="/auth/sign-in" ><Button p={'1rem 2rem'}  bg={'white'} borderRadius={'12px'}   w={'fit-content'} color={'#101828'} >Sign In</Button></Link>
            <Link href="/auth/sign-up"><Button p={'1rem 2rem'} border={'1px solid white'} bg={'#0A0A0A'} borderRadius={'12px'} w={'fit-content'} color={'white'} >Subscribe</Button></Link>     
            </Flex>

        </Flex>
      </Flex>
    )
}

export const MobileView = () =>{
    const [showModileMenu,setShowMobileMenu ] =useState<boolean>(false)
    return(
      <Flex bg={'#010101'}  mx={'auto'} textColor={'white'} display={{lg:'none',md:'flex',sm:'flex',base:'flex'}} >
         <Flex padding={{lg:'1.5rem 5rem',md:'1.5rem 2rem',sm:'1rem',base:'1rem'}} alignItems={'center'} justifyContent={'space-between'} width={'100%'} >
            {/* Logo */}
            <Image src="SmallLogo.svg"/>
            <Icon as={GiHamburgerMenu} onClick={()=>setShowMobileMenu(true)} />
        </Flex>
        <Box zIndex={'100'}  display={showModileMenu?'block':'none'} bg={'#0A0A0A'} position={'fixed'} h={'100vh'} w={'100%'}>
           <Flex justifyContent={'flex-end'}>
                  <Icon   as={IoIosClose} boxSize={'3rem'} onClick={()=>setShowMobileMenu(false)}></Icon>
           </Flex>
           <Flex mt={'4rem'} gap={'1rem'} flexDir={'column'}>
                <Link mx={'auto'} onClick={()=>setShowMobileMenu(false)} href="#Features">Features</Link>
                <Link mx={'auto'} onClick={()=>setShowMobileMenu(false)} href="#Works">How It Works</Link>
                <Link mx={'auto'} onClick={()=>setShowMobileMenu(false)} href="#Pricing">Pricing</Link>
                <Link mx={'auto'} onClick={()=>setShowMobileMenu(false)} href="#About">About Us</Link>
            </Flex>

            {/* button */}
            <Flex gap={'1rem'} mt={'3rem'} flexDir={'column'}>
                   <Link href="/auth/sign-in"  mx={'auto'}> <Button p={'1rem 2rem'}  bg={'white'} borderRadius={'12px'}   w={'fit-content'} color={'#101828'} >Sign In</Button> </Link>
                   <Link href="/auth/sign-up"  mx={'auto'}> <Button p={'1rem 2rem'} border={'1px solid white'} bg={'#0A0A0A'} borderRadius={'12px'} w={'fit-content'} color={'white'} >Subscribe</Button></Link>
            </Flex>
        </Box>
      </Flex>
    )
}


const Navigator  = () => {

    return(
        <Box >
            <DesktopView />
            <MobileView />
        </Box>
    )
}

export default Navigator