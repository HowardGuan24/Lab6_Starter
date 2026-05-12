// RecipeCard.js

class RecipeCard extends HTMLElement {
	// Called once when document.createElement('recipe-card') is called, or
	// the element is written into the DOM directly as <recipe-card>
	constructor() {
		super(); // Inherit everything from HTMLElement

		// A1. TODO - 附加 Shadow DOM
		this.attachShadow({ mode: 'open' });

		// A2. TODO - 创建 <article> 元素
		const article = document.createElement('article');

		// A3. TODO - 创建 <style> 元素
		const style = document.createElement('style');

		// A4. TODO - 注入样式
		// 请打开 reference/cardTemplate.html，把 <style> 标签里面的所有 CSS 复制并粘贴到下面引号里
		style.textContent = `
		* {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  article {
    align-items: center;
    border: 1px solid rgb(223, 225, 229);
    border-radius: 8px;
    display: grid;
    grid-template-rows: 118px 56px 14px 18px 15px 36px;
    height: auto;
    row-gap: 5px;
    padding: 0 16px 16px 16px;
    width: 178px;
  }

  div.rating {
    align-items: center;
    column-gap: 5px;
    display: flex;
  }

  div.rating>img {
    height: auto;
    display: inline-block;
    object-fit: scale-down;
    width: 78px;
  }

  article>img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 118px;
    object-fit: cover;
    margin-left: -16px;
    width: calc(100% + 32px);
  }

  p.ingredients {
    height: 32px;
    line-height: 16px;
    padding-top: 4px;
    overflow: hidden;
  }

  p.organization {
    color: black !important;
  }

  p.title {
    display: -webkit-box;
    font-size: 16px;
    height: 36px;
    line-height: 18px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  p:not(.title),
  span,
  time {
    color: #70757A;
    font-size: 12px;
  }
		`;

		// A5. TODO - 将 style 和 article 添加到 Shadow DOM
		this.shadowRoot.append(style, article);
	}

	/**
	 * Called when the .data property is set on this element.
	 *
	 * For example:
	 * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
	 * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
	 *
	 * @param {Object} data - The data to pass into the <recipe-card> must be of the
	 *                        following format:
	 *                        {
	 *                          "imgSrc": "string",
	 *                          "imgAlt": "string",
	 *                          "titleLnk": "string",
	 *                          "titleTxt": "string",
	 *                          "organization": "string",
	 *                          "rating": number,
	 *                          "numRatings": number,
	 *                          "lengthTime": "string",
	 *                          "ingredients": "string"
	 *                        }
	 */
	set data(data) {
		// If nothing was passed in, return
		if (!data) return;
		// A6. TODO - 选择 Shadow DOM 里的 <article>
		const article = this.shadowRoot.querySelector('article');

		// A7. TODO - 使用模板字符串填充 HTML 内容
		// 注意：不要包含外层的 <article> 标签，只写里面的内容
		article.innerHTML = `
		<img src="${data.imgSrc}"
			alt="${data.imgAlt}">
		<p class="title">
			<a href="${data.titleLnk}">${data.titleTxt}</a>
		</p>
		<p class="organization">${data.organization}</p>
		<div class="rating">
			<span>${data.rating}</span>
			<img src="./assets/images/icons/${data.rating}-star.svg" alt="${data.rating} stars">
			<span>(${data.numRatings})</span>
		</div>
		<time>${data.lengthTime}</time>
		<p class="ingredients">
			${data.ingredients}
		</p>
		`;
	}
}

customElements.define('recipe-card', RecipeCard);
