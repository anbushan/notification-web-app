import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Notification from "./Pages/Notification";
import Sidebar from "./Pages/Sidebar/Sidebar";
import Products from "./Pages/Products";
import LanguageDropdown from "./Components/Language";

function App() {
  return (
    <div className="App">
      <Router>
        <Container
          fluid
          style={{
            backgroundColor: "#F5F6FA",
            height: "100vh",
            width: "100%",
            overflowY: "auto",
          }}
        >
          <Row>
            <Col lg={3} xxl={2} xl={2} xs={12}>
              <Sidebar />
            </Col>
            

            <Col lg={9} xxl={10} xl={10}>
              <Routes>
                {/* Private Routes */}
                <Route path="/" element={<Products />} />
                <Route path="/notify-add" element={<Notification />} />
              </Routes>
            </Col>
            
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
