const users = [];
const allUsers = [];
const admins = [];
const rooms = ["JavaScript", "React", "Java", "Python", "Ruby"];

// Delete Room
const deleteRoom = room => {
  const index = rooms.findIndex(
    deleteRoom => deleteRoom.toLowerCase() === room.toLowerCase()
  );

  users.forEach(user => {
    const index = users.findIndex(() => user.room === room);
    if (index != -1) users.splice(index, 1)[0];
  });

  // Push the deleted user to default room 'javascript'
  if (index != -1) {
    const room = rooms.splice(index, 1)[0];
  }
};

// Create a Room
const createRoom = ({ room, id, name }) => {
  // Capitalize first letter of the room
  room = room.charAt(0).toUpperCase() + room.slice(1);

  if (!room) return { roomError: `name or room cannot be empty` };

  const isRoomAlreadyCreated = rooms.find(
    roomName => room.toLowerCase() === roomName.toLowerCase()
  );

  if (isRoomAlreadyCreated) return { roomError: "Room is already created" };
  rooms.push(room);
  admins.push({ id, name, room });

  // return rooms;
};

const getAdmins = room => {
  const admin = admins.filter(
    admin => admin.room.toLowerCase() === room.toLowerCase()
  );
  return admin;
};

// Add user
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!name && room.length) return { error: `name or room cannot be empty` };

  const isUserExisting = users.find(
    user => user.room === room && user.name === name
  );

  if (isUserExisting) return { error: "Username is already taken" };

  const user = { id, name, room };
  allUsers.push({ id, name });
  users.push(user);

  return { user };
};

// Get all Rooms
const getRooms = () => {
  return rooms;
};

// Remove user using id
const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index != -1) return users.splice(index, 1)[0];
};

// Get a user by id
const getUser = id => users.find(user => user.id === id);

// Get all users in a room
const getUserInRoom = room => {
  if (!room) return;
  room = room.toLowerCase();
  return users.filter(user => user.room === room);
};

// Get all users connected
const getUsers = () => {
  return users;
};

module.exports = {
  getUser,
  getRooms,
  createRoom,
  addUser,
  removeUser,
  getUserInRoom,
  getUsers,
  deleteRoom,
  getAdmins,
};
