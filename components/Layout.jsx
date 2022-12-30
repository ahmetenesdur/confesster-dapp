import React from 'react'
import Image from 'next/image'
import { Web3Button } from "@web3modal/react";
import { useAccount } from "@web3modal/react";
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Link,
    useColorModeValue,
    useColorMode,
    Button,
    useDisclosure,
    Stack,
} from "@chakra-ui/react";
import {
    AddIcon,
    CloseIcon,
    HamburgerIcon,
    MoonIcon,
    SunIcon,
} from "@chakra-ui/icons";

const links = [
    { label: 'My Confessions', to: '/myconfessions' },
    { label: 'Coffee', to: '/coffee' },
];

const NavLink = ({ children, to }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        color={useColorModeValue('gray.600', 'gray.200')}
        _hover={{
            textDecoration: 'none',
            color: useColorModeValue('gray.800', 'white'),
        }}
        href={to}>
        {children}
    </Link>
);

const Layout = () => {
    // const { account, isReady } = useAccount();

    return (
        <Box
            h="100vh"
            w="100vw"
            position="relative"
            zIndex="0"
            bg={useColorModeValue('white', '#171923')}>
            <Box px={4} maxWidth={'5xl'} m={'auto'} mt={'5'}>
                <Flex h={'16'} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Link href={"/"}>
                                <Image
                                    src={'/confesster.svg'}
                                    alt="Confesster logo"
                                    width={'120'}
                                    height={'120'}
                                />
                            </Link>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {links.map(({ label, to }) => (
                                <NavLink key={label} to={to}>
                                    {label}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>
                </Flex>
                <Flex>
                    <Web3Button />
                </Flex>
            </Box>
        </Box>
    )
}

export default Layout