import client from '../utils/client';

const endpoint = client.databaseURL;

// GET ALL AUTHORS
const getAuthors = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Authors.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applications/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// FILTER FAVORITE AUTHOR
const authorFavorite = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Authors.json?orderBy="uid"&equalTo"${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favoriteAuth = Object.values(data).filter((item) => item.favorite);
      resolve(favoriteAuth);
    })
    .catch(reject);
});

// CREATE AUTHOR
const createAuthor = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Authors.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET SINGLE AUTHOR
const getSingleAuthor = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Authors/${uid}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Authors/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE AUTHOR
const updateAuthor = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Authors/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/Books.json?orderBy="author_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
  authorFavorite,
};
