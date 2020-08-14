const templateFooter = document.createElement("template");

templateFooter.innerHTML = `
<footer class="mt-5">
<div class="container">
  <div class="divider"></div>
  <div class="row">
    <div class="col-md-6 copyright text-xs-center">
      <p>
        Copyright ?? 2019 GBG Baku inc. Designed by
        <a href="https://alithemes.com">AliThemes.com</a>
      </p>
    </div>
    <div class="col-md-6">
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
}

window.customElements.define("rd-footer", footerElement);
