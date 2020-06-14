var loginForm = document.getElementsByClassName("guy-login-form")[0];
// var loginFirm = document.getElementById("login-form")[0];

loginForm.onsubmit = (e) => {
  e.preventDefault();
  var username = document.getElementById("guy_username").value;
  var password = document.getElementById("guy_password").value;
  //   e.preventDefault();
  // ../../api/user/login
  var body = JSON.stringify({
    username: username,
    password: password,
  });
  // console.log(rest_id, password);
  // console.log(body);
  fetch("https://knight-foodji.herokuapp.com/api/deliveryguy/login", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: body,
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("foodji-guy-auth-header", "Bearer " + data.token);
      localStorage.setItem("foodji-guy", JSON.stringify(data.restaurant));
      location.reload();
    })
    .catch((err) => {
      var errorPara = document.getElementById("login-error");
      errorPara.value = "Authentication Not Successfull";
    });
  //   //   console.log(phone, password);
};
