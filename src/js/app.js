require("./headerElement");
require("./footerElement");
require("./articleThumbLeftElement");
require("./articleThumbRightElement");
require("./articleThumbUp");
require("./teamShort");

import IMask from "imask";

// show password flag
let showPassword = false;

// Call all needen functions on page load
window.addEventListener("load", function () {
  // searchForm();
  fetchTeamMembers();
  fetchToS();
  addListeners();
  validatePhoneNumber();
  contactUsPage();
});

// When on contact page add click listener to the button and submit the form
function contactUsPage() {
  if (document.querySelector(".rd-contact-form")) {
    const contSubmitBtn = document.querySelector(
      '.rd-contact-form input[type="submit"]'
    );

    contSubmitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      let firstName;
      let lastName;
      let phone;
      let email;
      let type;
      let message;

      if (document.querySelector("input[name=your-name]").checkValidity()) {
        firstName = document.querySelector("input[name=your-name]").value;
        document.querySelector(
          "input[name=your-name] + .validity-msg"
        ).innerHTML = "";
      } else {
        firstName = "";
        document.querySelector(
          "input[name=your-name] + .validity-msg"
        ).innerHTML = "Value not valid";
      }

      if (document.querySelector("input[name=your-lastname]").checkValidity()) {
        lastName = document.querySelector("input[name=your-lastname]").value;
        document.querySelector(
          "input[name=your-lastname] + .validity-msg"
        ).innerHTML = "";
      } else {
        lastName = "";
        document.querySelector(
          "input[name=your-lastname] + .validity-msg"
        ).innerHTML = "Value not valid";
      }

      phone = document.querySelector("input[name=your-phone]").value;

      if (
        validateEmail(document.querySelector("input[name=your-email]").value)
      ) {
        email = document.querySelector("input[name=your-email").value;
        document.querySelector(
          "input[name=your-email] + .validity-msg"
        ).innerHTML = "";
      } else {
        email = "";
        document.querySelector(
          "input[name=your-email] + .validity-msg"
        ).innerHTML = "Value not valid";
      }
      if (document.querySelector("select[name=your-complaint]").value != 0) {
        type = document.querySelector("select[name=your-complaint]").value;
        document.querySelector(
          "select[name=your-complaint] + .validity-msg"
        ).innerHTML = "";
      } else {
        type = 0;
        document.querySelector(
          "select[name=your-complaint] + .validity-msg"
        ).innerHTML = "Value not valid";
      }

      if (
        document.querySelector("textarea[name=your-message]").checkValidity()
      ) {
        message = document.querySelector("textarea[name=your-message]").value;
        document.querySelector(
          "textarea[name=your-message] + .validity-msg"
        ).innerHTML = "";
      } else {
        message = "";
        document.querySelector(
          "textarea[name=your-message] + .validity-msg"
        ).innerHTML = "Value not valid";
      }

      let complaintData = {};

      if (
        firstName !== "" &&
        lastName !== "" &&
        phone !== "" &&
        email !== "" &&
        type !== 0 &&
        message !== ""
      ) {
        complaintData.email = email;
        complaintData.message = message;
        complaintData.name = firstName;
        complaintData.phone = phone;
        complaintData.surname = lastName;
        complaintData.typeId = type;

        fetch(`https://gdg-ms-complaint.herokuapp.com/complaint`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(complaintData),
        })
          .then((res) => {
            if (res.ok) {
              return res;
            } else {
              throw new Error(res.statusText);
            }
          })
          .then((res) => {
            document.querySelector(".err-msg").classList.add("success-msg");
            document.querySelector(".err-msg").style.display = "block";
            document.querySelector(".err-msg").innerHTML =
              "Message has been sent";
          })
          .catch((err) => {
            return;
          });
      }
    });
  }
}

// Use IMask.js to validate phone number input
function validatePhoneNumber() {
  if (document.querySelector(".rd-contact-form")) {
    const phoneInput = document.querySelector(
      ".rd-contact-form input[type=phone]"
    );
    const phonePatternMask = IMask(phoneInput, {
      mask: /^\+?[0-9]*$/,
      lazy: false,
    });
  }
}

// When on signup page fetch the link to the terms and conditions link
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

// Here we add listeners relative to the current page
function addListeners() {
  if (document.querySelector(".rd-signup-form")) {
    document
      .querySelector(".rd-signup-form .rd-signup-btn")
      .addEventListener("click", validateAndSignUp);

    document
      .querySelector("input[name=password]")
      .addEventListener("keyup", function () {
        if (validatePassword(this.value)) {
          document.querySelector("input[name=confpassword]").disabled = false;
          document.querySelector("#checkTos").disabled = false;
          document.querySelector(
            ".rd-password-input ~ .pswd-helper"
          ).style.color = "#444";
        } else {
          document.querySelector("input[name=confpassword]").disabled = true;
          document.querySelector("#checkTos").disabled = true;
          document.querySelector(
            ".rd-password-input ~ .pswd-helper"
          ).style.color = "#ff5252";
        }
      });
  }

  if (document.querySelector(".rd-signin-form")) {
    document
      .querySelector(".rd-signin-form .rd-signin-btn")
      .addEventListener("click", validateAndSignIn);

    document
      .querySelector(".pass-recovery")
      .addEventListener("click", passwordRecover);
  }

  if (document.querySelector(".rd-password-input")) {
    const showPassButtons = document.querySelectorAll(
      ".rd-password-input .rd-show-password"
    );
    for (let btn of showPassButtons) {
      btn.addEventListener("click", showPasswordToggle);
    }
  }
}

// Request the password recovery link, needs to be reworked to use a separate input element
function passwordRecover() {
  let email;
  document.querySelector("#passRecoveryModal .err-msg").innerHTML = "";
  document.querySelector("#passRecoveryModal .err-msg").style.display = "none";
  if (
    validateEmail(
      document.querySelector("#passRecoveryModal input[type=email]").value
    )
  ) {
    email = document.querySelector("#passRecoveryModal input[type=email]")
      .value;
    document.querySelector(
      "#passRecoveryModal input[type=email] + .validity-msg"
    ).innerHTML = "";
  } else {
    email = "";
    document.querySelector(
      "#passRecoveryModal input[type=email] + .validity-msg"
    ).innerHTML = "Email not valid";
  }

  if (email !== "") {
    fetch(`https://gdg-ms-auth.herokuapp.com/user/forgot-password`, {
      method: "POST",
      body: email,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong. Check your email, please.");
        } else {
          document.querySelector("#passRecoveryModal .err-msg").innerHTML =
            "Sent";
          document.querySelector("#passRecoveryModal .err-msg").style.display =
            "block";
          document
            .querySelector("#passRecoveryModal .err-msg")
            .classList.add("success-msg");
        }
      })

      .catch((err) => {
        document.querySelector("#passRecoveryModal .err-msg").innerHTML = err;
        document.querySelector("#passRecoveryModal .err-msg").style.display =
          "block";
      });
  }
}

// When on signin page, send Auth request
function validateAndSignIn(e) {
  e.preventDefault();
  let errMsg = document.querySelector(".rd-signin-form .err-msg");
  errMsg.style.display = "none";
  errMsg.innerHTML = "";
  let signData = {};

  let login;

  if (
    validateEmail(
      document.querySelector(".rd-signin-form input[type=email]").value
    )
  ) {
    login = document.querySelector(".rd-signin-form input[type=email]").value;
    document.querySelector(
      ".rd-signin-form input[type=email] + .validity-msg"
    ).innerHTML = "";
  } else {
    login = "";
    document.querySelector(
      ".rd-signin-form input[type=email] + .validity-msg"
    ).innerHTML = "Email not valid";
  }

  let password;
  if (
    document
      .querySelector(".rd-signin-form .rd-password-input input[type=password]")
      .checkValidity()
  ) {
    password = document.querySelector(
      ".rd-signin-form .rd-password-input input[type=password]"
    ).value;
    document.querySelector(
      ".rd-signin-form .rd-password-input + .validity-msg"
    ).innerHTML = "";
  } else {
    password = "";
    document.querySelector(
      ".rd-signin-form .rd-password-input + .validity-msg"
    ).innerHTML = "Value not valid";
  }

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
        return res.json();
      })
      .then((res) => {
        if (!res.ok) {
          errMsg.innerHTML = res.message;
          errMsg.style.display = "block";
        }
        if (res.token) {
          window.localStorage.setItem("usr", res.token);
          location.href = `./index.html`;
        }
      });
  }
}

// When on sign up page send signup request
function validateAndSignUp(e) {
  e.preventDefault();
  if (document.querySelector(".rd-signup-form")) {
    let errMsg = document.querySelector(".err-msg");
    errMsg.style.display = "none";
    document.querySelector(".rd-password-input ~ .pswd-helper").style.color =
      "#444";

    let userData = {};

    let firstName;

    if (document.querySelector("input[name=firstname]").checkValidity()) {
      firstName = document.querySelector("input[name=firstname]").value;
      document.querySelector(
        "input[name=firstname] ~ .validity-msg"
      ).innerHTML = "";
    } else {
      firstName = "";
      document.querySelector(
        "input[name=firstname] ~ .validity-msg"
      ).innerHTML = "Value not valid";
    }

    let lastName;

    if (document.querySelector("input[name=lastname]").checkValidity()) {
      lastName = document.querySelector("input[name=lastname]").value;
      document.querySelector("input[name=lastname] ~ .validity-msg").innerHTML =
        "";
    } else {
      lastName = "";
      document.querySelector("input[name=lastname] ~ .validity-msg").innerHTML =
        "Value not valid";
    }

    let email;
    if (validateEmail(document.querySelector("input[name=email]").value)) {
      email = document.querySelector("input[name=email]").value;
      document.querySelector("input[name=email] ~ .validity-msg").innerHTML =
        "";
    } else {
      email = "";
      document.querySelector("input[name=email] ~ .validity-msg").innerHTML =
        "Value not valid";
    }

    let password;
    if (
      validatePassword(document.querySelector("input[name=password]").value)
    ) {
      password = document.querySelector("input[name=password]").value;
    } else {
      password = "";
      document.querySelector(".rd-password-input ~ .pswd-helper").style.color =
        "#ff5252";
      return;
    }

    let confpassword;

    // if (
    //   !validatePassword(
    //     document.querySelector("input[name=confpassword]").value
    //   )
    // ) {
    //   console.log("notvalid");
    //   confpassword = "";
    //   document.querySelector(
    //     "input[name=confpassword] ~ .validity-msg"
    //   ).innerHTML = "Value not valid";
    // } else if (
    //   document.querySelector("input[name=confpassword]").value !== password
    // ) {
    //   confpassword = "";
    //   document.querySelector(
    //     "input[name=confpassword] ~ .validity-msg"
    //   ).innerHTML = "Password values don't match";
    // } else {
    //   confpassword = document.querySelector("input[name=confpassword]").value;
    //   document.querySelector(
    //     "input[name=confpassword] ~ .validity-msg"
    //   ).innerHTML = "";
    // }
    if (document.querySelector("input[name=confpassword]").value != password) {
      confpassword = "";
      document.querySelector(
        "input[name=confpassword] ~ .validity-msg"
      ).innerHTML = "Password values don't match";
    } else {
      confpassword = document.querySelector("input[name=confpassword]").value;
    }

    let tos = document.querySelector("#checkTos").checkValidity();
    if (document.querySelector("#checkTos").checkValidity()) {
      tos = document.querySelector("#checkTos").checkValidity();
      document.querySelector("#checkTos ~ .validity-msg").innerHTML = "";
    } else {
      tos = false;
      document.querySelector("#checkTos ~ .validity-msg").innerHTML =
        "Please, agree to proceed";
    }

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

      fetch(`https://gdg-ms-auth.herokuapp.com/user/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          if (res.ok) {
            errMsg.classList.add("success-msg");
            errMsg.style.display = "block";
            errMsg.innerHTML = `You have successfully signed up! Please, verify your account via link we have sent to your email`;
            return;
          } else {
            return res.json();
          }
        })
        .then((res) => {
          if (res.status === 400) {
            errMsg.innerHTML = res.errors[0].defaultMessage;
            errMsg.style.display = "block";
          } else if (res.status === 500) {
            errMsg.innerHTML = res.message;
            errMsg.style.display = "block";
          }
        })
        .catch((err) => {
          return;
        });
    }
  }
}

// Toggle search form visibility
// function searchForm() {
//   document.querySelector(".search-toggle").addEventListener("click", () => {
//     document
//       .querySelector("header .search-form")
//       .classList.toggle("open-search");
//   });
// }

// Fetch team members when on team page
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
      memberElement.classList.add("m-auto");
      memberElement.setAttribute("avatar", member.photo[0]);
      memberElement.setAttribute("giturl", member.github);
      memberElement.setAttribute("linkedinurl", member.linkedin);
      memberElement.setAttribute("email", member.email);
      memberElement.setAttribute("position", member.position);

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
  }
}

// A simple basic email validation
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(pass) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  return re.test(String(pass));
}

// Toggle show password
function showPasswordToggle() {
  if (this.previousElementSibling.getAttribute("type") === "password") {
    this.previousElementSibling.setAttribute("type", "text");
    this.firstElementChild.firstElementChild.style.display = "none";
    this.firstElementChild.lastElementChild.style.display = "block";
  } else if (this.previousElementSibling.getAttribute("type") === "text") {
    this.previousElementSibling.setAttribute("type", "password");
    this.firstElementChild.firstElementChild.style.display = "block";
    this.firstElementChild.lastElementChild.style.display = "none";
  }
}
