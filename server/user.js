const users = [];

// Add user
const addUser = ({ id, name, room }) => {
  name = name.trim().charAt(0).toUpperCase() + name.slice(1);
  room = room.trim().toLowerCase();

  if (name.length === 0) return { error: `name cannot be empty` };

  const isUserExisting = users.find(
    user => user.room === room && user.name === name
  );
  if (isUserExisting) return { error: "Username is already taken" };

  const user = { id, name, room, connected: true };
  users.push(user);
  // console.log("totalusers", users);

  return { user };
};

// Remove users
const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index != -1) return users.splice(index, 1)[0];
  else console.log(`User not found`);
};

// Get a user by id
const getUser = id => users.find(user => user.id === id);

// Get all users in a room
const getUserInRoom = room => {
  return users.filter(user => user.room === room);
};

module.exports = { getUser, addUser, removeUser, getUserInRoom };
