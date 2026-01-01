// src/pages/Dashboard.tsx
import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <Box flex="1">
        {/* Nested route content */}
        <Box p={8}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
