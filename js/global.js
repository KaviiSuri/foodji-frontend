// <li><a id="logInOutBtn" href="userlogin.html">Login</a></li>
// <li><a id="signUpProfileBtn" href="usersignup.html">Signup</a></li>

function ready(callbackFunc) {
  if (document.readyState !== "loading") {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener("DOMContentLoaded", callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState === "complete") {
        callbackFunc();
      }
    });
  }
}

ready(function () {
  var logInOutBtn = document.getElementById("logInLogOutBtn");
  var signUpProfileBtn = document.getElementById("signUpProfileBtn");
  var token = localStorage.getItem("foodji-user-auth-header");

  var loginHtml = '<a class="check" href="userlogin.html">Login</a>';
  var signUpHtml = '<a href="usersignup.html">Signup</a>';

  var logoutHtml = '<a href="#" onclick="logOut()">LogOut</a>';
  var profileLinkHtml = '<a href="userprofile.html">Profile</a>';

  function logOut() {
    localStorage.setItem("foodji-user-auth-header", null);
  }

  if (!token) {
    console.log("Token does not exist");
    logInOutBtn.innerHTML = loginHtml;
    signUpProfileBtn.innerHTML = signUpHtml;
  } else {
    logInOutBtn.innerHTML = logoutHtml;
    signUpProfileBtn.innerHTML = profileLinkHtml;
  }
});