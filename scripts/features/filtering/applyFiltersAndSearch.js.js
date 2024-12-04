import { filterRecipesByTags } from './filterRecipesByTags.js';
import { filterRecipesBySearchQuery } from './filterRecipesBySearchQuery.js';

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
