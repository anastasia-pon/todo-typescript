const baseUrl = 'http://localhost:8080/';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const createNewUser = (user: User) => fetch(`${baseUrl}api/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});

const createUser = (user: User) => fetch(`${baseUrl}api/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});

export {
  createNewUser,
  createUser,
};
