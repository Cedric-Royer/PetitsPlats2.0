import { replaceSpecialChars } from '../utils/textUtils.js';

/**
 * Crée un conteneur de recherche pour le menu déroulant.
 * @param {HTMLElement} dropdownMenu - Le menu dropdown associé.
 * @param {string} dropdownId - L'identifiant du dropdown.
 * @returns {HTMLElement} Le conteneur de recherche.
 */
export function createSearchContainer(dropdownMenu, dropdownId) {
    const searchContainer = document.createElement('div');
    searchContainer.classList.add(
        'dropdown-filter-container',
        'relative',
        'mb-2',
        'flex',
        'items-center',
        'border',
        'rounded',
        'border-gray-300',
        'bg-white',
        'p-1'
    );
    
    // Création de l'input pour la recherche
    const searchInput = document.createElement('input');
    searchInput.id = `search-${dropdownId}`;
    searchInput.type = 'text';
    searchInput.setAttribute('minlength', '3');
    searchInput.setAttribute('maxlength', '40');
    searchInput.setAttribute('pattern', "[A-Za-zÀ-ÿ\\s'\\-]+");
    searchInput.setAttribute('title', 'Lettres, espaces, apostrophes et tirets autorisés');
    searchInput.classList.add('dropdown-filter-input', 'w-full', 'px-2', 'py-1', 'text-sm', 'outline-none');
    
    // Bouton pour effacer la recherche
    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.textContent = '\u00D7';
    clearButton.classList.add(
        'dropdown-remove-input',
        'absolute',
        'right-8',
        'text-custom-gray',
        'hover:text-black',
        'focus:outline-none',
        'cursor-pointer',
        'hidden'
    );
    
    // Icône de recherche
    const searchIcon = createSearchIcon();

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearButton);
    searchContainer.appendChild(searchIcon);

    // Ajout des écouteurs d'événements
    addSearchContainerEventListeners(dropdownMenu, searchInput, clearButton);

    return searchContainer;
}

/**
 * Crée une icône de recherche.
 * @returns {HTMLElement} L'élément de l'icône de recherche.
 */
function createSearchIcon() {
    const searchIcon = document.createElement('img');
    searchIcon.src = './assets/icons/search-icon.svg';
    searchIcon.alt = 'icône de recherche';
    searchIcon.classList.add('dropdown-search-icon', 'absolute', 'right-2', 'text-gray-400');
    return searchIcon;
}

/**
 * Ajoute les gestionnaires d'événements au conteneur de recherche.
 * @param {HTMLElement} dropdownMenu - Le menu dropdown associé.
 * @param {HTMLInputElement} searchInput - Le champ de recherche.
 * @param {HTMLButtonElement} clearButton - Le bouton pour effacer l'entrée.
 */
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

    clearButton.addEventListener('click', event => {
        event.stopPropagation();
        searchInput.value = '';
        filterOptions();
    });

    searchInput.addEventListener('input', filterOptions);
}
