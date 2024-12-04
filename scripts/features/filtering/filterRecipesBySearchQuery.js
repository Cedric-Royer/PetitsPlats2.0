/**
 * Filtre les recettes en fonction de la recherche textuelle.
 *
 * @param {Object[]} recipes - La liste des recettes.
 * @param {string} query - La requête de recherche textuelle.
 * @returns {Object[]} - La liste des recettes correspondant à la recherche.
 */
export function filterRecipesBySearchQuery(recipes, query) {
    const searchQuery = query.toLowerCase();
    if (searchQuery.length < 3) return recipes;
    const results = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let matchFound = false;

        for (let j = 0; j <= recipe.name.length - searchQuery.length; j++) {
            if (recipe.name.toLowerCase().substring(j, j + searchQuery.length) === searchQuery) {
                matchFound = true;
                break;
            }
        }

        if (!matchFound) {
            for (let j = 0; j <= recipe.description.length - searchQuery.length; j++) {
                if (recipe.description.toLowerCase().substring(j, j + searchQuery.length) === searchQuery) {
                    matchFound = true;
                    break;
                }
            }
        }

        if (!matchFound) {
            for (let k = 0; k < recipe.ingredients.length; k++) {
                const ingredient = recipe.ingredients[k].ingredient.toLowerCase();
                for (let j = 0; j <= ingredient.length - searchQuery.length; j++) {
                    if (ingredient.substring(j, j + searchQuery.length) === searchQuery) {
                        matchFound = true;
                        break;
                    }
                }
                if (matchFound) break;
            }
        }

        if (matchFound) {
            results.push(recipe);
        }
    }

    return results;
}
