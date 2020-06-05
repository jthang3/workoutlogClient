import React,{useState} from "react";
import {Form,FormGroup,Label,Input,Button} from "reactstrap";

const Signup = (props)=>{
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");
    let handleSubmit = (e)=>{
        e.preventDefault();
        if(!username){
            setMessage("user name is required");
        }
        else{
            setMessage("");
            fetch("http://localhost:3000/user/register",{
            method: "POST",
            //this has to match with the backend
            body: JSON.stringify({username:username,password:password}),
            headers: new Headers({
                //let our sever knows what type of information we are sending to
                "Content-Type": "application/json"
            })
        })
        .then(res=>res.json())
        .then(json=>{
            console.log(json.sessionToken)
            props.updateToken(json.sessionToken);
        })
        //.then(data=>props.updateToken(data.sessionToken))
        }
    }
    const showMessage = ()=>{
        return(
            <span>
                {message}
            </span>
        );
    }
    
    return(
        <div>
            <h1>Sign up</h1>
            <Form onSubmit = {handleSubmit} autoComplete="off">
                <FormGroup>
                    <Label htmlFor = "name">Username</Label>
                    <Input name = "name" type = "text"value = {username} onChange = {e=>setUsername(e.target.value)}/>
                    {showMessage()}<br/>
                    <Label htmlFor = "password">Password</Label>
                    <Input name = "password" type = "password" value = {password} onChange = {e=>setPassword(e.target.value)}/>
                </FormGroup>
                <Button type = "submit">Sign up</Button>
            </Form>
        </div>
    );
}

export default Signup;