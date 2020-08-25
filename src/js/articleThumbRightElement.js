const template = document.createElement("template");

template.innerHTML = `
<div class="col-md-7">
  <div class="align-self-center">
    <h3 class="entry-title mb-3">
      <a href="./404.html"
        >Home Internet Is Becoming a Luxury for the Wealthy</a
      >
    </h3>
    <div class="entry-excerpt">
      <p>
        And black on meretriciously regardless well fearless
        irksomely as about hideous wistful bat less oh much
        and occasional useful rat darn jeepers far.
      </p>
    </div>
    <div class="entry-meta align-items-center">
      <p >Dave Gershgorn</p> in
      <a href="/404.html">OneZero</a><br />
      <span>May 21</span>
      <span class="middotDivider"></span>
      <span class="readingTime" title="3 min read"
        >5 min read</span
      >
      <span class="svgIcon svgIcon--star">
        <svg class="svgIcon-use" width="15" height="15">
          <path
            d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z"
          ></path>
        </svg>
      </span>
    </div>
  </div>
  </div>
<div
  class="col-md-4 bgcover"
  style="
    background-image: url(./img/thumb/thumb-800x495.jpg);
  "
></div>
`;

class ArticleImgRight extends HTMLElement {
  constructor() {
    super();

    this.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("rd-article-right", ArticleImgRight);
