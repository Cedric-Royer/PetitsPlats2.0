/**
 * Gère la sélection d'un élément dans une liste déroulante.
 *
 * @param {Event} event - L'événement déclenché par le clic sur un élément de la liste déroulante.
 * @param {Object} selectedTags - Les tags sélectionnés, classés par type (ingredient, appliance, ustensil).
 * @param {string} filterType - Le type de filtre correspondant à la liste déroulante (par exemple, 'ingredient').
 * @param {Function} updateUI - Fonction callback pour mettre à jour l'interface utilisateur après la sélection.
 */
export function handleDropdownSelection(event, selectedTags, filterType, updateUI) {
    const item = event.target;
    const value = item.dataset.value;

    if (!selectedTags[filterType].includes(value)) {
        selectedTags[filterType].push(value);
        updateUI(); 
    }
}
