import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components'

export default class ToDoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            form_alert: false,
            value: '',
            to_do_list: [],
            update_value: '',
            url: 'https://farhan-to-do-db.herokuapp.com' //Chnage it to localhost when working locally
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.showUpdateBar = this.showUpdateBar.bind(this)
        this.handleChangeUpdate = this.handleChangeUpdate.bind(this)
        this.handleUpdateAction = this.handleUpdateAction.bind(this)
        this.handleUpdateCancel = this.handleUpdateCancel.bind(this)
    }
    handleChange(event){
        this.setState({
            value: event.target.value
        })
    }
    handleEnter(event){
        if(event.charCode ===13){
            let url_host = this.state.url
            let endpoint = url_host + "/add-data"

            let data = this.state.value
            let formData = {
                "data": data
            }
            if(formData.data === ""){
                this.setState({
                    form_alert: true
                })

            }
            else{
                fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }).then(new_fetch =>{
                    url_host = this.state.url
                    endpoint = url_host + "/get-list"
                    fetch(endpoint)
                    .then(response => response.json())
                    .then((data) => {
                        this.setState({
                            to_do_list: data
                        })
                    })
        
                })
                this.setState({
                    value: '',
                })
            }
            event.preventDefault();
            }
    }
    handleSubmit(event){

        let url_host = this.state.url
        let endpoint = url_host + "/add-data"

        let data = this.state.value
        let formData = {
            "data": data
        }
        if(formData.data === ""){
            this.setState({
                form_alert: true
            })

        }
        else{
            fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }).then(new_fetch =>{
                url_host = this.state.url
                endpoint = url_host + "/get-list"
                fetch(endpoint)
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        to_do_list: data
                    })
                })
    
            })
            this.setState({
                value: '',
            })
        }
        
        event.preventDefault();
    }
    handleDelete(event){
        const id = event.target.getAttribute("identifier")
        let url_host = this.state.url
        let endpoint = url_host + "/delete-data/" + id

        fetch(endpoint)
        //.then(response => {response.json()})
        .then(new_fetch =>{
            url_host = this.state.url
            endpoint = url_host + "/get-list"
            fetch(endpoint)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    to_do_list: data
                })
            })

        })

    }
    showUpdateBar(event){
        const identifier = event.target.getAttribute('identifier')

        const attributeForm = document.getElementById(`todo-update-${identifier}`)
        attributeForm.setAttribute('style', "display:show")
        //hide the first button
        const attributeButton = document.getElementById(`to-do-button-update-${identifier}`)
        attributeButton.setAttribute('style',"display:none")
        //show the second button that will call the api
        const attributeButtonMain = document.getElementById(`to-do-button-update-main-${identifier}`)
        attributeButtonMain.setAttribute('style',"display:show")
        const attributeButtonMainCancel = document.getElementById(`to-do-button-update-cancel-main-${identifier}`)
        attributeButtonMainCancel.setAttribute('style',"display:show")
    }
    handleUpdateCancel(event){
        const identifier = event.target.getAttribute('identifier')

        const attributeForm = document.getElementById(`todo-update-${identifier}`)
        attributeForm.setAttribute('style', "display:none")
        //hide the first button
        const attributeButton = document.getElementById(`to-do-button-update-${identifier}`)
        attributeButton.setAttribute('style',"display:show")
        //show the second button that will call the api
        const attributeButtonMain = document.getElementById(`to-do-button-update-main-${identifier}`)
        attributeButtonMain.setAttribute('style',"display:none")
        const attributeButtonMainCancel = document.getElementById(`to-do-button-update-cancel-main-${identifier}`)
        attributeButtonMainCancel.setAttribute('style',"display:none")
    }
    //the handle to update state as update value is written
    handleChangeUpdate(event){
        this.setState({
            update_value: event.target.value
        })
    }
    handleUpdateAction(event){
        const identifier = event.target.getAttribute('identifier')
        let url_host = this.state.url
        let endpoint = url_host + "/update-data/" + identifier

        let data = this.state.update_value
        let formData = {
            "data": data
        }
        if(formData.data === ""){
            this.setState({
                form_alert: true
            })

        }
        else{
            fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }).then(new_fetch =>{
                url_host = this.state.url
                endpoint = url_host + "/get-list"
                fetch(endpoint)
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        to_do_list: data
                    })
                })
    
            })
            //reset display:
            const attributeForm = document.getElementById(`todo-update-${identifier}`)
            attributeForm.setAttribute('style', "display:none")
            //hide the first button
            const attributeButton = document.getElementById(`to-do-button-update-${identifier}`)
            attributeButton.setAttribute('style',"display:show")
            //show the second button that will call the api
            const attributeButtonMain = document.getElementById(`to-do-button-update-main-${identifier}`)
            attributeButtonMain.setAttribute('style',"display:none")
            const attributeButtonMainCancel = document.getElementById(`to-do-button-update-cancel-main-${identifier}`)
            attributeButtonMainCancel.setAttribute('style',"display:none")
            this.setState({
                update_value: '',
            })
        }
        
        event.preventDefault();
    }
    componentDidMount(){
        const url_host = this.state.url
        const endpoint = url_host + "/get-list"
        fetch(endpoint)
        .then(response => response.json())
        .then((data) => {
            this.setState({
                to_do_list: data
            })
            //console.log(this.state.to_do_list)
            //console.log(data)
        })
    }
    componentDidUpdate(prevProp, prevState){
        if(prevState.to_do_list !== this.state.to_do_list){
            console.log(prevState.to_do_list, "previous state")
            console.log(this.state.to_do_list, "current state")
            //prevState.to_do_list = this.state.to_do_list
        }

    }

  render() {

    return (
        <React.Fragment>
            <Styles>
                <div>
                    <Form>
                    <Form.Group className="mb-3 to-do-form-add">
                        <Form.Control onKeyPress={this.handleEnter} type="text" placeholder="Enter your action item here" onChange={this.handleChange} value={this.state.value}  />
                        <Alert show={this.state.form_alert} variant='danger'>Please post something before posting!</Alert>
                        <Button className='to-do-button-add' variant="secondary" onClick={this.handleSubmit}>Add Action</Button>
                    </Form.Group>
                    </Form>
                    <ol>
                        {this.state.to_do_list.map(todo => (
                            <div key={todo.id} className='todo-items'>
                                
                                <li key={todo.id}>{todo.data}</li>
                                <div className="item-buttons">
                                    <Button variant='danger' identifier={todo.id} className='list-buttons' onClick={this.handleDelete}>Delete</Button>
                                    <Button variant='success' identifier={todo.id} className="to-do-button-update" id={`to-do-button-update-${todo.id}`} onClick={this.showUpdateBar}>Update</Button>
                                    <Form.Control type='text' className='update-form-text' identifier={todo.id} id={`todo-update-${todo.id}`} style={{display:'none'}} upvalue={todo.data} value={this.state.update_value} onChange={this.handleChangeUpdate}></Form.Control>
                                    <Alert show={this.state.form_alert} variant='danger'>Please post something before posting!</Alert>
                                    <Button variant='success' identifier={todo.id} className="to-do-button-update" id={`to-do-button-update-main-${todo.id}`} style={{display:'none'}} onClick={this.handleUpdateAction}>Update</Button>
                                    <Button variant='danger' identifier={todo.id} className="to-do-button-update" id={`to-do-button-update-cancel-main-${todo.id}`} style={{display:'none'}} onClick={this.handleUpdateCancel}>Cancel</Button>
                                </div>
                            </div>
                        ))}
                    </ol>

                </div>
            </Styles>
        </React.Fragment>
     
    )
  }
}

const Styles = styled.div`
    .to-do-form-add{
        padding-right:70px;
    }
    .to-do-button-add{
        margin-top:20px;
    }
	.item-buttons{
        display: flex;
        flex-direction: row;
    }
    .todo-items{
        position: relative;
        margin-top:10px;
        margin-right: 50px;
        height: 60px
      };
	.to-do-button-update{
        margin-left:20px;
    }
    .update-form-text{
        margin-left: 10px;
    }
	
	
`
