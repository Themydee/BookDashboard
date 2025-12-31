import {
  Box,
  Flex,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";

export default function Navbar() {
  return (
    <Box bg="white" px={16} shadow="md" position="sticky" top={0} zIndex={100}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontWeight="bold" fontSize="xl">
            Book Dashboard
          </Text>
        </Box>

        <Menu>
          <MenuButton as={Avatar} size="sm" cursor="pointer" />
          <MenuList>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}
