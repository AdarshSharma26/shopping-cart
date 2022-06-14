import '../styles/register.scss'


const submitUserData = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const first = queryParams.get("first-name");
    const last = queryParams.get("last-name");
    const email = queryParams.get("email");
    const password = queryParams.get("password");
    const confirmPassword = queryParams.get("confirm-password");

    if(password === confirmPassword){
        const user = {
            "firstName" : last,
            "lastName" : first,
            "email" : email,
            "password" : password,
            "confirmPassword" : confirmPassword
        }
        const res = fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then((response =>
            response.json()
        )).then((res) => {
            console.log(res);
        })
    }else{
        alert("passwords do not match")
    }
}


const registerContainer = document.getElementById("register");
registerContainer.innerHTML = `
<div>
<h1>Signup</h1>
<p>We do not share any personal details with anyone</p>
</div>
<form id="registerForm">
<div class="form-field">
    <input type="text" name = "first-name" class="form-field__input" id="first-name" placeholder=" " required />
    <label for="first-name" class="form-field__label">First Name</label>
    <div class="form-field__bar"></div>
</div>
<div class="form-field">
    <input type="text" name = "last-name" class="form-field__input" id="last-name" placeholder=" " required />
    <label for="last-name" class="form-field__label">Last Name</label>
    <div class="form-field__bar"></div>
</div>
<div class="form-field">
    <input type="email" name = "email" class="form-field__input" id="email" placeholder=" " required />
    <label for="email" class="form-field__label">Email</label>
    <div class="form-field__bar"></div>
</div>
<div class="form-field">
    <input type="password" name = "password" class="form-field__input" id="password" placeholder=" " 
    pattern="/^(?=.*[0-9])(?=.*[a-z]).{6,}$/gm" 
    title="Password should have min 6 characters, atlease one number and one alphabet and cannot have spaces." />
    <label for="password" class="form-field__label">Password</label>
    <div class="form-field__bar"></div>
</div>
<div class="form-field">
    <input type="password" name = "confirm-password" class="form-field__input" id="confirm-password" placeholder=" " required />
    <label for="confirm-password" class="form-field__label">Confirm Password</label>
    <div class="form-field__bar"></div>
</div>
<button class="btn__full" type="submit">Signup</button>
</form>
`;

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', submitUserData);