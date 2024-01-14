const sampleFloors = () => [
    {
        id: 1,
        floor_number: 1,
        description: "First floor with conference rooms and lobby",
        rooms: [
            { id: 101, name: "Conference Room A", capacity: 12 },
            { id: 102, name: "Lobby" },
            // Add more rooms as needed
        ]
    },
    {
        id: 2,
        floor_number: 2,
        description: "Second floor with offices",
        rooms: [
            { id: 201, name: "Office 201", capacity: 2 },
            { id: 202, name: "Office 202", capacity: 2 },
            // Add more rooms as needed
        ]
    },
    // Add more floors as needed
];

export default sampleFloors;