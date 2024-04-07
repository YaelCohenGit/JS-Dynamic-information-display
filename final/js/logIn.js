const signUpButton = document.getElementById('switchSignUp');
const signInButton = document.getElementById('switchSignIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

function findUser(event) {
    event.preventDefault();
    const userEmail = document.getElementById("emailExist").value;
    const userPsw = document.getElementById("pswExist").value;
    const user = { email: userEmail, password: userPsw };
    if (localStorage.getItem("loggedIn") == null) {
        alert("no such user");
        return;
    }
    if (isUserEmailInLocalStorage(user)) {
        if (isUserPswInLocalStorage(user)) {
            saveCurrentUserInLocalStorage(user);
        } else {
            alert("wrong password!")
        }
    } else {
        alert("no such user")
    }
}

function creatUser(event) {
    event.preventDefault();
    const userEmail = document.getElementById("emailNew").value;
    const userPsw = document.getElementById("pswNew").value;
    const user = { email: userEmail, password: userPsw };
    if (localStorage.getItem("loggedIn") == null) {
        saveUserInLocalStorage(user);
        saveCurrentUserInLocalStorage(user);
    } else {
        if (isUserEmailInLocalStorage(user)) {
            alert("user exists")
        } else {
            saveUserInLocalStorage(user);
            saveCurrentUserInLocalStorage(user);
        }
    }
}
function saveCurrentUserInLocalStorage(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    location.href = '../html/index.html';
}

function isUserEmailInLocalStorage(user) {
    const storedUser = localStorage.getItem('loggedIn');
    const userFind = JSON.parse(storedUser);
    let check = 0;
    userFind.forEach(element => {
        if (user.email === element.email) {
            check = 1;
        }
    });
    return check;
}

function isUserPswInLocalStorage(user) {
    const storedUser = localStorage.getItem('loggedIn');
    const userFind = JSON.parse(storedUser);
    let check = 0;
    userFind.forEach(element => {
        if (user.password === element.password) {
            check = 1;
        }
    });
    return check;
}

function saveUserInLocalStorage(user) {
    let storedUser = JSON.parse(localStorage.getItem('loggedIn'));
    if (storedUser == null) {
        storedUser = [user];
    } else {
        storedUser.push(user);
    }
    const storedUserCorrect = JSON.stringify(storedUser);
    localStorage.setItem('loggedIn', storedUserCorrect);
}

function start(){
    location.href='../html/index.html';
}