import { capitalize } from '../../utils/textUtils.js';
import { createSearchContainer } from '../../components/SearchContainer.js';

/**
 * Remplit un menu déroulant avec un champ de recherche et les options disponibles.
 * @param {HTMLElement} dropdownMenu - Le menu dropdown à remplir.
 * @param {Array} options - Les options à afficher.
 * @param {Array} selectedTags - Les tags sélectionnés dans ce dropdown.
 * @param {string} dropdownId - L'identifiant du dropdown (ingredient, appliance, ustensil).
 */
export function populateDropdownMenu(dropdownMenu, options, selectedTags, dropdownId) {
    const selectedValues = new Set(selectedTags);
    dropdownMenu.textContent = ''; 

    const searchContainer = createSearchContainer(dropdownMenu, dropdownId);
    dropdownMenu.appendChild(searchContainer);

    options.sort().forEach((option) => {
        const item = document.createElement('div');
        item.classList.add('dropdown-item');
        item.dataset.value = option;
        item.textContent = capitalize(option);

        if (selectedValues.has(option)) {
            item.classList.add('selected');
        }

        dropdownMenu.appendChild(item);
    });
}
