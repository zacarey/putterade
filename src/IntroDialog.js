import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function IntroDialogDetail(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>Welcome to Putterade!</h4>
        <hr></hr>
        <p>
          Choose <b>Circle 1</b>, <b>Circle 2</b>, or <b>Both</b>
        </p>
        <p>
          Track <b>Makes (+)</b> and <b>Misses (-)</b> at 2 meter intervals
        </p>
        <p>View shot percentage across practice sessions</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function IntroDialog() {
  const firstTimeVisitor = localStorage.length === 0;
  const [modalShow, setModalShow] = React.useState(firstTimeVisitor);

  // eslint-disable-next-line
  return (
    <>
      <a href="#" onClick={() => setModalShow(true)}>
        About
      </a>
      <IntroDialogDetail show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default IntroDialog;
