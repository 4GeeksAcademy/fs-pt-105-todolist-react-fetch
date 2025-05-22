import React from "react";

export const TaskInput = ({ value, onChange, onAdd, onDeleteAll }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Add task"
      />
      <button className="input-btn" onClick={onAdd}>Add</button>
      <button onClick={onDeleteAll} className="btn btn-danger">Delete</button>
    </div>
  );
};