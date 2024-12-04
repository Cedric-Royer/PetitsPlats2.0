/**
 * Remplace les caractères spéciaux dans une chaîne de caractères par leurs entités HTML correspondantes.
 *
 * @param {string} str - La chaîne de caractères à traiter.
 * @returns {string} La chaîne avec les caractères spéciaux remplacés par leurs entités HTML.
 */
export function replaceSpecialChars(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/=/g, '');
}

/**
 * Met en majuscule la première lettre d'une chaîne de caractères et laisse les autres lettres inchangées.
 *
 * @param {string} text - La chaîne de caractères à capitaliser.
 * @returns {string} La chaîne avec la première lettre en majuscule.
 */
export function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
