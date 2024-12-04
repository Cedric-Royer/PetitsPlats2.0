import { toggleDropdown, closeAllDropdowns } from './toggleDropdown.js';
import { handleDropdownSelection } from './handleDropdownSelection.js';

/**
 * Configure les écouteurs d'événements pour gérer les interactions avec les listes déroulantes.
 *
 * @param {Object} selectedTags - Les tags sélectionnés par type (ingredient, appliance, ustensil).
 * @param {Function} updateUI - Fonction pour mettre à jour l'interface utilisateur après une interaction.
 */
export function setupDropdownListeners(selectedTags, updateUI) {
    document.addEventListener('click', (event) => {
        const dropdownToggle = event.target.closest('.dropdown-toggle');
        const dropdown = event.target.closest('.dropdown');
        const filterInput = event.target.closest('.dropdown-filter-input');

        if (dropdownToggle) {
            toggleDropdown(dropdown);
        } else if (event.target.matches('.dropdown-item')) {
            const filterType = dropdown.id.split('-')[0];
            handleDropdownSelection(event, selectedTags, filterType, updateUI);
            closeAllDropdowns();
        } else if (!dropdown || !filterInput) {
            closeAllDropdowns();
        }
    });
}
