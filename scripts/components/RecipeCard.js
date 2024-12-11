import { createElement } from '../utils/domUtils.js';

/**
 * Crée une carte de recette (HTML) à partir des informations d'une recette.
 *
 * @param {Object} recipe - Les données de la recette.
 * @param {string} recipe.name - Le nom de la recette.
 * @param {string} recipe.image - Le chemin de l'image de la recette.
 * @param {number} recipe.time - Le temps de préparation de la recette (en minutes).
 * @param {string} recipe.description - La description de la recette.
 * @param {Object[]} recipe.ingredients - La liste des ingrédients de la recette.
 * @param {string} recipe.ingredients[].ingredient - Le nom de l'ingrédient.
 * @param {number} [recipe.ingredients[].quantity] - La quantité de l'ingrédient.
 * @param {string} [recipe.ingredients[].unit] - L'unité de mesure de l'ingrédient.
 * @returns {HTMLElement} - La carte de recette créée.
 */
export function createRecipeCard(recipe) {
    const recipeCard = createElement('article', { classes: ['recipe-card', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'bg-white'] });

    const recipeImageContainer = createRecipeImageContainer(recipe);
    const recipeContent = createRecipeContent(recipe);

    recipeCard.append(recipeImageContainer, recipeContent);
    return recipeCard;
}

/**
 * Crée un conteneur pour l'image d'une recette, incluant un badge indiquant le temps de préparation.
 *
 * @param {Object} recipe - Les données de la recette.
 * @param {string} recipe.name - Le nom de la recette.
 * @param {string} recipe.image - Le chemin de l'image de la recette.
 * @param {number} recipe.time - Le temps de préparation de la recette (en minutes).
 * @returns {HTMLElement} - Le conteneur de l'image de la recette.
 */
function createRecipeImageContainer(recipe) {
    const container = createElement('div', { classes: ['relative'] });

    const imageBasePath = `./assets/images/recettes/${recipe.image}`;
    const [baseName, extension] = recipe.image.split('.');
    const srcset = `
        ${imageBasePath.replace(recipe.image, `${baseName}-small.${extension}`)} 480w,
        ${imageBasePath.replace(recipe.image, `${baseName}-medium.${extension}`)} 768w
    `;

    const image = createElement('img', {
        attributes: {
            src: imageBasePath.replace(recipe.image, `${baseName}-small.${extension}`), 
            srcset: srcset.trim(),
            sizes: '(max-width: 1640px) 480px, 650px',
            alt: `Image de ${recipe.name}`
        },
        classes: ['w-full', 'h-48', 'object-cover'],
    });

    const timeBadge = createElement('div', {
        textContent: `${recipe.time}min`,
        classes: ['recipe-time', 'absolute', 'top-2', 'right-2', 'text-xs', 'px-4', 'py-1', 'rounded-full'],
    });

    container.append(image, timeBadge);
    return container;
}

/**
 * Crée le contenu principal d'une carte de recette.
 *
 * @param {Object} recipe - Les données de la recette.
 * @param {string} recipe.name - Le nom de la recette.
 * @param {string} recipe.description - La description de la recette.
 * @param {Object[]} recipe.ingredients - La liste des ingrédients de la recette.
 * @returns {HTMLElement} - Le contenu de la carte de recette.
 */
function createRecipeContent(recipe) {
    const content = createElement('div', { classes: ['p-4', 'recipe-content'] });
    const name = createElement('h2', { textContent: recipe.name, classes: ['text-xl', 'font-normal', 'mb-5'] });

    const descriptionLabel = createElement('h3', { textContent: 'Recette', classes: ['recipe-subtitle', 'text-custom-gray', 'font-bold', 'text-sm', 'uppercase', 'mb-5'] });
    const description = createRecipeDescription(recipe);

    const ingredientsLabel = createElement('h3', { textContent: 'Ingrédients', classes: ['recipe-subtitle', 'text-custom-gray', 'font-bold', 'text-sm', 'uppercase', 'mb-5'] });
    const ingredients = createIngredientsList(recipe);

    content.append(name, descriptionLabel, description, ingredientsLabel, ingredients);
    return content;
}

/**
 * Crée la description textuelle d'une recette.
 *
 * @param {Object} recipe - Les données de la recette.
 * @param {string} recipe.description - La description de la recette.
 * @returns {HTMLElement} - L'élément contenant la description de la recette.
 */
function createRecipeDescription(recipe) {
    return createElement('p', {
        textContent: recipe.description,
        classes: ['recipe-description', 'text-sm', 'mb-4', 'line-clamp-4'],
    });
}

/**
 * Crée une liste HTML des ingrédients d'une recette.
 *
 * @param {Object} recipe - Les données de la recette.
 * @param {Object[]} recipe.ingredients - La liste des ingrédients de la recette.
 * @param {string} recipe.ingredients[].ingredient - Le nom de l'ingrédient.
 * @param {number} [recipe.ingredients[].quantity] - La quantité de l'ingrédient.
 * @param {string} [recipe.ingredients[].unit] - L'unité de mesure de l'ingrédient.
 * @returns {HTMLElement} - La liste HTML des ingrédients.
 */
function createIngredientsList(recipe) {
    const list = createElement('ul', { classes: ['text-sm', 'grid', 'grid-cols-2', 'gap-x-2'] });
    recipe.ingredients.forEach(ingredient => {
        const item = createIngredientItem(ingredient);
        list.appendChild(item);
    });
    return list;
}

/**
 * Crée un élément HTML pour un ingrédient.
 *
 * @param {Object} ingredient - Les données de l'ingrédient.
 * @param {string} ingredient.ingredient - Le nom de l'ingrédient.
 * @param {number} [ingredient.quantity] - La quantité de l'ingrédient.
 * @param {string} [ingredient.unit] - L'unité de mesure de l'ingrédient.
 * @returns {HTMLElement} - L'élément HTML représentant l'ingrédient.
 */
function createIngredientItem(ingredient) {
    const item = createElement('li', { classes: ['ingredient-item', 'mb-5'] });

    const name = createElement('span', {
        textContent: ingredient.ingredient,
        classes: ['block', 'ingredient-item__name'],
    });

    const quantity = createElement('span', {
        textContent: `${ingredient.quantity || ''} ${ingredient.unit || ''}`,
        classes: ['block', 'ingredient-item__quantity'],
    });

    item.append(name, quantity);
    return item;
}
