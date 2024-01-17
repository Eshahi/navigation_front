import React from "react";


const FloorDropDown = ({getSelectedFloorDescription,handleSelectFloor,floors}) => {
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn m-1">
                {  getSelectedFloorDescription()}
            </label>

            <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                {floors.map(floor => (
                    <li key={floor.id}>
                        <a onClick={() => handleSelectFloor(floor.id)}>{floor.description}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default FloorDropDown;