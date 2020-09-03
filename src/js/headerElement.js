/* CREATE TEMPLATE FOR HEADER WITH TEMPLATE ELEMENT*/

const templateHeader = document.createElement("template");

templateHeader.innerHTML = ` 
<header id="header" class="d-lg-block d-none">
<div class="container">
  <div class="align-items-center w-100">
    <h1 class="logo float-left navbar-brand">
      <a href="index.html" class="logo">Rubber Duck</a>
    </h1>
    <div class="header-right float-right w-50 d-flex flex-row align-items-center justify-content-end">
      
      <div
        class="d-inline-flex float-right text-right align-items-center"
      >
        
        <ul
          class="top-menu heading navbar-nav w-100 d-md-flex flex-row row-reverse align-items-center"
        >
          <li><a href="./signin.html" class="btn rd-signin-btn">Sign In</a></li>
          <li><a href="./signup.html" class="btn rd-signup-btn">Sign Up</a></li>
        </ul>
        <div class="rd-header-fullname d-flex flex-row text-left text-dark mx-3">
          <p class="rd-header-fname p-2 m-0"></p>
          <p class="rd-header-lname p-2 m-0"></p>
        </div>
        

        <a class="author-avatar" href="userprofile.html"
          ><img src="./img/thumb/default-avatar.png" alt=""
        /></a>
      </div>
      
    </div>
  </div>
  <div class="clearfix"></div>
</div>
<nav id="main-menu" class="stick d-lg-block d-none">
  <div class="container">
    <div class="menu-primary">
      <ul class="d-flex justify-content-start">
        <li class="current-menu-item"><a href="index.html">Home</a></li>
        
        <li><a href="404.html">Posts</a></li>
        <li><a href="404.html">News</a></li>
        <li><a href="404.html">Forum Questions</a></li>
        <li><a href="404.html">Write a post</a></li>
        <li><a href="404.html">Ask a Question</a></li>
        <li><a href="team.html">Team</a></li>
        <li><a href="contact.html">Contact us</a></li>
        
      </ul>
      <span></span>
    </div>
  </div>
</nav>
</header>
`;

// DEFINE HEADER CLASS

class HeaderElement extends HTMLElement {
  constructor() {
    super();
    this.appendChild(templateHeader.content.cloneNode(true));

    if (window.localStorage.getItem("usr")) {
      this.querySelector(".rd-signin-btn").style.display = "none";
      this.querySelector(".rd-signup-btn").style.display = "none";

      let token = window.localStorage.getItem("usr");
      fetch(`https://gdg-ms-auth.herokuapp.com/auth/validate`, {
        method: "POST",
        headers: {
          "X-Auth-Token": token,
        },
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            this.querySelector(".rd-signin-btn").style.display = "block";
            this.querySelector(".rd-signup-btn").style.display = "block";

            this.querySelector(".author-avatar img").setAttribute(
              "src",
              `./img/thumb/default-avatar.png`
            );
            throw new Error("Not logged in");
          } else {
            return res.json();
          }
        })
        .then((res) => {
          fetch(`https://gdg-ms-auth.herokuapp.com/user/${res.userId}`)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              if (res.firstName) {
                this.querySelector(".rd-header-fname").innerHTML =
                  res.firstName;
                this.querySelector(".rd-header-lname").innerHTML = res.lastName;
              }
            });
        })
        .catch((err) => {
          return;
        });
    }
  }
}

// DEFINE A TAG NAME FOR THE CLASS
window.customElements.define("rd-header", HeaderElement);
