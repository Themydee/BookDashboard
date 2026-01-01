
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
  useDisclosure,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "1984", author: "George Orwell", year: 1949 },
    { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [form, setForm] = useState({ title: "", author: "", year: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = () => {
    if (editBook) {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === editBook.id
            ? { ...b, title: form.title, author: form.author, year: Number(form.year) }
            : b
        )
      );
    } else {
      const newBook: Book = {
        id: books.length + 1,
        title: form.title,
        author: form.author,
        year: Number(form.year),
      };
      setBooks([...books, newBook]);
    }
    setForm({ title: "", author: "", year: "" });
    setEditBook(null);
    onClose();
  };

  const handleEdit = (book: Book) => {
    setEditBook(book);
    setForm({ title: book.title, author: book.author, year: book.year.toString() });
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
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>Year</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map((book) => (
              <Tr key={book.id}>
                <Td>{book.title}</Td>
                <Td>{book.author}</Td>
                <Td>{book.year}</Td>
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
      <Modal isOpen={isOpen} onClose={() => { onClose(); setEditBook(null); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editBook ? "Edit Book" : "Add New Book"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Book title"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Author</FormLabel>
              <Input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author name"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Year</FormLabel>
              <Input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder="Publication year"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddOrEdit}>
              {editBook ? "Save Changes" : "Add Book"}
            </Button>
            <Button onClick={() => { onClose(); setEditBook(null); }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
