require("./headerElement");
require("./footerElement");
require("./articleThumbLeftElement");
require("./articleThumbRightElement");
require("./articleThumbUp");
require("./teamShort");

import IMask from "imask";

// let signUpValidityFlags = {
//   name: false,
//   lastname: false,
//   email: false,
//   password: false,
//   confpassword: false,
//   tos: false,
// };

let signUpValidityFlags = new Map();

signUpValidityFlags.set("name", false);
signUpValidityFlags.set("lastame", false);
signUpValidityFlags.set("email", false);
signUpValidityFlags.set("password", false);
signUpValidityFlags.set("confpassword", false);
signUpValidityFlags.set("tos", false);

// Call all needen functions on page load
window.addEventListener("load", function () {
  // searchForm();

  fetchTeamMembers();
  fetchToS();
  addListeners();
  validatePhoneNumber();
  contactUsPage();
});

// Here we add listeners relative to the current page
function addListeners() {
  if (document.querySelector(".rd-signup-form")) {
    document.querySelector(".rd-signup-form .rd-signup-btn").disabled = true;
    document
      .querySelector(".rd-signup-form .rd-signup-btn")
      .addEventListener("click", validateAndSignUp);

    document
      .querySelector("input[name=firstname]")
      .addEventListener("keyup", function () {
        if (this.checkValidity()) {
          signUpValidityFlags.set("name", true);
          document.querySelector(
            "input[name=firstname] ~ .validity-msg"
          ).innerHTML = "";
        } else {
          signUpValidityFlags.set("name", false);

          document.querySelector(
            "input[name=firstname] ~ .validity-msg"
          ).innerHTML = "Value not valid";
        }
        // if (checkSignUpFlags()) {
        //   document.querySelector(".rd-signup-btn").disabled = false;
        // }
        document.querySelector(
          ".rd-signup-form .rd-signup-btn"
        ).disabled = !checkSignUpFlags();
      });

    document
      .querySelector("input[name=lastname]")
      .addEventListener("keyup", function () {
        if (this.checkValidity()) {
          signUpValidityFlags.set("lastname", true);

          document.querySelector(
            "input[name=lastname] ~ .validity-msg"
          ).innerHTML = "";
        } else {
          signUpValidityFlags.set("lastname", false);

          document.querySelector(
            "input[name=lastname] ~ .validity-msg"
          ).innerHTML = "Value not valid";
        }
        // if (checkSignUpFlags()) {
        //   document.querySelector(".rd-signup-btn").disabled = false;
        // }
        document.querySelector(
          ".rd-signup-form .rd-signup-btn"
        ).disabled = !checkSignUpFlags();
      });
    document
      .querySelector("input[name=email]")
      .addEventListener("keyup", function () {
        if (validateEmail(this.value)) {
          signUpValidityFlags.set("email", true);

          document.querySelector(
            "input[name=email] ~ .validity-msg"
          ).innerHTML = "";
        } else {
          signUpValidityFlags.set("email", false);

          document.querySelector(
            "input[name=email] ~ .validity-msg"
          ).innerHTML = "Value not valid";
        }
        // if (checkSignUpFlags()) {
        //   document.querySelector(".rd-signup-btn").disabled = false;
        // }
        document.querySelector(
          ".rd-signup-form .rd-signup-btn"
        ).disabled = !checkSignUpFlags();
      });
    document
      .querySelector("input[name=password]")
      .addEventListener("keyup", function () {
        if (validatePassword(this.value)) {
          signUpValidityFlags.set("password", true);

          document.querySelector("input[name=confpassword]").disabled = false;
          document.querySelector("#checkTos").disabled = false;
          document.querySelector(
            ".rd-password-input ~ .pswd-helper"
          ).style.color = "#444";
        } else {
          signUpValidityFlags.set("password", false);
          document.querySelector("input[name=confpassword]").disabled = true;
          document.querySelector("#checkTos").disabled = true;
          document.querySelector(
            ".rd-password-input ~ .pswd-helper"
          ).style.color = "#ff5252";
        }
        // if (checkSignUpFlags()) {
        //   document.querySelector(".rd-signup-btn").disabled = false;
        // }
        document.querySelector(
          ".rd-signup-form .rd-signup-btn"
        ).disabled = !checkSignUpFlags();
      });

    document
      .querySelector("input[name=confpassword")
      .addEventListener("keyup", function () {
        if (
          this.value === document.querySelector("input[name=password").value
        ) {
          signUpValidityFlags.set("confpassword", true);

          document.querySelector(
            "input[name=confpassword"
          ).parentElement.nextElementSibling.innerHTML = "";
        } else {
          signUpValidityFlags.set("confpassword", false);

          document.querySelector(
            "input[name=confpassword"
          ).parentElement.nextElementSibling.innerHTML =
            "Password values don't match";
        }
        // if (checkSignUpFlags()) {
        //   document.querySelector(".rd-signup-btn").disabled = false;
        // }
        document.querySelector(
          ".rd-signup-form .rd-signup-btn"
        ).disabled = !checkSignUpFlags();
      });

    document.querySelector("#checkTos").addEventListener("click", function () {
      if (this.checked) {
        signUpValidityFlags.set("tos", true);

        this.nextElementSibling.style.color = "rgba(0, 0, 0, 0.84)";
      } else {
        signUpValidityFlags.set("tos", false);

        this.nextElementSibling.style.color = "#ff5252";
      }
      // if (checkSignUpFlags()) {
      //   document.querySelector(".rd-signup-btn").disabled = false;
      // }
      document.querySelector(
        ".rd-signup-form .rd-signup-btn"
      ).disabled = !checkSignUpFlags();
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

// Request the password recovery link, needs to be reworked to use a separate input element
function passwordRecover() {
  let email;
  document.querySelector("#passRecoveryModal .err-msg").innerHTML = "";
  document.querySelector("#passRecoveryModal .err-msg").style.display = "none";
  if (
    document
      .querySelector("#passRecoveryModal input[type=email]")
      .checkValidity()
  ) {
    email = document.querySelector("#passRecoveryModal input[type=email]")
      .value;
    document.querySelector(
      "#passRecoveryModal input[type=text] + .validity-msg"
    ).innerHTML = "";
  } else {
    email = "";
    document.querySelector(
      "#passRecoveryModal input[type=text] + .validity-msg"
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
        document.querySelector("#passRecoveryModal .err-msg").innerHTML =
          "If you're a registered user, you'll receive an email with password recovery instructions shortly.";
        document.querySelector("#passRecoveryModal .err-msg").style.display =
          "block";
        document
          .querySelector("#passRecoveryModal .err-msg")
          .classList.add("success-msg");
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
    document.querySelector(".rd-signin-form input[type=text]").checkValidity()
  ) {
    login = document.querySelector(".rd-signin-form input[type=text]").value;
    document.querySelector(
      ".rd-signin-form input[type=text] + .validity-msg"
    ).innerHTML = "";
  } else {
    login = "";
    document.querySelector(
      ".rd-signin-form input[type=text] + .validity-msg"
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
        if (res.ok) {
          window.localStorage.setItem("usr", res.token);
          location.href = `./index.html`;
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (res.message) {
          errMsg.innerHTML = res.message;
          errMsg.style.display = "block";
        }
      });
    // .then((res) => {
    //   console.log(res);
    //   if (!res.ok) {
    //     errMsg.innerHTML = res.message;
    //     errMsg.style.display = "block";
    //   } else {
    //     return res.json();
    //   }
    // })
    // .then((res) => {
    //   if (res.token) {
    //     window.localStorage.setItem("usr", res.token);
    //     location.href = `./index.html`;
    //   }
    // });
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

    if (document.querySelector("input[name=confpassword]").value != password) {
      confpassword = "";
      document.querySelector(
        "input[name=confpassword"
      ).parentElement.nextElementSibling.innerHTML =
        "Password values don't match";
    } else {
      confpassword = document.querySelector("input[name=confpassword]").value;
      document.querySelector(
        "input[name=confpassword"
      ).parentElement.nextElementSibling.innerHTML = "";
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
      userData.firstName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1);
      userData.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
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
          } else {
            errMsg.innerHTML =
              "Something went wrong. Please, try again or reach out.";
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
    let spinner = document.querySelector('.lds-dual-ring');
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
    let membersNumber = 0;


    for (let member of members) { 
      membersNumber++;
    }

    console.log(membersNumber);
    let currMember = 1;

    for (let member of members) {
      let memberElement = document.createElement("rd-team-short");
      
      console.log(currMember, membersNumber)
      if ( (membersNumber - 1) % 2 !== 0 && currMember === membersNumber) {
        memberElement.classList.add("col-md-12");
      } else {
        memberElement.classList.add("col-md-6");
      }
      
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
      currMember++;
    }
    spinner.style.display = "none";
    
  }
}

// A simple basic email validation
function validateEmail(email) {
  // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  return re.test(String(email).toLowerCase());
}

// Basic password validation
function validatePassword(pass) {
  // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[./_`~|{}?:;!(),><*@#$%^&+='])(?=\S+$).{8,}$/;
  return re.test(String(pass));
}

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

function checkSignUpFlags() {
  let i = 0;

  for (let flag of signUpValidityFlags.values()) {
    if (flag) {
      i++;
    }
  }

  if (i === 6) {
    return true;
  } else {
    return false;
  }
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
