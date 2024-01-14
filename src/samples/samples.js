// Get saved data or initialize empty array
let floors = JSON.parse(localStorage.getItem('floors')) || [];

// FLOORS CRUD OPERATIONS

function createFloor(floor) {
    floor.id = floors.length + 1;
    floor.rooms = [];
    floors.push(floor);
    saveToLocalStorage();
}

function getFloor(id) {
    return floors.find(f => f.id === id);
}

function updateFloor(updatedFloor) {
    const index = floors.findIndex(f => f.id === updatedFloor.id);
    floors[index] = {...floors[index], ...updatedFloor};
    saveToLocalStorage();
}

function deleteFloor(id) {
    floors = floors.filter(f => f.id !== id);
    saveToLocalStorage();
}

// ROOMS CRUD OPERATIONS

function createRoom(floorId, room) {
    const floor = getFloor(floorId);
    room.id = floor.rooms.length + 1;
    floor.rooms.push(room);
    saveToLocalStorage();
}

function updateRoom(floorId, updatedRoom) {
    const floor = getFloor(floorId);
    const index = floor.rooms.findIndex(r => r.id === updatedRoom.id);
    floor.rooms[index] = {...floor.rooms[index], ...updatedRoom};
    saveToLocalStorage();
}

function deleteRoom(floorId, roomId) {
    const floor = getFloor(floorId);
    floor.rooms = floor.rooms.filter(r => r.id !== roomId);
    saveToLocalStorage();
}

// Persist updated data to local storage
function saveToLocalStorage() {
    localStorage.setItem('floors', JSON.stringify(floors));
}

// Export module functions
module.exports = {
    createFloor,
    getFloor,
    updateFloor,
    deleteFloor,
    createRoom,
    updateRoom,
    deleteRoom
};
