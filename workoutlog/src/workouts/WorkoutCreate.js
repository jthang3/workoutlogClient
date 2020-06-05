import React, {useEffect,useState} from "react";
import {Button,Form,FormGroup,Label,Input} from "reactstrap";
import WorkoutIndex from "./WorkoutIndex";


const WorkoutCreate = (props)=>{
    const [description,setDescription] = useState("");
    const [definition,setDefinition] = useState("time");
    const [result,setResult] = useState("");
    const api = "http://localhost:3000/log";
    const handleSubmit = (e)=>{
        e.preventDefault();
        fetch(api,{
            method: "POST",
            body: JSON.stringify({description: description,definition: definition,result:result}),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": props.token
            })
        })
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
            setDescription("");
            setDefinition("");
            setResult("");
            alert("Form successfully submitted!!");
        })
    }
    return(
        <>
            <h3>Log a Workout</h3>
            <Form onSubmit = {(e)=>handleSubmit(e)}>
                <FormGroup>
                    <Label htmlFor = "description">Description</Label>
                    <Input name = "description" type = "text" value = {description} onChange = {e=>setDescription(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor = "definition">Definition</Label>
                    <Input name = "definition" type = "select" value = {definition} onChange = {e=>setDefinition(e.target.value)}>
                        <option value = "time">Time</option>
                        <option value = "Weight">Weight</option>
                        <option value = "Distance">Distance</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor = "result">Result</Label>
                    <Input name = "result" value = {result} onChange = {e=>setResult(e.target.value)} required/>
                </FormGroup>
                <Button type = "submit">Click to Submit</Button>
            </Form>
        </>
    );
}

export default WorkoutCreate;