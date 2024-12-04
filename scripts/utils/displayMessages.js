/**
 * Affiche un message indiquant qu'aucun résultat n'a été trouvé.
 * @param {HTMLElement} container - Le conteneur où afficher le message.
 * @param {string} searchQuery - La requête de recherche.
 * @param {boolean} hasTags - Indique si des tags sont sélectionnés.
 */
export function displayNoResultsMessage(container, searchQuery, hasTags) {
    const noResultMessage = document.createElement('p');

    if (hasTags) {
        noResultMessage.textContent = `Aucune recette ne correspond aux tags sélectionnés et à la recherche « ${searchQuery} ». Essayez d'ajuster vos filtres ou votre recherche.`;
    } else {
        noResultMessage.textContent = `Aucune recette ne contient « ${searchQuery} ». Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    }

    noResultMessage.classList.add('text-center', 'text-gray-500', 'w-full', 'col-span-3');
    container.appendChild(noResultMessage);
}
