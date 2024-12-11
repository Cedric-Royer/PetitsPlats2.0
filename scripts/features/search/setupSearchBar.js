/**
 * Configure une barre de recherche en ajoutant un gestionnaire d'événements pour l'entrée utilisateur.
 *
 * @param {HTMLFormElement} searchForm - Le formulaire englobant 
 * @param {HTMLInputElement} searchInput - L'élément input de la barre de recherche.
 * @param {HTMLElement} clearButton - L'élément HTML de la croix pour effacer le texte.
 * @param {function} onSearch - La fonction à appeler avec la requête de recherche.
 */
export function setupSearchBar(searchForm, searchInput, clearButton, onSearch) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    
    function toggleClearButton() {
        clearButton.classList.toggle('hidden', searchInput.value.trim() === '');
    }

    searchInput.addEventListener('input', () => {
        toggleClearButton();
        onSearch(searchInput.value.trim());
    });

    clearButton.addEventListener('click', (e) => {
        e.preventDefault;
        searchInput.value = '';
        toggleClearButton();
        onSearch('');
    });

    toggleClearButton();
}


