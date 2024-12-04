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
export function filterRecipesByTags(recipes, selectedTags) {
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