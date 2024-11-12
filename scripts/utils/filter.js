export function applyFiltersAndSearch(allRecipes, searchInput, selectedTags) {
    const searchQuery = searchInput.value.toLowerCase().trim();
    const filteredRecipes = filterAndSearchRecipesWithArrayMethods(allRecipes, searchQuery, selectedTags);
    updateFilters(filteredRecipes, selectedTags);
    return filteredRecipes;
}

function filterAndSearchRecipesWithArrayMethods(recipes, searchQuery, selectedTags) {
    let filteredRecipes = filterRecipesByTags(recipes, selectedTags);
    filteredRecipes = filterRecipesBySearchQueryWithArrayMethods(filteredRecipes, searchQuery);
    return filteredRecipes;
}

function filterRecipesBySearchQueryWithArrayMethods(recipes, searchQuery) {
    if (searchQuery.length < 3) return recipes;

    // Implémentation de recherche avec méthodes d'array
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

    // Mettre à jour les dropdowns personnalisés avec les nouvelles options
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
    dropdownMenu.innerHTML = '';  // Vider le contenu actuel

    // Créer un fragment pour les options
    const fragment = document.createDocumentFragment();

    // Créer et ajouter le conteneur de recherche
    const searchContainer = createSearchContainer(dropdownMenu, dropdownId);
    fragment.appendChild(searchContainer);

    // Ajouter les options
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
    clearButton.innerHTML = '&times;';
    clearButton.classList.add('dropdown-remove-input', 'absolute', 'right-8', 'text-custom-gray', 'hover:text-black', 'focus:outline-none', 'cursor-pointer', 'hidden');
    
    const searchIcon = createSearchIcon();

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearButton);
    searchContainer.appendChild(searchIcon);

    addSearchContainerEventListeners(dropdownMenu, searchInput, clearButton);

    return searchContainer;
}

function createSearchIcon() {
    const searchIcon = document.createElement('span');
    searchIcon.innerHTML = `
        <svg class="dropdown-search-icon text-custom-gray" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10.4219" r="9.5" stroke="#7A7A7A" stroke-width="2"/>
            <line x1="18.3536" y1="19.0683" x2="27.3536" y2="28.0683" stroke="#7A7A7A" stroke-width="2"/>
        </svg>
    `;
    searchIcon.classList.add('absolute', 'right-2', 'text-gray-400');
    return searchIcon;
}

function addSearchContainerEventListeners(dropdownMenu, searchInput, clearButton) {
    function filterOptions() {
        const filterValue = searchInput.value.toLowerCase().trim();
        dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(filterValue) ? '' : 'none';
        });

        clearButton.classList.toggle('hidden', filterValue.trim() === '');
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
