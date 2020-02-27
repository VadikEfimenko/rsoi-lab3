const Http = document.Http;

const content = document.getElementById("content");

const allFilmsButton = document.getElementById("allFilms");
const allUsersButton = document.getElementById("allUsers");
const loginButton = document.getElementById("login");
const addUserButton = document.getElementById("addUser");
const userMoneyButton = document.getElementById("userMoney");

allFilmsButton.addEventListener("click", function()
{
    Http.FetchGet("/allFilms")
        .then((response) =>
        {
            printAllFilms(response);
        });
});

function printAllFilms (allFilms) {
    if (location.href !== 'http://localhost:8080/front/allFilms') {
        history.pushState(null, null, '/front/allFilms');
    }

    allFilms = JSON.parse(allFilms[0]);

    let table = '<div class="container"><table class="table"><thead><tr><th>Фильм</th><th>Цена</th><th>Удалить фильм</th></tr></thead><tbody>';

    if (!Object.keys(allFilms).length) {
        table += `<tr id="tr"><td>Нет фильмов</td><td>Нет фильмов</td><td>Нет фильмов</td></tr>`;
    }

    Object.keys(allFilms).forEach((film) => {
        table += `<tr id="tr${film}"><td>${film}</td><td>${allFilms[film]}</td><td><div class="deleteButton" id="${film}"></div></td></tr>`;
    });

    table += '</tbody></table></div>';

    content.innerHTML = table;

    const filmsDelete = document.querySelectorAll('.deleteButton');
    filmsDelete.forEach((button) => {
        button.onclick = (e) => {deleteFilm(e.target.id)};
    })
}

function deleteFilm (id) {
    Http.FetchPost("/deleteFilms", {
        films: [id]
    })
        .then((response) =>
        {
            const tr = document.getElementById(`tr${id}`);
            tr.innerHTML = "";
        })
        .catch((res) => {
            alert('Невозможно удалить фильм')
        });
}

allUsersButton.addEventListener("click", function()
{
    Http.FetchPost("/allUsers", {})
        .then((response) =>
        {
            printAllUsers(response);
        });
});

function printAllUsers (allUsers) {
    if (location.href !== 'http://localhost:8080/front/allUsers') {
        history.pushState(null, null, '/front/allUsers');
    }

    allUsers = allUsers.ans;

    let table = '<div class="container"><table class="table"><thead><tr><th>Пользователь</th><th>Удалить пользователя</th></tr></thead><tbody>';

    if (!allUsers.length) {
        table += `<tr id="tr"><td>Нет пользователей</td><td>Нет пользователей</td></tr>`;
    }

    allUsers.forEach((user) => {
        table += `<tr id="tr${user.login}"><td>${user.name}</td><td><div class="deleteButton" id="${user.login}"></div></td></tr>`;
    });

    table += '</tbody></table></div>';

    content.innerHTML = table;

    const usersDelete = document.querySelectorAll('.deleteButton');
    usersDelete.forEach((button) => {
        button.onclick = (e) => {deleteUser(e.target.id)};
    })
}

function deleteUser (id) {
    Http.FetchPost("/deleteUsers", {
        logins: [id]
    })
        .then((response) =>
        {
            const tr = document.getElementById(`tr${id}`);
            tr.innerHTML = "";
        })
        .catch((res) => {
            alert('Невозможно удалить пользователя')
        });
}

loginButton.addEventListener("click", printLogin);

function printLogin () {
    if (location.href !== 'http://localhost:8080/front/login') {
        history.pushState(null, null, '/front/login');
    }

    let page = `
        <div class="page">
            <div class="login">
                Логин: 
                <input id="login-input" class="login-input"/>
            </div>
            <div class="password">
                Пароль: 
                <input id="password" class="password-input"/>
            </div>
            <div class="login-button">
                OK
            </div>
        </div>
    `;

    content.innerHTML = page;

    const loginButton = document.querySelectorAll('.login-button');
    loginButton.forEach((button) => {
        button.onclick = () => {
            const login = document.getElementById('login-input').value;
            const password = document.getElementById('password').value;

            if (!login.length) {
                alert('Поле логин не может быть пустым');
                return;
            }

            if (!password.length) {
                alert('Поле пароль не может быть пустым');
                return;
            }

            Http.FetchPost("/login", {
                login,
                password
            })
                .then(() =>
                {
                    alert('Пользователя существует');
                })
                .catch(() => {
                    alert('Пользователя с такой парой логин-пароль не существует');
                });
        };
    })
}

userMoneyButton.addEventListener("click", printUserMoney);

function printUserMoney () {
    if (location.href !== 'http://localhost:8080/front/userMoney') {
        history.pushState(null, null, '/front/userMoney');
    }

    let page = `
        <div class="page">
            <div class="login">
                Логин: 
                <input id="login-input" class="login-input"/>
            </div>
            <div class="login-button">
                OK
            </div>
        </div>
    `;

    content.innerHTML = page;

    const loginButton = document.querySelectorAll('.login-button');
    loginButton.forEach((button) => {
        button.onclick = () => {
            const login = document.getElementById('login-input').value;

            if (!login.length) {
                alert('Поле логин не может быть пустым');
                return;
            }

            Http.FetchPost("/userMoney", {
                login
            })
                .then((res) =>
                {
                    alert(`Пользователь потратил: ${res.ans}`);
                })
                .catch(() => {
                    alert('Произошла ошибка');
                });
        };
    })
}

addUserButton.addEventListener("click", printAddUser);

function printAddUser () {
    if (location.href !== 'http://localhost:8080/front/addUser') {
        history.pushState(null, null, '/front/addUser');
    }

    let page = `
        <div class="page">
            <div class="login2">
                Логин: 
                <input id="login-input" class="login-input"/>
            </div>
            <div class="password2">
                Пароль: 
                <input id="password" class="password-input"/>
            </div>
            <div class="name">
                Имя: 
                <input id="name" class="name-input"/>
            </div>
            <div class="films">
                Фильмы (через пробел): 
                <input id="films" class="films-input"/>
            </div>
            Если введенных фильмов нет в списке фильмов, то их цена будет учитываться при подсчете затрат пользователя
            <div class="login-button">
                OK
            </div>
        </div>
    `;

    content.innerHTML = page;

    const loginButton = document.querySelectorAll('.login-button');
    loginButton.forEach((button) => {
        button.onclick = () => {
            const login = document.getElementById('login-input').value;
            const password = document.getElementById('password').value;
            const name = document.getElementById('name').value;
            const filmsValue = (document.getElementById('films').value).split(' ');
            const films = unique(filmsValue);

            if (!login.length) {
                alert('Поле логин не может быть пустым');
                return;
            }

            if (!password.length) {
                alert('Поле пароль не может быть пустым');
                return;
            }

            if (!name.length) {
                alert('Поле имя не может быть пустым');
                return;
            }

            Http.FetchPost("/addUsers", {
                users: {
                    [login]: {
                        login,
                        password,
                        name,
                        films
                    }
                }
            })
                .then(() =>
                {
                    alert('Пользователь добавлен');
                })
                .catch(() => {
                    alert('Произошла ошибка');
                });
        };
    })
}

function unique(arr) {
    let result = [];

    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str);
        }
    }

    return result;
}


if (location.href === "http://localhost:8080/front/allFilms") {
    Http.FetchGet("/allFilms")
        .then((response) =>
        {
            printAllFilms(response);
        });
} else if (location.href === 'http://localhost:8080/front/allUsers') {
    Http.FetchPost("/allUsers", {})
        .then((response) =>
        {
            printAllUsers(response);
        });
} else if (location.href === 'http://localhost:8080/front/login') {
    printLogin();
} else if (location.href === 'http://localhost:8080/front/userMoney') {
    printUserMoney();
} else if (location.href === 'http://localhost:8080/front/addUser') {
    printAddUser();
}

