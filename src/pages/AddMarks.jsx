import React, { useState } from 'react'
import '../styles/addMarks.css'
import UserDetails from '../components/UserDetails'
import { useNavigate } from 'react-router-dom';

export default function AddMarks() {

    const [subject1, setsubject1]=useState("");
    const [subject2, setsubject2]=useState("");
    const [subject3, setsubject3]=useState("");
    const [subject4, setsubject4]=useState("");
    const [subject5, setsubject5]=useState("");

    const navigate=useNavigate();

    const { user, login, logout } = UserDetails();
    const calculateTotal = () => {
        return (parseFloat(subject1) || 0) + 
               (parseFloat(subject2) || 0) + 
               (parseFloat(subject3) || 0) + 
               (parseFloat(subject4) || 0) + 
               (parseFloat(subject5) || 0);
    };
    const total = calculateTotal();

    console.log(total);

    const email=user.username;
    const handleSubmit = async()=>{
        try {
            

            const res = await fetch("http://localhost:7000/add-data",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({ email, subject1, subject2, subject3, subject4, subject5, total })

            })

            const data = await res.json();
            console.log(data);
            if(!res.ok){
                throw new Error ("HTTP Error");
            }
            console.log("Added succesfully");

            logout();
            alert("Sign in again/with another account to add marks");
            navigate('/MarksDatabase/');
            
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div className='addMarks'>
            <h3>Add marks: </h3>
            <form onSubmit={handleSubmit}>
            
                <input type="number" placeholder='Enter mark 1' onChange={(e) => setsubject1(e.target.value)} required/>
           
                <input type="number" placeholder='Enter mark 2' onChange={(e) => setsubject2(e.target.value)} required/>
            
                <input type="number" placeholder='Enter mark 3' onChange={(e) => setsubject3(e.target.value)} required/>
            
                <input type="number" placeholder='Enter mark 4' onChange={(e) => setsubject4(e.target.value)} required/>
            
                <input type="number" placeholder='Enter mark 5' onChange={(e) => setsubject5(e.target.value)} required/>
            <br />
            <button>Submit</button>
            </form>
        </div>
    )
}
