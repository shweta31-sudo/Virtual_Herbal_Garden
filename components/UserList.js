// import { useEffect, useState } from "react";
// import { getUsers } from "../services/userService";
// import styled from "styled-components";
// import './UserList.css';

// const UserContainer = styled.div`
//     max-width: 600px;
//     margin: auto;
//     background: white;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//     margin-top: 50px;
// `;

// const UserList = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await getUsers();
//             setUsers(response.data);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };

//     return (
//         <UserContainer>
//             <h2>Registered Users 🌱</h2>
//             {users.length === 0 ? (
//                 <p>No users found.</p>
//             ) : (
//                 <ul>
//                     {users.map((user, index) => (
//                         <li key={index}>{user.username}</li>
//                     ))}
//                 </ul>
//             )}
//         </UserContainer>
//     );
// };

// export default UserList;
