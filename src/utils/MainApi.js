import BadRequestError from '../errors/BadRequestError';
import UnauthorizedError from '../errors/UnauthorizedError';
export const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://api.svdiplom.students.nomoreparties.xyz'
    : 'http://localhost:5000';

export const register = (email, password, name) => fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
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
    },
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