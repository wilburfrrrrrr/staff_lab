// 
//  
import {useState } from "react"

export default function CreateUser(){
    const[textName,setTextInputName] = useState('')
    const[textPassword,setTextInputPassword] = useState('')
    function handleInputName(e){
        setTextInputName(e.target.value)
    }
    function handleInputPassword(e){
        setTextInputPassword(e.target.value)
        
    }
    function handleSubmit(e){
        e.preventDefault()
        console.log(textName, textPassword)
        fetch("http://127.0.0.1:8000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                name: textName,
                password: textPassword,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la solicitud");
                }
                return response.json(); 
            })
            .then((data) => {
                console.log("Usuario creado:", data);
                setTextInputName("");
                setTextInputPassword("");
            })
            .catch((error) => {
                console.error("Hubo un error:", error);
            });
    }

    return (
        <form>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text"  onChange={handleInputName} value={textName}></input>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" onChange={handleInputPassword} value={textPassword} ></input>
            <input type="submit" value= "Create User" onClick={handleSubmit} ></input>
        </form>
    )
}
