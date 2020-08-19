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
      <form
          action="#"
          method="get"
          class="search-form d-lg-flex float-right"
        >
          <a href="javascript:void(0)" class="search-toggle">
            <i class="icon-search"></i>
          </a>
          <input
            type="text"
            class="search_field"
            placeholder="Search..."
            value=""
            name="s"
          />
      </form>
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
        

        <a class="author-avatar" href="#"
          ><img src="./img/thumb/author-avata-1.jpg" alt=""
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
        <li class="menu-item-has-children">
          <a href="categories.html">Categories</a>
          <ul class="sub-menu">
            <li><a href="categories.html">Politics</a></li>
            <li><a href="categories.html">Health</a></li>
            <li><a href="categories.html">Design</a></li>
          </ul>
        </li>
        <li><a href="team.html">Posts</a></li>
        <li><a href="team.html">News</a></li>
        <li><a href="team.html">Forum Questions</a></li>
        <li><a href="team.html">Write a post</a></li>
        <li><a href="team.html">Ask a Question</a></li>
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
          console.log(res);
          if (res.status !== 200 || res.status !== 201) {
            this.querySelector(".rd-signin-btn").style.display = "block";
            this.querySelector(".rd-signup-btn").style.display = "block";

            this.querySelector(".author-avatar img").setAttribute(
              "src",
              `./img/thumb/default-avatar.png`
            );
          }
          return res.json();
        })
        .then((res) => {
          console.log(res);

          fetch(`https://gdg-ms-auth.herokuapp.com/user/${res.userId}`)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log(res);
              if (res.firstName) {
                this.querySelector(".rd-header-fname").innerHTML =
                  res.firstName;
                this.querySelector(".rd-header-lname").innerHTML = res.lastName;
              }
            });
        });
    }
  }
}

// DEFINE A TAG NAME FOR THE CLASS
window.customElements.define("rd-header", HeaderElement);
