/**
 * Crée un élément HTML avec des classes, des attributs et du contenu texte optionnels.
 *
 * @param {string} type - Le type d'élément HTML à créer (par ex. 'div', 'span').
 * @param {Object} [options] - Options pour configurer l'élément.
 * @param {string[]} [options.classes=[]] - Une liste de classes à ajouter à l'élément.
 * @param {Object} [options.attributes={}] - Un objet contenant les attributs à ajouter à l'élément (clé-valeur).
 * @param {string} [options.textContent=''] - Le contenu texte à insérer dans l'élément.
 * @returns {HTMLElement} - L'élément HTML créé.
 */
export function createElement(type, { classes = [], attributes = {}, textContent = '' } = {}) {
    const element = document.createElement(type);
    element.classList.add(...classes);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    element.textContent = textContent;
    return element;
}

/**
 * Vide le contenu d'un conteneur HTML.
 *
 * @param {HTMLElement} container - L'élément HTML à vider.
 */
export function clearContainer(container) {
    container.textContent = '';
}

