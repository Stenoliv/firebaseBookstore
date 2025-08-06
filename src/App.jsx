import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import BookTable from "./components/BookTable";
import AddBookModal from "./components/AddBookModal";

const firebaseUrl = import.meta.env.VITE_FIREBASE_URL;

function App() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(firebaseUrl + `.json`);
      const data = await response.json();

      const booksArray = data.books
        ? Object.entries(data.books).map(([id, book]) => ({ id, ...book }))
        : [];

      setBooks(booksArray);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async (book) => {
    try {
      const newBook = {
        title: book.title || "",
        author: book.author || "",
        isbn: book.isbn || "",
        price: book.price || "",
        year: book.year || "",
      };

      await fetch(`${firebaseUrl}/books.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      fetchBooks();
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${firebaseUrl}/books/${id}.json`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            📚 Firebase Bookstore
          </Typography>
          <Button color="inherit" onClick={() => setOpen(true)}>
            Add Book
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <BookTable books={books} onDelete={handleDelete} />

        <AddBookModal
          open={open}
          onClose={() => setOpen(false)}
          onAdd={addBook}
        />
      </Container>
    </>
  );
}

export default App;
