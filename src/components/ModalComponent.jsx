/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

function ModalComponent(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState(""); 
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (props.editItem) {
      setTitle(props.editItem.title);
      setDescription(props.editItem.description);
      setReminder(props.editItem.reminder || ""); 
      setIsEditing(true);
    } else {
      setTitle("");
      setDescription("");
      setReminder("");
      setIsEditing(false);
    }
  }, [props.editItem]);

  const closeModal = () => {
    props.handleClose();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "" && description.trim() !== "") {
      if (isEditing) {
        // Update existing todo
        props.setData(prevData =>
          prevData.map(item =>
            item.id === props.editItem.id
              ? { ...item, title, description, reminder }
              : item
          )
        );
      } else {
        // Add new todo
        props.setData([
          ...props.data,
          { id: Date.now(), title, description, reminder, completed: false },
        ]);
      }
      setTitle("");
      setDescription("");
      setReminder("");
      closeModal();
    }
  };

  const handleDelete = () => {
    if (props.editItem) {
      props.setData(prevData =>
        prevData.filter(item => item.id !== props.editItem.id)
      );
      closeModal();
    }
  };

  return (
    <div
      className={`modal fade ${props.showModal ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: props.showModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditing ? "Edit Todo" : "Add New Todo"}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="reminder" className="form-label">
                  Reminder (Optional)
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="reminder"
                  placeholder="Set a reminder"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Save Changes" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;
