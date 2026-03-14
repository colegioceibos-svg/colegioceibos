// app.js

// Authentication Logic
const users = [{ username: 'admin', password: 'password', role: 'admin' }, { username: 'user', password: 'user123', role: 'user' }];
let currentUser = null;

function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        console.log(`Welcome ${user.username}!`);
    } else {
        console.log('Invalid username or password.');
    }
}

function logout() {
    currentUser = null;
    console.log('User logged out.');
}

// Data Persistence (Local Storage Example)
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Permissions Management
function hasPermission(action) {
    if (!currentUser) {
        console.log('No user logged in.');
        return false;
    }
    if (currentUser.role === 'admin') {
        return true; // Admin can perform any action
    }
    if (currentUser.role === 'user' && action !== 'adminOnly') {
        return true; // Regular users can perform certain actions
    }
    return false; // No permission
}

// Usage Example
login('admin', 'password');
if (hasPermission('view')) {
    console.log('Permission granted for viewing.');
}

// Save some data
saveData('bookingInfo', { booked: true, date: '2026-03-14' });
const bookingInfo = loadData('bookingInfo');
console.log(bookingInfo);