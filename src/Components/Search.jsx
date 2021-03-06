import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "../CSS/Search.css";
import { getAllBooks } from "../api";
import { useAuth } from "../Contexts/UserAuth";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: { color: theme.palette.primary.main, fontSize: "24px" },
  header: {
    color: theme.palette.primary.dark,
    background: theme.palette.secondary.main,
    height: "50px",
    marginBottom: "1%",
    paddingTop: "0.75%",
  },
  btn: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: "70%",
    margin: "2% auto",
  },
  book: {
    textAlign: "center",
    background: theme.palette.secondary.light,
    padding: "3%",
    maxWidth: "300px",
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
    justifyContent: "space-between",
    borderRadius: "5px",
    margin: "1% auto",
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
  },
  viewBtn: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

function Search() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    getAllBooks().then((data) => {
      const filtered = data.books.books.filter((book) => {
        return book.owner_id !== currentUser.uid;
      });
      setBooks(filtered);
      setLoading(false);
    });
  }, []);

  const [formValue, setFormValue] = useState({});
  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title } = formValue;
    const { author } = formValue;

    getAllBooks(title, author).then((data) => {
      const filtered = data.books.books.filter((book) => {
        return book.owner_id !== currentUser.uid;
      });
      setBooks(filtered);
      setLoading(false);
    });
  };
  return (
    <div className="books-container">
      <div className={classes.header}>
        <h2>Book Search</h2>
      </div>
      <div className="search-results-container">
        <div>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            className="search-form"
          >
            <TextField
              style={{ margin: "1%" }}
              id="title"
              name="title"
              label="Title"
              variant="filled"
              onChange={handleChange}
            />
            <TextField
              name="author"
              onChange={handleChange}
              style={{ margin: "1%" }}
              id="author"
              label="Author"
              variant="filled"
            />
            <Button className={classes.btn} type="submit" variant="outlined">
              Search
            </Button>
          </form>
        </div>
        <div className="results-list">
          {loading ? (
            <Loading />
          ) : (
            books.map((book, i) => {
              return (
                <div key={i} className={classes.book}>
                  <img src={book.thumbnail} alt="book"></img>
                  <div className="search-book-info">
                    <strong>{book.title}</strong>
                    <p>{book.authors.split(",").join(", ")}</p>
                    <Link
                      to={`/books/${book.book_id}`}
                      className={classes.modalBtn}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        size="medium"
                        className={classes.viewBtn}
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
