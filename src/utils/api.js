import {apiOptions} from "./utils";

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _sendRequest({resource, method, body = null}) {
    const headers = Object.assign({}, this._headers);

    if (body) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(body);
    }

    return fetch(this._baseUrl + resource, {headers, method, body})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo() {
    return this._sendRequest({
      resource: '/users/me',
      method: 'GET'
    });
  }

  getInitialCards() {
    return this._sendRequest({
      resource: '/cards',
      method: 'GET'
    });
  }

  updateUserInfo(body) {
    return this._sendRequest({
      resource: '/users/me',
      method: 'PATCH',
      body
    });
  }

  addCard(body) {
    return this._sendRequest({
      resource: '/cards',
      method: 'POST',
      body
    });
  }

  dropCard(id) {
    return this._sendRequest({
      resource: '/cards/' + id,
      method: 'DELETE'
    });
  }

  _addLike(id) {
    return this._sendRequest({
      resource: '/cards/' + id + '/likes',
      method: 'PUT'
    });
  }

  _removeLike(id) {
    return this._sendRequest({
      resource: '/cards/' + id + '/likes',
      method: 'DELETE'
    });
  }

  setLikeStatus(id, isLiked) {
    return isLiked? this._addLike(id) : this._removeLike(id);
  }

  updateAvatar(link) {
    return this._sendRequest({
      resource: '/users/me/avatar',
      method: 'PATCH',
      body: {
        avatar: link
      }
    });
  }
}

const api = new Api(apiOptions);

export default api;
