import React from "react";
import "./modalEdit.css"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/esm/Button";

export default function ModalTest({ isOpen, children }) {
    if (isOpen) {
        return (
            <div>
              <Modal.Dialog>

                <Modal.Body>
                  {children}
                </Modal.Body>
              </Modal.Dialog>
            </div>
        )
    }
    return console.log("nao deu certo")

}
