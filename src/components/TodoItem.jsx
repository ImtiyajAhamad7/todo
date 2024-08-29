/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../assets/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";

const TodoItem = (props) => {
  const [isCompleted, setIsCompleted] = useState(props.completed);

  useEffect(() => {
    setIsCompleted(props.completed);
  }, [props.completed]);

  const handleToggleComplete = () => {
    setIsCompleted((prev) => !prev);
    if (props.onToggleComplete) {
      props.onToggleComplete(props.id); 
    }
  };

  const handleDelete = () => {
    if (props.handleDelete) {
      props.handleDelete(props.id); 
    }
  };

  

  return (
    <div
      className="card mb-3 p-3 shadow-sm border-light"
      style={{
        backgroundImage: `url(${props.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "200px",
        color: "white",
        position: "relative",
      }}
    >
    
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>

      <div className="card-body" style={{ position: "relative", zIndex: 2 }}>
        <h5
          className="card-title"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            marginBottom: "0.5rem",
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-quote-left" /> {props.title}
        </h5>
        <p
          className="card-text"
          style={{
            fontSize: "1rem",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            lineHeight: "1.5",
            marginBottom: "1rem",
          }}
        >
          {props.description}
        </p>

        {isCompleted ? (
          <>
            <p
              className="card-text"
              style={{
                fontSize: "1rem",

                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backdropFilter: "blur(20px)",
                  color: "blue",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                <FontAwesomeIcon
                  icon={isCompleted ? faCheckSquare : faSquare}
                  style={{ marginRight: "0.5rem" }}
                />
                {isCompleted ? "Completed" : "Mark As Completed"}
              </span>
            </p>
          </>
        ) : (
          <>
            <p
              className="card-text"
              style={{
                fontSize: "1rem",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                lineHeight: "1.5",
                marginBottom: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={handleToggleComplete}
                style={{ marginRight: "0.5rem" }}
                className={isCompleted ? "text-success" : "text-white"}
              />
              {"Mark As completed"}
            </p>
          </>
        )}

        {props.reminder && (
          <span
            className="card-text"
            style={{
              fontSize: "0.9rem",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              marginTop: "1rem",
            }}
          >
            <strong>Reminder:</strong>{" "}
            {new Date(props.reminder).toLocaleString()}
          </span>
        )}

        {isCompleted ? (
          <>
            <button
              className="btn btn-primary"
              onClick={handleDelete}
              style={{ marginLeft: props.reminder ? "5px" : "0px" }}
            >
              Remove
            </button>
          </>
        ) : (
          <button
            className="btn btn-primary"
            onClick={props.onEdit}
            style={{ marginLeft: props.reminder ? "5px" : "0px" }}
          >
            Actions
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
