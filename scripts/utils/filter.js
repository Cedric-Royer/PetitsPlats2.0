export function applyFiltersAndSearch(allRecipes, searchInput, selectedTags) {
    const searchQuery = searchInput.value.toLowerCase().trim();
    const safeSearchQuery = replaceSpecialChars(searchQuery);
    const filteredRecipes = filterAndSearchRecipesWithArrayMethods(allRecipes, safeSearchQuery, selectedTags);
    updateFilters(filteredRecipes, selectedTags);
    return filteredRecipes;
}

function replaceSpecialChars(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/=/g,'')
}

function filterAndSearchRecipesWithArrayMethods(recipes, searchQuery, selectedTags) {
    let filteredRecipes = filterRecipesByTags(recipes, selectedTags);
    filteredRecipes = filterRecipesBySearchQueryWithArrayMethods(filteredRecipes, searchQuery);
    return filteredRecipes;
}

function filterRecipesBySearchQueryWithArrayMethods(recipes, searchQuery) {
    if (searchQuery.length < 3) return recipes;

    return recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchQuery) ||
               recipe.description.toLowerCase().includes(searchQuery) ||
               recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchQuery));
    });
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

export function updateFilters(filteredRecipes, selectedTags) {
    const ingredientSet = new Set();
    const applianceSet = new Set();
    const ustensilSet = new Set();

    populateFilterSets(filteredRecipes, ingredientSet, applianceSet, ustensilSet);

    loadDataInDropdowns(Array.from(ingredientSet), Array.from(applianceSet), Array.from(ustensilSet), selectedTags);
}

function populateFilterSets(recipes, ingredientSet, applianceSet, ustensilSet) {
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => ingredientSet.add(ingredient.ingredient.toLowerCase()));
        applianceSet.add(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach(ustensil => ustensilSet.add(ustensil.toLowerCase()));
    });
}

function loadDataInDropdowns(ingredientOptions, applianceOptions, ustensilOptions, selectedTags) {
    const ingredientDropdown = document.querySelector('#ingredient-dropdown .dropdown-menu');
    const applianceDropdown = document.querySelector('#appliance-dropdown .dropdown-menu');
    const ustensilDropdown = document.querySelector('#ustensil-dropdown .dropdown-menu');

    populateDropdownMenu(ingredientDropdown, ingredientOptions, selectedTags.ingredient, 'ingredient');
    populateDropdownMenu(applianceDropdown, applianceOptions, selectedTags.appliance, 'appliance' );
    populateDropdownMenu(ustensilDropdown, ustensilOptions, selectedTags.ustensil, 'ustensil');
}

function populateDropdownMenu(dropdownMenu, options, selectedTags, dropdownId) {
    const selectedValues = new Set(selectedTags);
    dropdownMenu.textContent = '';

    const fragment = document.createDocumentFragment();

    const searchContainer = createSearchContainer(dropdownMenu, dropdownId);
    fragment.appendChild(searchContainer);

    options.sort().forEach(option => {
        const item = document.createElement('div');
        item.classList.add('dropdown-item');
        item.dataset.value = option;
        item.textContent = capitalize(option);
        if (selectedValues.has(option)) {
            item.classList.add('selected');
        }
        fragment.appendChild(item);
    });

    dropdownMenu.appendChild(fragment);
}

function createSearchContainer(dropdownMenu, dropdownId) {
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('dropdown-filter-container', 'relative', 'mb-2', 'flex', 'items-center', 'border', 'rounded', 'border-gray-300', 'bg-white', 'p-1');
    
    const searchInput = document.createElement('input');
    searchInput.id = `search-${dropdownId}`;
    searchInput.type = 'text';
    searchInput.setAttribute("minlength", "3")
    searchInput.setAttribute("maxlength", "40")
    searchInput.setAttribute("pattern", "[A-Za-zÀ-ÿ\s'\\\-]+")
    searchInput.setAttribute("title", "Lettres, espaces, apostrophes et tirets autorisés")
    searchInput.classList.add('dropdown-filter-input', 'w-full', 'px-2', 'py-1', 'text-sm', 'outline-none');
    
    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.textContent = '\u00D7';
    clearButton.classList.add('dropdown-remove-input', 'absolute', 'right-8', 'text-custom-gray', 'hover:text-black', 'focus:outline-none', 'cursor-pointer', 'hidden');
    
    const searchIcon = createSearchIcon();

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearButton);
    searchContainer.appendChild(searchIcon);

    addSearchContainerEventListeners(dropdownMenu, searchInput, clearButton);

    return searchContainer;
}

function createSearchIcon() {
    const searchIcon = document.createElement('img');
    searchIcon.src = '../assets/icons/search-icon.svg';
    searchIcon.alt = 'icône de recherche';
    searchIcon.classList.add('dropdown-search-icon', 'absolute', 'right-2', 'text-gray-400');
    return searchIcon;
}

function addSearchContainerEventListeners(dropdownMenu, searchInput, clearButton) {
    function filterOptions() {
        const filterValue = searchInput.value.toLowerCase().trim();
        const safeFilterValue = replaceSpecialChars(filterValue);
        dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(safeFilterValue) ? '' : 'none';
        });

        clearButton.classList.toggle('hidden', safeFilterValue.trim() === '');
    }

    clearButton.addEventListener('click', (event) => {
        event.stopPropagation();
        searchInput.value = '';
        filterOptions();
    });

    searchInput.addEventListener('input', filterOptions);
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
