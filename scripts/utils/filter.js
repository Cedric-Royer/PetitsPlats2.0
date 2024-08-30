import { loadDataInDropdowns } from './dropdownFilters.js';

export function applyFiltersAndSearch(allRecipes, searchInput, selectedTags) {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredRecipes = filterAndSearchRecipes(allRecipes, searchQuery, selectedTags);
    updateFilters(filteredRecipes, selectedTags);
    return filteredRecipes;
}

function filterAndSearchRecipes(recipes, searchQuery, selectedTags) {
    let filteredRecipes = filterRecipesByTags(recipes, selectedTags);
    filteredRecipes = filterRecipesBySearchQuery(filteredRecipes, searchQuery);
    return filteredRecipes;
}

function filterRecipesByTags(recipes, selectedTags) {
    return recipes.filter(recipe => isRecipeMatchingAllTags(recipe, selectedTags));
}

function isRecipeMatchingAllTags(recipe, selectedTags) {
    const ingredientFilterActive = selectedTags.ingredient.length > 0;
    const applianceFilterActive = selectedTags.appliance.length > 0;
    const ustensilFilterActive = selectedTags.ustensil.length > 0;

    const ingredientMatch = !ingredientFilterActive || selectedTags.ingredient.every(tag =>
        recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
        )
    );

    const applianceMatch = !applianceFilterActive || selectedTags.appliance.every(tag =>
        recipe.appliance.toLowerCase().includes(tag.toLowerCase())
    );

    const ustensilMatch = !ustensilFilterActive || selectedTags.ustensil.every(tag =>
        recipe.ustensils.some(ustensil =>
            ustensil.toLowerCase().includes(tag.toLowerCase())
        )
    );

    return ingredientMatch && applianceMatch && ustensilMatch;
}

function filterRecipesBySearchQuery(recipes, searchQuery) {
    if (searchQuery.length < 3) return recipes;

    return recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchQuery) ||
               recipe.description.toLowerCase().includes(searchQuery) ||
               recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchQuery));
    });
}

export function updateFilters(filteredRecipes, selectedTags) {
    const ingredientSet = new Set();
    const applianceSet = new Set();
    const ustensilSet = new Set();

    populateFilterSets(filteredRecipes, ingredientSet, applianceSet, ustensilSet);

    // Appel de la fonction pour mettre à jour les dropdowns
    loadDataInDropdowns(Array.from(ingredientSet), Array.from(applianceSet), Array.from(ustensilSet), selectedTags);
}

function populateFilterSets(recipes, ingredientSet, applianceSet, ustensilSet) {
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => ingredientSet.add(ingredient.ingredient.toLowerCase()));
        applianceSet.add(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach(ustensil => ustensilSet.add(ustensil.toLowerCase()));
    });
}
