
import { Link ,useNavigate} from 'react-router-dom'
import React, { Component,useState,useEffect } from "react";
import Modal from "./Modal";
import axios from 'axios';  
import { Col,Form , Navbar, Nav, Container, Row, NavDropdown, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
function Dashboard() {

   let [viewCompleted,setViewCompleted]=useState(false)
   let [activeItem,setActiveItem]=useState({
             title: "",
             description: "",
             completed: false
           })
   let [taskList,setTaskList]=useState([])
   let [modal,setModal]=useState(null)
   const [user, setUser] = useState(localStorage.getItem('user'))
   let refreshList = () => {
    axios 
      .get("/api/tasks/",
      {
        headers: {
            'Content-type': 'application/json',
             'Authorization': `Bearer ${JSON.parse(user).token}`
        }
    }
      )
      .then(res =>setTaskList(res.data ))
      .catch(err => console.log(err));
  };
  let navigate=useNavigate()
   useEffect(()=>{
       if(!user){
          return logoutHandler()
       }
       refreshList()
   },[user])
   let logoutHandler=()=>{
       localStorage.removeItem('user')
       navigate('/login',{replace:true}) 
   }
  let displayCompleted = status => {
    if (status) {
      return setViewCompleted(true);
    }
    return setViewCompleted(false);
  };


  let renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => displayCompleted(true)}
          className={viewCompleted ? "active" : ""}
        >
          completed
            </span>
        <span
          onClick={() => displayCompleted(false)}
          className={viewCompleted ? "" : "active"}
        >
          Incompleted
            </span>
      </div>
    );
  };
  let renderItems = () => {
    const newItems = taskList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item._id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() =>handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };
  let toggle = () => {
    setModal(!modal);
  };
  let handleSubmit = item => {
    toggle();
    if (item._id) {
      // if old post to edit and submit
      axios
        .patch(`/api/tasks/${item._id}/`,
        item,
        {
        headers: {
            'Content-type': 'application/json',
             'Authorization': `Bearer ${JSON.parse(user).token}`
        }
       })
        .then(res => refreshList())
        .catch(err => refreshList());
      return;
    }
    axios
      .post("/api/tasks/",item,
      {
        headers: {
            'Content-type': 'application/json',
             'Authorization': `Bearer ${JSON.parse(user).token}`
        }
    })
      .then(res => refreshList())
      .catch(err => refreshList());
  };
  let handleDelete = item => {
    axios
      .delete(`/api/tasks/${item._id}/`,
      {
        headers: {
            'Content-type': 'application/json',
             'Authorization': `Bearer ${JSON.parse(user).token}`
        }
    })
      .then(res => refreshList())
      .catch(err => refreshList());
  };
  let createItem = () => {
    const item = { title: "", description: "", completed: false };
    setModal(!modal)
    setActiveItem(item)
  };
  let editItem = item => {
    setModal(!modal)
    setActiveItem(item) 
  };


    return (
        <div>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container fluid>
                <LinkContainer to='/'>
                    <Navbar.Brand>Task Manager</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">                                
                                <Nav className="ml-auto">
                                       <NavDropdown title='Account' id='adminmenue'>
                                        <NavDropdown.Item onClick={()=>setUser(null)}>Logout</NavDropdown.Item>
                                       </NavDropdown>
                                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
      <main className="content">
        <h1 className="text-black text-uppercase text-center my-4">Task Manager</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={createItem} className="btn btn-primary">
                  Add task
                    </button>
              </div>
              {renderTabList()}
              <ul className="list-group list-group-flush">
                {renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {modal ? (
          <Modal
            activeItem={activeItem}
            toggle={toggle}
            onSave={handleSubmit}
          />
        ) : null}
      </main>
        </div>
    );
}
export default Dashboard;
