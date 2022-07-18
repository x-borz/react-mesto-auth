import {authParams} from "./utils";

class Auth {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
      });
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          return data;
        }
      });
  }

  checkToken(token) {
    const headers = Object.assign({}, this._headers);
    headers["Authorization"] = `Bearer ${token}`

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
      })
  }
}

const auth = new Auth(authParams);

export default auth;
