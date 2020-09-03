const articleLeftImgTemplate = document.createElement("template");

articleLeftImgTemplate.innerHTML = `
  <div class="mb-3 d-flex row">
    <figure class="col-md-5">
      <a href="404.html"
        ><img
          src="./img/thumb/thumb-512x512.jpg"
          alt="post-title"
      /></a>
    </figure>
    <div class="entry-content col-md-7 pl-md-0">
      <h5 class="entry-title mb-3">
        <a href="404.html"
          >I Learned How to Die Before I Knew How to Live</a
        >
      </h5>
      <div class="entry-excerpt">
        <p>
          Tech companies need more than advisory boards if
          they want.
        </p>
      </div>
      <div class="entry-meta align-items-center">
        <p >Anna Goldfarb</p> in
        <a href="404.html">Fashion</a><br />
        <span>March 12</span>
        <span class="middotDivider"></span>
        <span class="readingTime" title="3 min read"
          >4 min read</span
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
`;

class ArticleLeftImg extends HTMLElement {
  constructor() {
    super();
    this.appendChild(articleLeftImgTemplate.content.cloneNode(true));
  }
}

window.customElements.define("rd-article-left", ArticleLeftImg);
