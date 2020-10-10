import React, {Component} from 'react'
import {Container, Row} from 'react-bootstrap'
import axios from 'axios'

class EhrazHoviat extends Component {

    state= {
        selectedFile: null

    }

    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        axios.post("http://192.168.1.190:8000/userAccount/api/UserKYC/", data, { 
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    }

    onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }
    onclickooo = () =>{
        axios.get("http://192.168.1.190:8000/userAccount/api/UserKYC/",{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res=>console.log(res.data))

        }
    
    

    render() {

        return (
            <Container>
                <Row>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
                <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 

                <button onClick={this.onclickooo}>get</button>
                </Row>
            </Container>

        )
    }
}

export default EhrazHoviat