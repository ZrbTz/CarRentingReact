import React from 'react';
import Form from 'react-bootstrap/Form';
import {AuthContext} from '../auth/AuthContext'
import Button from'react-bootstrap/Button';

class LoginForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {username:'', password:'', submitted:false};
    }

    onChangeUsername = (event) => {
        this.setState({username : event.target.value});
    }; 
    
    onChangePassword = (event) => {
        this.setState({password : event.target.value});
    };
    
    handleSubmit = (event, login) => {
        event.preventDefault();
        login(this.state.username, this.state.password);
        this.setState({submitted : true});
    }


    render(){
        return(
            <AuthContext.Consumer>
                {(context) => (
                    <Form method="POST" onSubmit={(event) => this.handleSubmit(event, context.loginUser)}>
                        <Form.Group controlId="username">
                            <Form.Label>E-mail</Form.Label>
                                <Form.Control type="email" name="email" placeholder="E-mail" value = {this.state.username} onChange={(ev) => this.onChangeUsername(ev)} required autoFocus/>
                             </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" value = {this.state.password} onChange={(ev) => this.onChangePassword(ev)} required/>
                        </Form.Group>

                        <Button variant="primary" type="submit">Login</Button>

                    </Form>
                )}
             </AuthContext.Consumer>
        )
    }
}

export default LoginForm;