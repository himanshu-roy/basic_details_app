const table = document.querySelector('tbody');
const form = document.querySelector('form');
const xhr = new XMLHttpRequest();
const post = new XMLHttpRequest();
const xhr2 = new XMLHttpRequest();
const xhr3 = new XMLHttpRequest();


xhr.open('GET', 'http://localhost:3000/user', true);

xhr.onload = () => {
    if (xhr.status === 200) {
        const users = JSON.parse(xhr.responseText);
        users.forEach(user => {
            table.innerHTML += `
            <tr>
                <td><button data-type="user" data-id=${user._id}>${user.username}</button></td>
                <td>${user.email}</td>
                <td><button data-type="del" data-id=${user._id}>Delete</button></td>
            </tr>`
        });
        const userBtns = table.querySelectorAll('[data-type="user"]');
        const delBtns = table.querySelectorAll('[data-type="del"]');
        userBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                xhr2.open('GET', `http://localhost:3000/user/${id}`, true);

                xhr2.onload = () => {
                    if(xhr2.status === 200) {
                        const user = JSON.parse(xhr2.responseText);
                        const nameLabel = document.querySelector('#nameLabel');
                        const ageLabel = document.querySelector('#ageLabel');
                        const genderLabel = document.querySelector('#genderLabel');
                        const professionLabel = document.querySelector('#professionLabel');
                        nameLabel.innerHTML = `<strong>Name:</strong> ${user.name}`;
                        ageLabel.innerHTML = `<strong>Age:</strong> ${user.age}`;
                        genderLabel.innerHTML = `<strong>Gender:</strong> ${user.gender}`;
                        professionLabel.innerHTML = `<strong>Profession:</strong> ${user.profession}`;
                    }
                }

                xhr2.send();
                
            });
        });
        delBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                xhr3.open('DELETE', `http://localhost:3000/user/${id}`, true);

                xhr3.onload = () => {
                    if(xhr3.status === 200) {
                        window.location.reload();
                        console.log(xhr3.responseText);
                    }
                }

                xhr3.send(null);
            });
        });
    }
};

xhr.send();

form.addEventListener('submit', (e) => {
    const username = form.querySelector('#username').value;
    const email = form.querySelector('#email').value;
    const name = form.querySelector('#name').value;
    const age = parseInt(form.querySelector('#age').value);
    const profession = form.querySelector('#profession').value;
    const gender = form.querySelector('#gender').value;
    const data = {
        "username": `${username}`,
        "email": `${email}`,
        "name": `${name}`,
        "age": age,
        "profession": `${profession}`,
        "gender": `${gender}`
    };
    
    const json = JSON.stringify(data);

    post.open("POST", "http://localhost:3000/user", true);
    post.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    post.onload = function () {
        var data = JSON.parse(post.responseText);
        if (post.readyState == 4 && post.status == "201") {
            console.log(data);
            window.location.reload();
        } else {
            console.log(data);
        }
    }
    post.send(json);
    
});

