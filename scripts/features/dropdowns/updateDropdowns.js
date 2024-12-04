import { populateDropdownMenu } from './populateDropdownMenu.js';

/**
 * Met à jour les options disponibles dans les dropdowns en fonction des recettes filtrées.
 * @param {Array} filteredRecipes - Les recettes après filtrage.
 * @param {Object} selectedTags - Les tags sélectionnés par type.
 */
export function updateDropdowns(filteredRecipes, selectedTags) {
    const ingredientSet = new Set();
    const applianceSet = new Set();
    const ustensilSet = new Set();

    filteredRecipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) =>
            ingredientSet.add(ingredient.ingredient.toLowerCase())
        );
        applianceSet.add(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach((ustensil) => ustensilSet.add(ustensil.toLowerCase()));
    });

    loadDataInDropdowns(
        Array.from(ingredientSet),
        Array.from(applianceSet),
        Array.from(ustensilSet),
        selectedTags
    );
}

/**
 * Remplit les menus déroulants avec un champ de recherche et les options disponibles.
 * @param {Array} ingredientOptions - Liste des ingrédients.
 * @param {Array} applianceOptions - Liste des appareils.
 * @param {Array} ustensilOptions - Liste des ustensiles.
 * @param {Object} selectedTags - Les tags sélectionnés par type.
 */
function loadDataInDropdowns(ingredientOptions, applianceOptions, ustensilOptions, selectedTags) {
    const ingredientDropdown = document.querySelector('#ingredient-dropdown .dropdown-menu');
    const applianceDropdown = document.querySelector('#appliance-dropdown .dropdown-menu');
    const ustensilDropdown = document.querySelector('#ustensil-dropdown .dropdown-menu');

    populateDropdownMenu(ingredientDropdown, ingredientOptions, selectedTags.ingredient, 'ingredient');
    populateDropdownMenu(applianceDropdown, applianceOptions, selectedTags.appliance, 'appliance');
    populateDropdownMenu(ustensilDropdown, ustensilOptions, selectedTags.ustensil, 'ustensil');
}
