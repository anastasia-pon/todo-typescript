const baseUrl = 'http://localhost:8000/';

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

const getAllLists = (userId: string, accessToken: string) => fetch(`${baseUrl}api/todos/all`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify({ userId }),
});

export {
  createNewUser,
  getAllLists,
};
