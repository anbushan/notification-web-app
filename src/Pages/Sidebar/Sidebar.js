import React, { useState } from "react";
import { Container, Offcanvas, Row, Col } from "react-bootstrap";
import { sidebarItems } from "./SidebarData";
import SidebarComponent from "../../Components/SidebarComponent";
import { MdMenu } from "react-icons/md";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="rounded position-fixed">
      {/* Large screens */}
      <Container
        fluid
        className="d-none d-lg-block d-xxl-block"
        style={{
          backgroundColor: "white",
          height: "100vh",
          width: "100%",
          overflowY: "auto",
          marginLeft: "-30px",
        }}
      >
        <SidebarComponent sidebarItems={sidebarItems} />
      </Container>

      {/* Small screens */}
      <Row className="d-flex d-lg-none rounded">
        <Col xs={12} className="text-end mt-2 mb-3">
          <MdMenu
            size={25}
            style={{ cursor: "pointer", color: "black" }}
            onClick={handleShow}
          />
        </Col>
        <Offcanvas
          scroll={true}
          show={show}
          onHide={handleClose}
          className="offcanvas-responsive "
          style={{ width: 280 }}
        >
          <Offcanvas.Header closeButton className="justify-content-end" />
          <Offcanvas.Body style={{ backgroundColor: "white" }}>
            <SidebarComponent
              onClick={handleClose}
              sidebarItems={sidebarItems}
            />
          </Offcanvas.Body>
        </Offcanvas>
      </Row>
    </div>
  );
};

export default Sidebar;
