import React from "react";

export const TaskList = ({ tasks, onDelete }) => {
    if (tasks.length === 0) {
        return <p className="empty-message">No hay tareas, añadir tareas</p>;
    }
    return (
        <>
            <p>Tares pendientes: {tasks.length}</p>
            {tasks.map((task) => (
                <div className="content-list" key={task.id}>
                    <p className="content-list-p"><i className="fa-solid fa-arrow-right"></i> {task.label}</p>
                    <button className="content-list-btn" onClick={() => onDelete(task.id)}>x</button>
                </div>
            ))}
        </>
    );
};