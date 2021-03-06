var loader = document.querySelector(".preloader");
var profileImg = document.getElementsByClassName("author_img");
var profileName = document.getElementById("name");
var profileNumber = document.getElementById("about");
var orderDisplay = document.querySelector(".tableoforder");
var container = document.querySelector("#ritem");
var editFormSection = document.querySelector(".containert");
var editProfileButton = document.getElementById("edit");
var editProfileForm = document.getElementById('editprofileform')

var eName = document.getElementById("Name");
var eEmail = document.getElementById("Email");

var eAddress = document.getElementById("Address");
var ePhone = document.getElementById("Phone");

var url = "https://knight-foodji.herokuapp.com/api/user/me";
var token = localStorage.getItem("foodji-user-auth-header");

editProfileButton.addEventListener("click", () => {
  editFormSection.style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
});

function remove() {
  editFormSection.style.display = "none";
  window.scrollTo(document.body.scrollHeight, 0);
}

fetch(url, {
  accept: "application/json",
  mode: "cors",
  method: "GET",

  headers: {
    Authorization: token,
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    profileName.innerHTML = data["user"].name;
    profileNumber.innerHTML = data["user"].email;

    eName["value"] = data["user"].name;
    eEmail["value"] = data["user"].email;
    eAddress["value"] = data["user"].address;
    ePhone["value"] = data["user"].phone;

    data.user.orders.forEach((item) => {
      var orderId = item._id;
      var tablerow = document.createElement("tr");
      var liElement = document.createElement("td");
      var liAddress = document.createElement("td");
      var liPaymentStatus = document.createElement("td");
      var liTotalPrice = document.createElement("td");
      var liAssignmentDate = document.createElement("td");
      var liContact = document.createElement("td");
      var liETA = document.createElement("td");
      var accept = document.createElement("td");
      var decline = document.createElement("td");
      var liStatus = document.createElement("td");

      tablerow.appendChild(liElement);
      tablerow.appendChild(liAddress);
      tablerow.appendChild(liTotalPrice);
      tablerow.appendChild(liAssignmentDate);
      tablerow.appendChild(liContact);
      tablerow.appendChild(liETA);
      tablerow.appendChild(liStatus);
      tablerow.appendChild(accept);
      tablerow.appendChild(decline);

      var url = `https://knight-foodji.herokuapp.com/api/user/order/${orderId}`;

      fetch(url, {
        accept: "application/json",
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data["status"] == "RECEIVED") {
            var declineButton = document.createElement("button");
            declineButton.id = orderId;
            decline.appendChild(declineButton);
            declineButton.style.margin = "0 1rem";
            declineButton.className =
              "declinedecision template-btn template-btn2";
            declineButton.innerText = "Cancel";
          }


          var orderedFoodList = data["foods"];
          console.log(orderedFoodList);

          [...orderedFoodList].forEach((food) => {
            liElement.innerHTML +=
              "<li><p>" +
              food["name"] +
              "(x" +
              food["quantity"] +
              ")  <br> ₹" +
              food["price"] +
              "</p>" +
              "</li>";
          });

          // liElement.innerText = orderId;
          liAddress.innerText = data["address"];
          liTotalPrice.innerText = data["payment"]["total"];
          liContact.innerText = data["user"]["phone"];
          liStatus.innerText = data["status"];
          liETA.innerText = data["eta"]

          var time = data["updatedAt"];
          var timing = Date(time);

          liAssignmentDate.innerText = timing.substr(0, 24);

          // Triggering event : Accept/Decline

          orderDisplay.appendChild(tablerow);

        
          var selectAllDeclineButtons = document.querySelectorAll(
            ".declinedecision"
          );

          selectAllDeclineButtons.forEach((button) => {
            button.addEventListener("click", (clickedButton) => {
              var r = confirm("Do you want to cancel the order.")
              if(!r){
                return 
              }
              var url =
                "https://knight-foodji.herokuapp.com/api/user/order/cancel/" +
                clickedButton.target.id;
              fetch(url, {
                accept: "application/json",
                mode: "cors",
                method: "POST",
                headers: {
                  Authorization: token,
                },
              }).then((response) => {
                if (response.status == 200) {
                  console.log("Canceled");
                  location.reload()
                } else {
                  console.log("Error");
                  location.reload()
                }
              });
            });
          });
        });
    });

  })
  .then((_) => {
    loader.remove();
  })
  .catch((err) => {
    console.log(err);
    PopUpLog();
  });

  var editProfileURL = `https://knight-foodji.herokuapp.com/api/user/me`

  editProfileForm.onsubmit = (e)=>{
    e.preventDefault()
    var reqBody = JSON.stringify({
      name: eName.value,
      email:eEmail.value,
      phone:ePhone.value,
      address:eAddress.value
    }) 

    fetch(editProfileURL,{
      mode: "cors",
      method: "PATCH",
  
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: reqBody,
      accept: "application/json"
    })
    .then(res => {
      if(res.status == 200){
        alert("Profile Updated Successfully")
        location.reload()
      } else{
        alert("Please try again.")
        location.reload()
      }
    })
  }