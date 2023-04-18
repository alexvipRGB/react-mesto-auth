class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(response, method) {
    return response.ok
      ? response.json()
      : Promise.reject(`${method}: ${response.status}`);
  }
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      (res) => {
        return this._checkResponse(res, "getUserInfo");
      }
    );
  }

  setAvatar(avatarURL) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatarURL,
      }),
    }).then((res) => {
      return this._checkResponse(res, "setAvatar");
    });
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResponse(res, "setUserInfo");
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (res) => {
        return this._checkResponse(res, "getInitialCards");
      }
    );
  }

  changeLikeCardStatus(id, status) {
    if (status) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res, "removeLike");
      });
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        headers: this._headers,
        method: "PUT",
      }).then((res) => {
        return this._checkResponse(res, "addLike");
      });
    }
  }

  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then((res) => {
      return this._checkResponse(res, "addCard");
    });
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res, "removeCard");
    });
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '27b88e4b-c8b2-464e-a513-428188431cdc',
    'Content-Type': 'application/json',
  },
});

export default api;