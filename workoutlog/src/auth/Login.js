import React,{useState} from "react";
import {Form,FormGroup,Label,Input,Button} from "reactstrap";

const Login = (props)=>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");
    let handleSubmit = (e)=>{
        e.preventDefault();
        //username?setMessage(""): setMessage("Username required");
        if(username){
            setMessage("");
            fetch("http://localhost:3000/user/login",{
                method: "POST",
                body: JSON.stringify({username:username,password:password}),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            .then(res=>res.json())
            //.then(console.log)
            .then(data=>{
                props.updateToken(data.sesstionToken)
                if(!data.sesstionToken){
                    alert('incorrect password or username');
                }
            })
        }
        else{
            setMessage("Username required");
        }
    }
    const displayMessage = ()=>{
        return(
        <span>{message}</span>
        );
    }
    return(
        <div>
            <h1>Login</h1>
            <Form onSubmit = {e=>handleSubmit(e)} autoComplete="off">
                <FormGroup>
                    <Label htmlFor = "username">Username</Label>
                    <Input name = "username" type = "text" value = {username} onChange = {e=>setUsername(e.target.value)}/>
                    {displayMessage()}<br/> 
                    <Label htmlFor = "password">Password</Label>
                    <Input name = "password" type = "password" value = {password} onChange = {e=>setPassword(e.target.value)}/>
                </FormGroup>
                <Button type = "submit">Login</Button>
            </Form>
        </div>
    );
}

export default Login;