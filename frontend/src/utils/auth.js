import jwtDecode from 'jwt-decode';
export function saveAuth(token, user) {
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));
}
export function logout() {
localStorage.removeItem('token');
localStorage.removeItem('user');
}
export function getUser() {
const u = localStorage.getItem('user');
return u ? JSON.parse(u) : null;
}
export function getToken() {
return localStorage.getItem('token');
}
export function isTokenValid() {
const t = getToken();
if (!t) return false;
const decoded = jwtDecode(t);
return decoded.exp * 1000 > Date.now();
}