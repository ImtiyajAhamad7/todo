import  { useState } from 'react';
import TodoItem from './TodoItem';
import ModalComponent from './ModalComponent';
import bgImage from '../assets/bg.jpg';
const TodoList = () => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [editItem, setEditItem] = useState(null); // For handling edit functionality

    // Toggle modal visibility
    const handleModal = () => {
        setShowModal(prev => !prev);
    };

    // Open modal for adding a new todo
    const openAddModal = () => {
        setEditItem(null); // Ensure no item is set for editing
        handleModal();
    };

    // Open modal for editing an existing todo
    const openEditModal = (item) => {
        setEditItem(item);
        handleModal();
    };

    const handleToggleComplete = (id) => {
        setData(prevData =>
            prevData.map(item =>
                item.id === id
                    ? { ...item, completed: !item.completed }
                    : item
            )
        );
    };
    const handleDelete = (id) => {
        setData(prevData => prevData.filter(item => item.id !== id));
    };

    return (
        <>
             <div className="container my-4">
                <button className="btn btn-primary mb-3" onClick={openAddModal}>
                    Add New
                </button>
                <div className="row">
                    {data.length > 0 ? (
                        data.map(item => (
                            <div key={item.id} className="col-md-4 mb-4">
                                <TodoItem
                                    title={item.title}
                                    description={item.description}
                                    isComplete= {item.completed}
                                    onEdit={() => openEditModal(item)}
                                    reminder={item.reminder} 
                                    onToggleComplete={() => handleToggleComplete(item.id)}
                                    handleDelete = {()=>handleDelete(item.id)}
                                    bgImage={bgImage}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <h1 className="text-center">No todos found</h1>
                        </div>
                    )}
                </div>
            </div>

        <ModalComponent
                showModal={showModal}
                handleClose={handleModal}
                setData={setData}
                data={data}
                editItem={editItem}
            />

        </>
    );
}

export default TodoList;
