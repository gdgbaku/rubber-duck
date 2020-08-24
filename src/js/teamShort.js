const template = document.createElement("template");

template.innerHTML = `
  <style>

    a {
      text-decoration: none;
    }

    .team-short {
      width: 100%;
      margin: 1.5rem 0.5rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      color: rgba(0,0,0,.84)

    }

    .team-short-img {
      margin: 1rem;
      clip-path: circle(50%);
      height: 100px;
      width: 100px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .team-short-top {
      margin-bottom: 1.0rem;
    }

    .team-short-top a {
      color: rgba(0,0,0,.84);
      font-size: 1.2rem;
    }

    .team-short-top p {
      margin: 0;
      font-size: .9rem
    }

    .team-short-top h5 {
      margin-bottom: 0.3rem;
    }

    .team-short-content {
      color: #555;
      font-size: 1rem;
    }

    .content-social-author {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .author-social {
      color: rgba(0,0,0,.84);
      margin-right: 1rem;
      font-size: 1rem;
      font-weight: 500;
    }

    .author-social:hover, .team-short-top a:hover {
      color: #03a87c
    } 

    .email {
      display: block;
      color: #555;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .mentor {
      flex-direction: column;
      text-align: center;
      border-radius: 5px;
      padding: 2rem 0;
    }

    .mentor .content-social-author{
      justify-content: center;
    }

    .mentor .content-social-author .author-social:last-child {
      margin-right: 0;
    }

  </style>
  
    <div class="team-short">
        <div class="team-short-img">
        </div>
        <div class="team-short-content">
          <div class="team-short-top">
            <h5>
              <h3 href="#" title="Ryan" rel="author">
                <slot name="fullname"></slot>
               
              </h3>
            </h5>
            <p class="team-position"><slot name="position"></slot></p>
          </div>
            <a class="email" href="mailto:niyatsu@gmail.com"><slot name="email"></slot></a>
            <div class="content-social-author">
                <a target="_blank" class="author-social" href="#">GitHub </a>
                <a target="_blank" class="author-social" href="#">LinkedIn </a>
            </div>
        </div>
    </div> 
   
`;

class TeamShort extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    let avatarUrl = this.getAttribute("avatar");
    let gitUrl = this.getAttribute("giturl");
    let linkedinUrl = this.getAttribute("linkedinurl");
    let avatarImg = this.shadowRoot.querySelector(".team-short-img");
    avatarImg.style.backgroundImage = `url(${avatarUrl})`;
    if (this.getAttribute("position") === "Mentor") {
      this.shadowRoot.querySelector(".team-short").classList.add("mentor");
      this.classList.add("col-md-12");
    }
    let gitAnchor = this.shadowRoot.querySelector(
      ".content-social-author a:first-child"
    );
    gitAnchor.href = gitUrl;

    let linkedinAnchor = this.shadowRoot.querySelector(
      ".content-social-author a:last-child"
    );
    linkedinAnchor.href = linkedinUrl;

    let email = this.shadowRoot.querySelector(".email");
    email.href = `mailto:${this.getAttribute("email")}`;
    console.log(avatarUrl);
  }
}

window.customElements.define("rd-team-short", TeamShort);
