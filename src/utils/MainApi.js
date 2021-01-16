import BadRequestError from '../errors/BadRequestError';
import UnauthorizedError from '../errors/UnauthorizedError';
export const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://api.svirriill.students.nomoreparties.space'
    : 'http://localhost:5000';

export const register = (email, password, name) => fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ email, password, name }),
})
    .then((res) => {
        if (!res.ok) {
            return res.json()
                .then((err) => {
                    if (err.error) {
                        throw new BadRequestError(err.error);
                    } else {
                        throw new BadRequestError(err.message);
                    }
                });
        }
        return res.json();
    });

export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
})
    .then((res) => {
        if (res.status === 400) {
            throw new BadRequestError('Не передано одно из полей');
        }
        else if (res.status === 401) {
            throw new UnauthorizedError('Пользователь с таким email не найден');
        }
        return res.json();
    })
    .then((data) => {
        if (data.token) {
            localStorage.setItem('jwt', data.token);
            return data.token;
        }
    });

export const getUserInfo = (token) => fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
})
    .then((res) => {
        if (!res.ok) {
            return res.json()
                .then((err) => {
                    throw new UnauthorizedError(err.message);
                });
        }
        return res.json()
    })
    .then((data) => data);

export const getSavedNews = () => {
    return fetch(`${BASE_URL}/articles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((res) => {
            return res.json();
        });
}

export const saveArticle = (article) => {
    const { keyword, title, description, publishedAt, source, url, urlToImage } = article;
    return fetch(`${BASE_URL}/articles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        credentials: 'include',
        body: JSON.stringify({
            keyword,
            title,
            description,
            publishedAt,
            source: source.name,
            url,
            urlToImage,
        }),
    })
        .then((res) => {
            return res.json();
        });
}

export const deleteArticle = (id) => {
    return fetch(`${BASE_URL}/articles/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
    });
};

// export const BASE_URL = 'https://api.dipl.students.nomoreparties.space';
// import { BASE_URL_MAIN } from './config';
// const BASE_URL_MAIN = process.env.NODE_ENV === 'production'
//     ? 'https://api.svirriill.students.nomoreparties.space'
//     : 'http://localhost:5000';
// const getResponse = (res) => {
//     if (res.ok) {
//         return res.json();
//     } else {
//         return Promise.reject(res);
//     }
// };

// export const register = (password, email, name) => {
//     return fetch(`${BASE_URL_MAIN}/signup`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ password, email, name })
//     })
//       .then((res) => {
//         if (res.status === 409) {
//           throw new Error('Такой пользователь уже есть');
//         }
//         if (!res.ok) {
//           throw new Error('Вам отказано в регистрации');
//         }
//         return res.json();
//       })
//       .then((res) => {
//         return res;
//       })
//   };
  
//   export const authorize = (password, email) => {
//     return fetch(`${BASE_URL_MAIN}/signin`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ password, email })
//     })
//       .then((res => {
//         if (res.status === 400) {
//           throw new Error('Введены некорректные данные');
//         }
//         if (res.status === 401) {
//           throw new Error('Данные переданы с ошибкой или не полностью');
//         }
//         return res.json();
//       })
//       )
//       .then((data) => {
//         if (data.token) {
//           localStorage.setItem('token', data.token);
//           return data;
//         } else {
//           return;
//         }
//       })
//   };
  
//   export const getContent = (token) => {
//     return fetch(`${BASE_URL_MAIN}/users/me`, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       }
//     })
//       .then(res => res.json())
//   };
  
// export const getCurrentUser = (token) => {
//     return fetch(`${BASE_URL_MAIN}/users/me`, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//     })
//         .then(getResponse)
// };

// export const getArticles = (token) => {
//     return fetch(`${BASE_URL_MAIN}/articles`, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//     })
//         .then(getResponse)
// };

// export const createArticle = (keyword, title, text, date, source, link, image, token) => {
//     return fetch(`${BASE_URL_MAIN}/articles`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ keyword, title, text, date, source, link, image })
//     })
//         .then(getResponse)
// };

// export const deleteArticle = (articleId, token) => {
//     return fetch(`${BASE_URL_MAIN}/articles/${articleId}`, {
//         method: 'DELETE',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         }
//     })
//         .then(getResponse)
// };
