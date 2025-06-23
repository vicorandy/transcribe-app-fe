import React, { ReactNode, useContext, useEffect, useState } from 'react';
import Logo from '../../../public/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import {
  IconButton,
  Avatar,
  AvatarBadge,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  AvatarProps,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { FiMonitor, FiLink2, FiSettings, FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import { ImStack } from 'react-icons/im';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';
import { IoHomeOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";


interface LinkItemProps {
  name: string | any;
  icon: IconType;
  href: string[];
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: (
      <Flex alignItems="center">
        <Box mr="2">Home</Box>
      </Flex>
    ),
    icon: IoHomeOutline,
    href: ['/dashboard', '/dashboard'],
  },

  {
    name: 'Upload',
    icon: MdOutlineFileUpload,
    href: ['/dashboard/upload','/dashboard/upload'],
  },
  {
    name: 'My Notes',
    icon: FaNoteSticky,
    href: ['/dashboard/notes','/dashboard/notes'],
  },
  {
    name: 'Recording',
    icon: FaMicrophone,
    href: ['/dashboard/recordings','/dashboard/recordings'],
  },
  {
    name: 'Billing',
    icon: FaDollarSign,
    href: ['/dashboard/billing','/dashboard/billing'],
  },
];

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} minH={'100vh'} bg={'white'} pt="6">
        <Box w={'full'} mt={20} px={{ base: 2, sm: 2, md: 8, lg: 14 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}


// side bar
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [hasLinkedAccounts,setHasLinkedAccounts]=useState(false)
  const [hasMediaKit,setHasMediaKit]=useState(false)
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(router.pathname);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
  };
  const navLinkHandler=(link:LinkItemProps,index:number,hasLinkedAccounts:boolean):string=>{
      if(index!==2 && hasLinkedAccounts)return link.href[0]
      if(index===2 && hasMediaKit) return link.href[0] // create logic to check if user has media kit
      return link.href[1]
  }
  
  return (
    <Box
      transition="3s ease"
      bg={'#0A0A0A'}
      borderRight="0px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      mt={{lg:'20',md:'20',sm:'0',base:'0'}}
      pt={'3rem'}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20"  display={{base:'flex',sm:'flex',md:'none',lg:'none'}} alignItems="center" mx="8" mb={10} justifyContent="space-between">
        <Link href={'/'}>
          <Image src={Logo} alt="Logo" />
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link,index) => (
        <NavItem key={link.name} icon={link.icon} href={navLinkHandler(link,index,hasLinkedAccounts)} isActive={link.href.includes(activeLink)} onClick={() => handleLinkClick(link.href[0])}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, children, href, isActive, onClick, ...rest }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none' }}
      // _focus={{ boxShadow: 'none' }}
      color='white'
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        color = {isActive ? 'black' : 'white'}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={
          {
            // bg: 'cyan.400',
            // color: 'white',
          }
        }
        bg={isActive ? '#FAC515' : undefined}
        onClick={onClick}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={'white'}
            _groupHover={
              {
                // color: 'white',
              }
            }
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const router = useRouter();

  return (
    <Stack position="fixed" w={'100%'} zIndex="10">
      <Flex
        // ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={'#0A0A0A'}
        borderBottomWidth="0px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={'space-between'}
        {...rest}
      >
        <IconButton display={{ base: 'flex', md: 'none' }} onClick={onOpen} variant="outline" color={'#7B61FE'} aria-label="open menu" icon={<FiMenu />} />
        <Box display={{lg:'flex',md:'flex',sm:'none',base:'none'}} >
          <Link href={'/'}>
            <Image src={Logo} alt="Logo" />
          </Link>
        </Box>
        <HStack
          spacing={{ base: '0', md: '6' }}
          // display={{ base: 'flex', md: 'flex' }}
        >
          <IconButton size="lg" variant="ghost" color={'white'} aria-label="open menu" icon={<FiBell />} />
          <IconButton size="lg" variant="ghost" color={'white'} aria-label="open menu" icon={<FaRegMessage  />} />
          <IconButton size="lg" variant="ghost" color={'white'} aria-label="open menu" icon={<FaQuestion />} />
          <IconButton size="lg" variant="ghost" color={'white'} aria-label="open menu" icon={<CgProfile />} />
          {/* may need later */}
          {/* <Divider orientation="vertical" h={'72px'} borderWidth="1px" display={{ base: 'none', md: 'flex' }} />
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    name={`John Doe`}
                  />
                  <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                    <Text as={'b'} fontSize={'16px'} fontWeight={400}>
                                John Doe
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem >Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex> */}
        </HStack>
      </Flex>
    </Stack>
  );
};