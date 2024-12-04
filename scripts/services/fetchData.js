/**
 * Récupère les recettes depuis une URL et renvoie les données des recettes.
 * En cas d'erreur, retourne un tableau vide.
 *
 * @param {string} url - L'URL à partir de laquelle les recettes sont récupérées.
 * @returns {Promise<Array>} Une promesse résolue avec un tableau des recettes extraites de la réponse JSON.
 *                           Si une erreur se produit, renvoie un tableau vide.
 */
export async function fetchRecipes(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('Erreur de fetch:', error);
        return [];
    }
}
