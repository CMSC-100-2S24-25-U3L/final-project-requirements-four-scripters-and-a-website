import { useEffect, useState } from 'react';    // useEffect for 'using' certain code given a condition
                                                // useState for holding values like forms

// define the base url for all api requests (in the server running on localhost 3000)
const API_BASE = 'http://localhost:3000/users'; 

export default function UserManagement() {
  
  // like controllers from dart, but each state hook has a specific function that updates it
  const [users, setUsers] = useState([]);   // empty array called users and a function to update it => setUsers
  const [form, setForm] = useState({  // object with empty strings called form and a function to update it => setForm
    email: '',  
    firstName: '',
    middleName: '',
    lastName: '',
    password: ''
  });

  const [updateEmail, setUpdateEmail] = useState('');   // stores the email of the user to be updated
  const [updateData, setUpdateData] = useState({});     // stores the new values to update for that user
  const [deleteEmail, setDeleteEmail] = useState('');   // stores the email of the user to be deleted
  const [error, setError] = useState('');               // stores an error message (if any)

  // helper function that simplifies making API requests like (get, post, put, delete) to the server
  const callApi = async (route, method, body) => {
    try { // attempt to make the API request
      const res = await fetch(`${API_BASE}${route}`, {  // combine the base API and the route to get the full URL
        method, // the http method name
        headers: { 'Content-Type': 'application/json' }, // tells the server that we will are sending JSON data.
        body: body ? JSON.stringify(body) : undefined,   // the body is the data we want to send, if provided we will convert it to a JSON string 
      }); // res.ok = status codes 200-299, !res.ok = 400-599, if !res.ok, the request failed
      if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
      return res.json();  // if no errors, get the actial data as a javascript object from a JSON format
    } catch (err) {
      setError(err.message);  // set the error message to be the string inside the actual error (err)
      throw err;
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault(); // prevent this function from reloading the site
    setError(''); // clears any previous error message  
    try {
      const newUser = { ...form, userType: 'customer' };
      // spreads the current form data (email, password,...) adds the field userType and sets it to customer by default

      const result = await callApi('', 'POST', newUser);
      // sends a post request to the API to create the new user

      alert(`User created: ${result.email}`);
      // shows a prompt with the created user's emaul
      
      setForm({ email: '', firstName: '', middleName: '', lastName: '', password: '' });
      // clear the forms

      loadUsers();
      // refreshes the users list by calling the API again

    } catch (err) {}  // any errors will be handled by the callApi method
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateEmail) return setError('Email is required');
    // if there's no email, show an error message and stop the function

    if (Object.keys(updateData).length === 0) return setError('No fields to update');
    // if updateData is an empty object, show error and stop

    try {
      const result = await callApi(`/${encodeURIComponent(updateEmail)}`, 'PUT', updateData);
      // makes a PUT request to update the user by email
      // encodeURIComponent makes sure the email works safely in a URL
      
      alert(`User updated: ${result.email}`);
      // notify that the update succeeded

      setUpdateEmail('');
      setUpdateData({});
      // reset update form

      loadUsers();
      // refresh the user list
    } catch (err) {}
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    
    if (!deleteEmail) return setError('Email is required');
    // need an email to know who to delete
    
    try {
      const result = await callApi(`/${encodeURIComponent(deleteEmail)}`, 'DELETE');
      // sends a DELETE request to the API to delete the user with the given email

      alert(`User deleted: ${result.email}`);
      // show a message

      setDeleteEmail('');
      // clear the delete input

      loadUsers();
      // refresh the list
    } catch (err) {}
  };

  const loadUsers = async () => {
    try {
      const result = await callApi('', 'GET');
      // gets all users from the API

      setUsers(result);
      // stores them in the users array (via useState) for rendering

    } catch (err) {}
  };

  useEffect(() => { // this just makes the loadUsers function run at least once
    loadUsers();
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      <p style={{ color: 'red' }}>{error}</p>

      <h2>Create User</h2>
      <form onSubmit={handleCreate}>  
        {/* e.target.value is the value the user enters into the input field */}
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="First Name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
        <input placeholder="Middle Name" value={form.middleName} onChange={e => setForm({ ...form, middleName: e.target.value })} />
        <input placeholder="Last Name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Create</button>
      </form>

      <h2>Update User</h2>
      <form onSubmit={handleUpdate}>
        <input placeholder="Email to Update" value={updateEmail} onChange={e => setUpdateEmail(e.target.value)} />
        <input placeholder="New First Name" onChange={e => setUpdateData({ ...updateData, firstName: e.target.value })} />
        <input placeholder="New Middle Name" onChange={e => setUpdateData({ ...updateData, middleName: e.target.value })} />
        <input placeholder="New Last Name" onChange={e => setUpdateData({ ...updateData, lastName: e.target.value })} />
        <button type="submit">Update</button>
      </form>

      <h2>Delete User</h2>
      <form onSubmit={handleDelete}>
        <input placeholder="Email to Delete" value={deleteEmail} onChange={e => setDeleteEmail(e.target.value)} />
        <button type="submit">Delete</button>
      </form>

      <h2>User List</h2>
      <button onClick={loadUsers}>Refresh</button>
      <table>
        <thead>
          <tr><th>Email</th><th>First</th><th>Middle</th><th>Last</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.email}>
              <td>{u.email}</td>
              <td>{u.firstName}</td>
              <td>{u.middleName}</td>
              <td>{u.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
