import axios from "axios";
import Geocode from "react-geocode";

const treatApi = axios.create({
  baseURL: "https://treat-yo-shelf-backend.herokuapp.com/api/",
});

export const getAllBooks = (title, author) => {
  return treatApi.get(`/books`, { params: { title, author } }).then((data) => {
    return data.data;
  });
};

//

export const getSingleBook = (book_id) => {
  return treatApi.get(`/books/${book_id}`).then((data) => {
    return data.data;
  });
};

export const createNewUser = (user_id, username, email, location) => {
  console.log(location);
  return treatApi
    .post(`/users`, { user_id, username, email, location })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserBookshelf = (user_id) => {
  return treatApi.get(`/users/${user_id}/books`).then((data) => {
    console.log(data.data);
    return data.data;
  });
};

export const changeUsername = (user_id, username) => {
  return treatApi.patch(`/users/${user_id}`, { username }).catch((err) => {
    console.log(err);
  });
};

export const changeAvatar = (user_id, avatar_pic) => {
  return treatApi.patch(`/users/${user_id}`, { avatar_pic }).catch((err) => {
    console.log(err);
  });
};

export const addBookToMyBookshelf = (book, user_id) => {
  console.log(book);
  const { title, authors, description, publishedDate, images } = book;
  console.log(images.thumbnail);

  const newBook = {
    title,
    authors,
    description,
    quality: 5,
    thumbnail: images.thumbnail,
  };

  return treatApi.post(`/users/${user_id}/books`, newBook).then((res) => {
    console.log(res);
  });
};

export const deleteBookFromBookshelf = (book_id) => {
  return treatApi.delete(`/books/${book_id}`).then((res) => {
    console.log(res);
  });
};

export const getUserInfo = (user_id) => {
  return treatApi.get(`/users/${user_id}`).then((data) => {
    return data.data;
  });
};

export const getUserName = (id) => {
  return treatApi
    .get(`/users/${id}`)
    .then(({ data }) => {
      return data.user.username;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addExchangeRequest = (book_id, user_id) => {
  return treatApi
    .post(`/users/${user_id}/exchanges`, { book_id })
    .then((response) => {
      console.log(response);
    });
};

export const getAllExchanges = (user_id) => {
  return treatApi.get(`/users/${user_id}/exchanges`).then(({ data }) => {
    console.log(data);
    return data.exchanges;
  });
};

export const sendBook = (exchange_id, user_id) => {
  return treatApi
    .patch(`/users/${user_id}/exchanges/${exchange_id}`, { book_sent: true })
    .then(({ data }) => {
      console.log(data);
    });
};

export const receiveBook = (exchange_id, user_id) => {
  return treatApi
    .patch(`/users/${user_id}/exchanges/${exchange_id}`, {
      book_received: true,
    })
    .then(({ data }) => {
      console.log(data);
    });
};

export const removeRequest = (exchange_id, user_id) => {
  return treatApi
    .delete(`/users/${user_id}/exchanges/${exchange_id}`)
    .catch((err) => {
      console.log(err);
    });
};
