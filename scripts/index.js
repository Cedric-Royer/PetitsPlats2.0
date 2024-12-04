import { fetchRecipes } from './services/fetchData.js';
import { applyFiltersAndSearch } from './features/filtering/applyFilters.js';
import { setupSearchBar } from './features/search/setupSearchBar.js';
import { createRecipeCard } from './components/RecipeCard.js';
import { updateTags } from './components/Tag.js';
import { updateRecipeCount } from './utils/updateRecipeCount.js';
import { setupDropdownListeners } from './features/dropdowns/setupDropdownListeners.js';
import { updateDropdowns } from './features/dropdowns/updateDropdowns.js';

document.addEventListener('DOMContentLoaded', async () => {
    const recipesData = './data/recipes.json';
    let allRecipes = [];
    const selectedTags = { ingredient: [], appliance: [], ustensil: [] };

    const searchInput = document.querySelector('.search-input');
    const recipesContainer = document.querySelector('.recipes-container');
    const tagsContainer = document.querySelector('.tags-container');

    /**
     * Supprime un tag sélectionné d'un type donné et met à jour l'interface utilisateur.
     *
     * @param {string} type - Le type de tag (par exemple, 'ingredient', 'appliance', 'ustensil').
     * @param {string} value - La valeur du tag à supprimer.
     */
    function removeTag(type, value) {
        const index = selectedTags[type].indexOf(value);
        if (index > -1) {
            selectedTags[type].splice(index, 1);
        }
        updateUI();
    }

    /**
     * Met à jour l'interface utilisateur en appliquant les filtres et la recherche.
     * Met à jour :
     * - Le compteur de recettes.
     * - L'affichage des recettes.
     * - Les tags sélectionnés.
     * - Les listes déroulantes.
     */
    function updateUI() {
        const filteredRecipes = applyFiltersAndSearch(allRecipes, searchInput, selectedTags);

        updateRecipeCount(filteredRecipes.length);

        recipesContainer.innerHTML = '';
        filteredRecipes.forEach(recipe => recipesContainer.appendChild(createRecipeCard(recipe)));

        updateTags(selectedTags, tagsContainer, removeTag);

        updateDropdowns(filteredRecipes, selectedTags);
    }

    /**
     * Charge les recettes depuis une source donnée et initialise l'interface.
     */
    allRecipes = await fetchRecipes(recipesData);
    updateUI();

    setupDropdownListeners(selectedTags, updateUI);
    setupSearchBar(searchInput, updateUI);
});
