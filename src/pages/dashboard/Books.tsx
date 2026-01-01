// src/pages/dashboard/Books.tsx
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

type Book = {
  id: number;
  name: string;
  description: string;
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, name: "1984", description: "Dystopian novel by George Orwell" },
    { id: 2, name: "The Hobbit", description: "Fantasy novel by J.R.R. Tolkien" },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = () => {
    if (editBook) {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === editBook.id ? { ...b, name: form.name, description: form.description } : b
        )
      );
    } else {
      const newBook: Book = {
        id: books.length + 1,
        name: form.name,
        description: form.description,
      };
      setBooks([...books, newBook]);
    }

    setForm({ name: "", description: "" });
    setEditBook(null);
    onClose();
  };

  const handleEdit = (book: Book) => {
    setEditBook(book);
    setForm({ name: book.name, description: book.description });
    onOpen();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <Box>
      <Heading mb={4}>Books</Heading>
      <Button colorScheme="blue" mb={4} onClick={onOpen}>
        Add New Book
      </Button>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map((book) => (
              <Tr key={book.id}>
                <Td>{book.id}</Td>
                <Td>{book.name}</Td>
                <Td>{book.description}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm" colorScheme="green" onClick={() => handleEdit(book)}>
                      Edit
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(book.id)}>
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
          setEditBook(null);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editBook ? "Edit Book" : "Add New Book"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Book name"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Book description"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit}>
              {editBook ? "Save Changes" : "Add Book"}
            </Button>
            <Button
              onClick={() => {
                onClose();
                setEditBook(null);
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
