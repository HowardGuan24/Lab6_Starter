// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. 获取 <main> 元素的引用
  const main = document.querySelector('main');
  
  // A11. 遍历数组，创建并添加卡片
  recipes.forEach(recipe => {
    const card = document.createElement('recipe-card');
    card.data = recipe; // 这会触发你写的 RecipeCard.js 里的 setter
    main.appendChild(card);
  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // B1. 将数组转为字符串并存入 localStorage
  localStorage.setItem('recipes', JSON.stringify(recipes));
}
/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  const main = document.querySelector('main'); // 后续添加卡片需要用到

  // B2. 获取 <form> 元素
  const form = document.querySelector('form');
  
  // B3. 为表单添加 'submit' 事件监听
  form.addEventListener('submit', (event) => {
    // 阻止表单默认刷新页面的行为
    event.preventDefault();

    // B4. 创建 FormData 对象
    const formData = new FormData(form);

    // B5. 将数据提取到 recipeObject 中
    const recipeObject = {};
    formData.forEach((value, key) => {
      recipeObject[key] = value;
    });

    // B6. 创建新卡片
    const card = document.createElement('recipe-card');

    // B7. 注入数据
    card.data = recipeObject;

    // B8. 挂载到页面
    main.appendChild(card);

    // B9. 更新 localStorage
    const recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);
  });

  // B10. 获取 "Clear Local Storage" 按钮
  // 提示：HTML 中这个按钮通常有一个特定的类名，比如 class="danger"
  const clearButton = document.querySelector('button.danger');

  // B11. 添加点击事件监听
  clearButton.addEventListener('click', () => {
    // B12. 清空 localStorage
    localStorage.clear();

    // B13. 移除页面上的所有卡片
    main.innerHTML = '';
  });
}
