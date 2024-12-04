/**
 * Applique les filtres par tags et recherche textuelle sur la liste de recettes.
 *
 * @param {Object[]} allRecipes - La liste complète des recettes.
 * @param {HTMLInputElement} searchInput - L'élément de saisie pour la recherche textuelle.
 * @param {Object} selectedTags - Les tags sélectionnés pour filtrer les recettes.
 * @param {string[]} selectedTags.ingredient - Liste des tags d'ingrédients.
 * @param {string[]} selectedTags.appliance - Liste des tags d'appareils.
 * @param {string[]} selectedTags.ustensil - Liste des tags d'ustensiles.
 * @returns {Object[]} - La liste des recettes correspondant aux critères de recherche et de filtrage.
 */
export function applyFiltersAndSearch(allRecipes, searchInput, selectedTags) {
    const searchQuery = searchInput.value.toLowerCase().trim();
    const filteredByTags = filterRecipesByTags(allRecipes, selectedTags);
    return filterRecipesBySearchQuery(filteredByTags, searchQuery);
}

/**
 * Filtre les recettes selon les tags sélectionnés.
 *
 * @param {Object[]} recipes - La liste des recettes.
 * @param {Object} selectedTags - Les tags sélectionnés pour le filtrage.
 * @param {string[]} selectedTags.ingredient - Liste des tags d'ingrédients.
 * @param {string[]} selectedTags.appliance - Liste des tags d'appareils.
 * @param {string[]} selectedTags.ustensil - Liste des tags d'ustensiles.
 * @returns {Object[]} - La liste des recettes correspondant aux tags sélectionnés.
 */
function filterRecipesByTags(recipes, selectedTags) {
    return recipes.filter(recipe => {
        const ingredientMatch = selectedTags.ingredient.every(tag =>
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()))
        );
        const applianceMatch = selectedTags.appliance.every(tag =>
            recipe.appliance.toLowerCase().includes(tag.toLowerCase())
        );
        const utensilMatch = selectedTags.ustensil.every(tag =>
            recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase()))
        );
        return ingredientMatch && applianceMatch && utensilMatch;
    });
}

/**
 * Filtre les recettes en fonction de la recherche textuelle.
 *
 * @param {Object[]} recipes - La liste des recettes.
 * @param {string} query - La requête de recherche textuelle.
 * @returns {Object[]} - La liste des recettes correspondant à la recherche.
 */
function filterRecipesBySearchQuery(recipes, query) {
    if (query.length < 3) return recipes;
    return recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query))
    );
}
