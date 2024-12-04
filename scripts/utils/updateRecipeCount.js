/**
 * Met à jour le texte de l'élément affichant le nombre de recettes.
 *
 * @param {number} count - Le nombre de recettes à afficher. 
 *                         Ce nombre est formaté pour avoir deux chiffres et suivi de "recette" ou "recettes".
 */
export function updateRecipeCount(count) {
    const recipeCountElement = document.querySelector('.recipe-count');
    recipeCountElement.textContent = `${count.toString().padStart(2, '0')} recette${count > 1 ? 's' : ''}`;
}
