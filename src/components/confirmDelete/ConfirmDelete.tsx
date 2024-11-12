import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./confirmDelete.css";

interface ConfirmDeleteProps {
  funcYes: (id: number) => void;
  id: number;
}

function ConfirmDelete({ funcYes, id }: ConfirmDeleteProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleShow();
        }}
        style={{ backgroundColor: "#fe0000" }}
      >
        Delete
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="custom-offcanvas"
      >
        <Offcanvas.Body>
          <p className="txt-ask">
            ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?
          </p>

          <div className="button-container">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                funcYes(id);
                handleClose();
              }}
            >
              Yes
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose();
              }}
            >
              No
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ConfirmDelete;
