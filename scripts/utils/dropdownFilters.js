export function loadDataInDropdowns(ingredientOptions, applianceOptions, ustensilOptions, selectedTags) {
    const ingredientDropdown = document.querySelector('#ingredient-dropdown .dropdown-menu');
    const applianceDropdown = document.querySelector('#appliance-dropdown .dropdown-menu');
    const ustensilDropdown = document.querySelector('#ustensil-dropdown .dropdown-menu');

    populateDropdownMenu(ingredientDropdown, ingredientOptions, selectedTags.ingredient);
    populateDropdownMenu(applianceDropdown, applianceOptions, selectedTags.appliance);
    populateDropdownMenu(ustensilDropdown, ustensilOptions, selectedTags.ustensil);
}

function populateDropdownMenu(dropdownMenu, options, selectedTags) {
    const selectedValues = new Set(selectedTags);
    dropdownMenu.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const searchContainer = createSearchContainer(dropdownMenu);
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

function createSearchContainer(dropdownMenu) {
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('dropdown-filter-container', 'relative', 'mb-2', 'flex', 'items-center', 'border', 'rounded', 'border-gray-300', 'bg-white', 'p-1');
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('dropdown-filter-input', 'w-full', 'px-2', 'py-1', 'text-sm', 'outline-none');
    searchInput.maxLength = 20;

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
        const filterValue = searchInput.value.toLowerCase();
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
