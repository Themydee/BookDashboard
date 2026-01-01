// src/pages/dashboard/Authors.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";

type Author = {
  id: number;
  name: string;
  email: string;
};

export default function Authors() {
  const [authors, setAuthors] = useState<Author[]>([
    { id: 1, name: "George Orwell", email: "george@orwell.com" },
    { id: 2, name: "J.R.R. Tolkien", email: "tolkien@example.com" },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editAuthor, setEditAuthor] = useState<Author | null>(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = () => {
    if (editAuthor) {
      setAuthors((prev) =>
        prev.map((a) =>
          a.id === editAuthor.id ? { ...a, name: form.name, email: form.email } : a
        )
      );
    } else {
      const newAuthor: Author = {
        id: authors.length + 1,
        name: form.name,
        email: form.email,
      };
      setAuthors([...authors, newAuthor]);
    }

    setForm({ name: "", email: "" });
    setEditAuthor(null);
    onClose();
  };

  const handleEdit = (author: Author) => {
    setEditAuthor(author);
    setForm({ name: author.name, email: author.email });
    onOpen();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this author?")) {
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <Box>
      <Heading mb={4}>Authors</Heading>
      <Button colorScheme="blue" mb={4} onClick={onOpen}>
        Add New Author
      </Button>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {authors.map((author) => (
              <Tr key={author.id}>
                <Td>{author.name}</Td>
                <Td>{author.email}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm" colorScheme="green" onClick={() => handleEdit(author)}>
                      Edit
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(author.id)}>
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setEditAuthor(null);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editAuthor ? "Edit Author" : "Add New Author"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Author name"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Author email"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit}>
              {editAuthor ? "Save Changes" : "Add Author"}
            </Button>
            <Button
              onClick={() => {
                onClose();
                setEditAuthor(null);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
