/**
 * Filtre les recettes en fonction de la recherche textuelle.
 *
 * @param {Object[]} recipes - La liste des recettes.
 * @param {string} query - La requête de recherche textuelle.
 * @returns {Object[]} - La liste des recettes correspondant à la recherche.
 */
export function filterRecipesBySearchQuery(recipes, query) {
    if (query.length < 3) return recipes;
    return recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query))
    );
}