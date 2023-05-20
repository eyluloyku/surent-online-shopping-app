import React, { useState } from 'react';
import "./AdminLogin.css"

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


  return (
    <div>
        <div class="form">
            <h2>Admin Login</h2>
            <div class="form-item">
                <input type="text" id="email" autocomplete="off" required  />
                <label for="email">email</label>
            </div>
            
            <div class="form-item">
                <input type="password" id="password" autocomplete="off" required />
                <label for="password">Password</label>
            </div>

            <button type="submit" className='adminNbtn'>Login</button>
        </div>
    </div>
  )
}

export default AdminLogin