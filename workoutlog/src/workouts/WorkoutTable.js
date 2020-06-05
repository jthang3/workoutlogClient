import React from "react";
import {Table,Button} from "reactstrap";

const WorkoutTable = (props) =>{
    //delete method
    const deleteWorkout = (workout)=>{
        fetch(`http://localhost:3000/log/${workout.id}`,{
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": props.token
            })
        })
    }
    const workoutMapper = ()=>{
        let condition =  props.workouts.Log;
        let myWorkOut;
        if(condition !== undefined){
            myWorkOut = condition;
            return (myWorkOut.map((workout,index)=>{
                return(
                    <tr key = {index}>
                        <th scope = "row">{workout.id}</th>
                        <td>{workout.result}</td>
                        <td>{workout.description}</td>
                        <td>{workout.definition}</td>
                        <td>
                            <Button color = "warning" onClick = {()=>{
                                props.editUpdateWorkout(workout);
                                props.updateOn();
                            }}>Update</Button>
                            <Button color = "danger" onClick = {()=>{
                                deleteWorkout(workout);
                            }}>Delete</Button>
                        </td>
                    </tr>
                )
            }))
        }
        else{
            myWorkOut = [];
        }
        // if(myWorkOut.length > 0){
        //     console.log(myWorkOut);
        //     // myWorkOut.forEach(workout=>{
        //     //     console.log(workout.description);
        //     // })
        //     return (myWorkOut.map((workout,index)=>{
        //         return(
        //             <tr key = {index}>
        //                 <th scope = "row">{workout.id}</th>
        //                 <td>{workout.result}</td>
        //                 <td>{workout.description}</td>
        //                 <td>{workout.definition}</td>
        //                 <td>
        //                     <Button color = "warning" onClick = {()=>{
        //                         props.editUpdateWorkout(workout);
        //                         props.updateOn();
        //                     }}>Update</Button>
        //                     <Button color = "danger" onClick = {()=>{
        //                         deleteWorkout(workout);
        //                     }}>Delete</Button>
        //                 </td>
        //             </tr>
        //         )
        //     }))
        // }
    }
 
    return(
        <>
            <h3>Workout History</h3>
            <hr/>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Result</th>
                        <th>Description</th>
                        <th>Definition</th>
                    </tr>
                </thead>
                    <tbody>
                        {workoutMapper()}
                        {props.fetchWorkouts()}
                    </tbody>
            </Table>
        </>
    );
}

export default WorkoutTable;