const sampleFloors = () => [
    {
        id: 1,
        floor_number: 1,
        description: "First floor with conference rooms and lobby",
        rooms: [
            { id: 101, name: "Conference Room A", capacity: 12, x: 100, y: 100, width: 150, height: 100 },
            { id: 102, name: "Lobby", x: 300, y: 100, width: 200, height: 150 },
            // Add more rooms with x, y, width, and height properties
        ],
    },
    {
        id: 2,
        floor_number: 2,
        description: "Second floor with offices",
        rooms: [
            { id: 201, name: "Office 201", capacity: 2, x: 100, y: 300, width: 150, height: 100 },
            { id: 202, name: "Office 202", capacity: 2, x: 300, y: 300, width: 200, height: 150 },
            // Add more rooms with x, y, width, and height properties
        ],
    },
    // Add more floors as needed
];

export default sampleFloors;