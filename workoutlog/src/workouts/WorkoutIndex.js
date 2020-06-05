import React, { useState,useEffect } from "react";
import {Container, Row, Col} from "reactstrap";
import WorkoutCreate from "./WorkoutCreate"
import WorkoutTable from "./WorkoutTable";
import WorkoutEdit from "./WorkoutEdit";

const WorkoutIndex = (props)=>{
    const [workout,setWorkout] = useState([]);
    const [updateActive,setUpdateActive] = useState(false);
    const [workoutToUpdate,setworkoutToUpdate] = useState({});

    //simple fetch workout function
    const fetchWorkout = ()=>{
        const api = "http://localhost:3000/log";
        fetch(api,{
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": props.token
            })
        })
        .then(res=>res.json())
        .then(json=>{
            setWorkout(json);
            //console.log("This is workout",workout);
        })
        // .then(json=>{
        //     setWorkout(json);
        //     console.log(workout);
        // })
    }

    const editUpdateWorkout = (workout) =>{
        setworkoutToUpdate(workout);
        console.log(workoutToUpdate);
    }

    const updateOn = () =>{
        setUpdateActive(true);
    }

    const updateOff = ()=>{
        setUpdateActive(false);
    }
//useEffect only run once when the DOM loaded because of the empty array.
    useEffect(()=>{
        fetchWorkout()
    },[])
    return(
        <Container>
            <Row>
                <Col md = "3">
                    {/*Create component will go here */}
                    <WorkoutCreate fetchWorkouts = {fetchWorkout} token = {props.token}/>
                </Col>
                <Col md = "9">
                    <WorkoutTable workouts = {workout} fetchWorkouts = {fetchWorkout} editUpdateWorkout = {editUpdateWorkout} 
                    updateOn = {updateOn} token = {props.token}/>
                </Col>
                {updateActive?<WorkoutEdit workoutToUpdate = {workoutToUpdate} updateOff = {updateOff} token = {props.token}
                fetchWorkouts = {fetchWorkout}/>:<></>}
            </Row>
        </Container>
    );
}

export default WorkoutIndex;
