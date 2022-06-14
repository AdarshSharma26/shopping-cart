import '../styles/login.scss'

var users = [];

const fetchAllUsers = () => {
  try {
    const res = fetch("http://localhost:3000/users", {
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response =>
        response.json()
    )).then((res) => {
        users = res;
        console.log(users);
    })
  } catch (error) {
      alert("Something went wrong");
  }
}

const submitLoginPage = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");
    const password = queryParams.get("password");

    const registeredUser = users.filter(x => x.email === email)[0];
    if(registeredUser.confirmPassword === password){
        window.location.href = "./index.html";
        return false;
    }else{
        alert("Invalid user")
    }
}

const loginContainer = document.getElementById("login");
loginContainer.innerHTML = `
<div>
<h1>Login</h1>
<p>Get access to your Orders,Wishlist and Recommendations</p>
</div>
<form id="loginForm">
<div class="form-field">                
    <input type="email" name="email" class="form-field__input" id="email" placeholder=" " required />
    <label for="email" class="form-field__label">Email</label>
    <div class="form-field__bar"></div>
</div>
<div class="form-field">
    <input type="password" name="password" class="form-field__input" id="password" placeholder=" " required />
    <label for="password" class="form-field__label">Password</label>
    <div class="form-field__bar"></div>
</div>
<button class="btn btn__full" type="submit">Login</button>
</form>
`;

fetchAllUsers();

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', submitLoginPage);