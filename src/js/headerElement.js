/* CREATE TEMPLATE FOR HEADER WITH TEMPLATE ELEMENT*/

const templateHeader = document.createElement("template");

templateHeader.innerHTML = ` 
<header id="header" class="d-lg-block d-none">
<div class="container">
  <div class="align-items-center w-100">
    <h1 class="logo float-left navbar-brand">
      <a href="index.html" class="logo">Rubber Duck</a>
    </h1>
    <div class="header-right float-right w-50">
      <div
        class="d-inline-flex float-right text-right align-items-center"
      >
        <ul
          class="social-network heading navbar-nav d-lg-flex align-items-center"
        >
          <li>
            <a href="#"><i class="icon-facebook"></i></a>
          </li>
        </ul>
        <ul
          class="top-menu heading navbar-nav w-100 d-md-flex flex-row align-items-center"
        >
          <li><a href="./signin.html" class="btn">Sign In</a></li>
          <li><a href="./signup.html" class="btn">Sign Up</a></li>
        </ul>
        <a class="author-avatar" href="#"
          ><img src="./img/thumb/author-avata-1.jpg" alt=""
        /></a>
      </div>
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
    </div>
  </div>
  <div class="clearfix"></div>
</div>
<nav id="main-menu" class="stick d-lg-block d-none">
  <div class="container">
    <div class="menu-primary">
      <ul>
        <li class="current-menu-item"><a href="index.html">Home</a></li>
        <li class="menu-item-has-children">
          <a href="categories.html">Categories</a>
          <ul class="sub-menu">
            <li><a href="categories.html">Politics</a></li>
            <li><a href="categories.html">Health</a></li>
            <li><a href="categories.html">Design</a></li>
          </ul>
        </li>
        <li><a href="team.html">Team</a></li>
        <li><a href="categories.html">Politics</a></li>
        <li><a href="categories.html">Health</a></li>
        <li><a href="categories.html">Design</a></li>
        <li><a href="categories.html">Startups</a></li>
        <li><a href="categories.html">Culture</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li class="menu-item-has-children">
          <a href="#">More...</a>
          <ul class="sub-menu">
            <li><a href="search.html">Search</a></li>
            <li><a href="author.html">Author</a></li>
            <li><a href="404.html">404</a></li>
          </ul>
        </li>
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
  }
}

// DEFINE A TAG NAME FOR THE CLASS
window.customElements.define("rd-header", HeaderElement);
