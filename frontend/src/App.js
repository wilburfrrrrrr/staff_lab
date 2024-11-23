import {useEffect, useState} from 'react'
import UserBox from './components/userBox'
import CreateUser from './components/createUser'
function App() {
  const[users, setUsers] = useState([])
  useEffect(() =>{
  fetch ('http://127.0.0.1:8000/api/users')
  .then(res=> res.json())
  .then(res=> setUsers(res))
  },[])
  return (
    <main>
      <h1>hola</h1>
      <CreateUser/>
      {
        users.map(user => (
        <UserBox name={user.name} password={user.password} id={user.id} key={user.id}/>
        ))      
      }
    </main>
  )

}

export default App;
