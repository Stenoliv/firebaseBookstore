import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function AddBookModal({ open, onClose, onAdd }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    price: "",
    year: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(book);
    setBook({ title: "", author: "", isbn: "", price: "", year: "" });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Add New Book
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={book.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Author"
            name="author"
            value={book.author}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="ISBN"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            value={book.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Year"
            name="year"
            value={book.year}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default AddBookModal;
