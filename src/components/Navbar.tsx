import React from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } =
    useAuth0();

  return (
    <Box bg="white" px={16} shadow="md" position="sticky" top={0} zIndex={100}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontWeight="bold" fontSize="xl">
            Book Dashboard
          </Text>
        </Box>

        <Box>
          {!isLoading && isAuthenticated ? (
            <Menu>
              <MenuButton
                as={Avatar}
                size="sm"
                cursor="pointer"
                name={user?.name}
                src={user?.picture}
              />
              <MenuList>
                <MenuItem
                  onClick={() =>
                    logout({
                      logoutParams: {
                        returnTo: window.location.origin,
                      },
                    })
                  }
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={3}>
              <Button variant="ghost" onClick={() => loginWithRedirect()}>
                Log in
              </Button>
              <Button
                colorScheme="blue"
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: { screen_hint: "signup" },
                  })
                }
              >
                Sign up
              </Button>
            </HStack>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
