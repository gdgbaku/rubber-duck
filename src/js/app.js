require("./headerElement");
require("./footerElement");
require("./articleThumbLeftElement");
require("./articleThumbRightElement");
require("./articleThumbUp");
require("./teamShort");
searchForm();
fetchTeamMembers();
fetchToS();
addListeners();

function fetchToS() {
  if (document.querySelector(".rd-signup-form")) {
    fetch(`https://gdg-ms-storage.herokuapp.com/storage/terms-and-conditions`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        document.querySelector(".rd-tos").href = res.termsAndConditions;
      });
  }
}

function addListeners() {
  if (document.querySelector(".rd-signup-form")) {
    document
      .querySelector(".rd-signup-form button")
      .addEventListener("click", validateAndSignUp);
  }

  if (document.querySelector(".rd-signin-form")) {
    document
      .querySelector(".rd-signin-form button")
      .addEventListener("click", validateAndSignIn);
  }
}

function validateAndSignIn(e) {
  e.preventDefault();
  console.log("clicked");
  let errMsg = document.querySelector(".err-msg");
  let signData = {};

  let login = document
    .querySelector(".rd-signin-form input[type=email]")
    .checkValidity()
    ? document.querySelector(".rd-signin-form input[type=email]").value
    : "";
  let password = document
    .querySelector(".rd-signin-form input[type=password]")
    .checkValidity()
    ? document.querySelector(".rd-signin-form input[type=password]").value
    : "";

  if (login !== "" && password !== "") {
    signData.mail = login;
    signData.password = password;

    signData = JSON.stringify(signData);
    fetch(`https://gdg-ms-auth.herokuapp.com/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: signData,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        if (res.message) {
          console.log(res);
          errMsg.style.display = "block";
          errMsg.innerHTML = res.message;
        }
        if (res.token) {
          window.localStorage.setItem("usr", res.token);
          console.log("Saved token");
        }
      });
  }
}

function validateAndSignUp(e) {
  console.log("clicked");
  e.preventDefault();
  if (document.querySelector(".rd-signup-form")) {
    let errMsg = document.querySelector(".err-msg");
    errMsg.style.display = "none";

    let userData = {};

    firstName = document.querySelector("input[name=firstname]").checkValidity()
      ? document.querySelector("input[name=firstname]").value
      : "";

    lastName = document.querySelector("input[name=lastname]").checkValidity()
      ? document.querySelector("input[name=lastname]").value
      : "";

    email = document.querySelector("input[name=email]").checkValidity()
      ? document.querySelector("input[name=email]").value
      : "";

    password = document.querySelector("input[name=password]").checkValidity()
      ? document.querySelector("input[name=password]").value
      : "";

    confpassword = document
      .querySelector("input[name=confpassword]")
      .checkValidity()
      ? document.querySelector("input[name=confpassword]").value
      : "";
    tos = document.querySelector("#checkTos").checkValidity();

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" &&
      confpassword !== "" &&
      tos === true &&
      confpassword === password
    ) {
      userData.areTermsAndConditionsConfirmed = tos;
      userData.firstName = firstName;
      userData.lastName = lastName;
      userData.mail = email;
      userData.password = password;

      console.log(JSON.stringify(userData));
      fetch(`https://gdg-ms-auth.herokuapp.com/user/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.status === 400) {
            errMsg.innerHTML = res.errors[0].defaultMessage;
            errMsg.style.display = "block";
          } else if (res.status === 201) {
            errMsg.classList.add("success-msg");
            errMsg.style.display = "block";
            errMsg.innerHTML = `You have successfully signed up! Please, verify your account via link we have sent to your email`;
          } else if (res.status === 500) {
            errMsg.innerHTML = res.message;
            errMsg.style.display = "block";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Not Valid");
    }

    console.log(userData);
  }
}

function searchForm() {
  document.querySelector(".search-toggle").addEventListener("click", () => {
    document
      .querySelector("header .search-form")
      .classList.toggle("open-search");
  });
}

async function fetchTeamMembers() {
  if (document.querySelector(".team-members")) {
    const url = `https://gdg-ms-team.herokuapp.com/api/members`;

    let response = await fetch(url);
    const reader = response.body.getReader();

    let receivedLength = 0; // количество байт, полученных на данный момент
    let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;
    }
    let chunksAll = new Uint8Array(receivedLength); // (4.1)
    let position = 0;
    for (let chunk of chunks) {
      chunksAll.set(chunk, position); // (4.2)
      position += chunk.length;
    }

    let result = new TextDecoder("utf-8").decode(chunksAll);

    let members = JSON.parse(result);

    let teamContainer = document.querySelector(".team-members .container .row");

    for (let member of members) {
      let memberElement = document.createElement("rd-team-short");
      memberElement.classList.add("col-md-4");
      memberElement.setAttribute("avatar", member.photo[0]);
      memberElement.setAttribute("giturl", member.github);
      memberElement.setAttribute("linkedinurl", member.linkedin);
      memberElement.setAttribute("email", member.email);

      let fullName = document.createElement("div");
      fullName.setAttribute("slot", "fullname");
      fullName.appendChild(
        document.createTextNode(`${member.firstName} ${member.lastName}`)
      );

      let email = document.createElement("div");
      email.setAttribute("slot", "email");
      email.appendChild(document.createTextNode(`${member.email}`));

      let position = document.createElement("div");
      position.setAttribute("slot", "position");
      position.appendChild(document.createTextNode(`${member.position}`));

      memberElement.appendChild(fullName);
      memberElement.appendChild(email);
      memberElement.appendChild(position);
      teamContainer.appendChild(memberElement);
    }
  } else {
    console.log("non team");
  }
}
