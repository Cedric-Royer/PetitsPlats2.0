/**
 * Configure une barre de recherche en ajoutant un gestionnaire d'événements pour l'entrée utilisateur.
 *
 * @param {HTMLInputElement} searchInput - L'élément input de la barre de recherche.
 * @param {function} onSearch - La fonction à appeler avec la requête de recherche.
 */
export function setupSearchBar(searchInput, onSearch) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        onSearch(query);
    });
}

