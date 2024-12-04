import { createElement } from '../utils/domUtils.js';
import { capitalize } from '../utils/textUtils.js'; // Assure-toi que la fonction capitalize est bien importée

/**
 * Crée un élément HTML représentant un tag.
 * @param {string} value - Le texte du tag.
 * @param {string} type - Le type du tag (ingrédient, appareil, ustensile).
 * @param {Function} onRemove - Fonction à appeler lorsqu'un tag est supprimé.
 * @returns {HTMLElement} - L'élément HTML du tag.
 */
function createTag(value, type, onRemove) {
    const tag = createElement('span', { classes: ['tag-label', 'flex', 'items-center', 'rounded-lg', 'p-3', 'text-sm', 'mr-2', 'mb-2'] });

    const tagText = createElement('span', { textContent: capitalize(value), classes: ['mr-2'] });

    const removeIcon = createElement('span', {
        textContent: '×',
        classes: ['ml-2', 'cursor-pointer', 'remove-tag'],
    });

    removeIcon.addEventListener('click', () => onRemove(type, value));

    tag.appendChild(tagText);
    tag.appendChild(removeIcon);

    return tag;
}

/**
 * Met à jour l'affichage des tags en fonction des tags sélectionnés.
 * @param {Object} selectedTags - Les tags actuellement sélectionnés (par type).
 * @param {HTMLElement} tagsContainer - Conteneur où les tags doivent être affichés.
 * @param {Function} onTagRemove - Fonction à appeler lorsqu'un tag est supprimé.
 */
export function updateTags(selectedTags, tagsContainer, onTagRemove) {
    tagsContainer.textContent = ''; 

    Object.keys(selectedTags).forEach(type => {
        selectedTags[type].forEach(value => {
            const tagElement = createTag(value, type, onTagRemove);
            tagsContainer.appendChild(tagElement);
        });
    });
}
