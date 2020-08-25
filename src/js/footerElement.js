const templateFooter = document.createElement("template");

templateFooter.innerHTML = `
<footer class="mt-5">
<div class="container">
  <div class="divider"></div>
  <div class="row">
    <div class="col-md-4 copyright text-xs-center">
      <p>
        Copyright &#169; 2019 GBG Baku inc. 
      </p>
    </div>
    <div class="col-md-4">
      <p class="rd-msg text-muted pl-4 ml-2 text-sm" style="font-size: 0.8rem;"></p>
      <form class="d-flex flex-row justify-content-center">
        <div class="form-group">
          <input class="form-control-sm" type="email" placeholder="Subscribe" required/>
        </div>
        <div class="form-group">
          <button class="btn btn-dark btn-sm ml-3">Subscribe</button>
        </div>
      </form>
    </div>
    <div class="col-md-4">
      <ul class="social-network inline text-md-right text-sm-center">
        <li class="list-inline-item">
          <a href="#"><i class="icon-facebook"></i></a>
        </li>
        <li class="list-inline-item">
          <a href="#"><i class="icon-twitter"></i></a>
        </li>
        <li class="list-inline-item">
          <a href="#"><i class="icon-behance"></i></a>
        </li>
      </ul>
    </div>
  </div>
</div>
</footer>
`;

class footerElement extends HTMLElement {
  constructor() {
    super();

    this.appendChild(templateFooter.content.cloneNode(true));
  }

  connectedCallback() {
    let subBtn = this.querySelector("button");
    let subInput = this.querySelector("input[type=email]");
    subBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.validateEmail(subInput.value)) {
        let subEmail = subInput.value;

        let subData = {};
        subData.email = subEmail;
        subData = JSON.stringify(subData);

        fetch(`https://gdg-ms-subscriber.herokuapp.com/subscriber`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: subData,
        })
          .then((res) => {
            if (res.ok) {
              return res;
            } else {
              return;
            }
          })
          .then((res) => {
            this.querySelector(".rd-msg").innerHTML =
              "Thank you for subscribing!";
            this.querySelector("input[type=email]").value = "";
          });
      } else {
        this.querySelector(".rd-msg").innerHTML = "Invalid email";

      }
    });
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

window.customElements.define("rd-footer", footerElement);
