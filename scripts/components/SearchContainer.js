import { replaceSpecialChars } from '../utils/textUtils.js';
import { createElement } from '../utils/domUtils.js';

/**
 * Crée un conteneur de recherche pour le menu déroulant.
 * @param {HTMLElement} dropdownMenu - Le menu dropdown associé.
 * @param {string} dropdownId - L'identifiant du dropdown.
 * @returns {HTMLElement} Le conteneur de recherche.
 */
export function createSearchContainer(dropdownMenu, dropdownId) {
    const searchContainer = createElement('div', {
        classes: [
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
        ]
    });
    
    const searchInput = createElement('input', {
        classes: ['dropdown-filter-input', 'w-full', 'px-2', 'py-1', 'text-sm', 'outline-none'],
        attributes: {
            id: `search-${dropdownId}`,
            type: 'text',
            minlength: '3',
            maxlength: '40',
            pattern: "[A-Za-zÀ-ÿ\\s'\\-]+",
            title: 'Lettres, espaces, apostrophes et tirets autorisés'
        }
    });
    
    const clearButton = createElement('button', {
        classes: [
            'dropdown-remove-input',
            'absolute',
            'right-8',
            'text-custom-gray',
            'hover:text-black',
            'focus:outline-none',
            'cursor-pointer',
            'hidden'
        ],
        attributes: { type: 'button' },
        textContent: '\u00D7' 
    });
    
    const searchIcon = createSearchIcon();

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearButton);
    searchContainer.appendChild(searchIcon);

    addSearchContainerEventListeners(dropdownMenu, searchInput, clearButton);

    return searchContainer;
}

/**
 * Crée une icône de recherche.
 * @returns {HTMLElement} L'élément de l'icône de recherche.
 */
function createSearchIcon() {
    return createElement('img', {
        classes: ['dropdown-search-icon', 'absolute', 'right-2', 'text-gray-400'],
        attributes: { src: './assets/icons/search-icon.svg', alt: 'icône de recherche' }
    });
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
