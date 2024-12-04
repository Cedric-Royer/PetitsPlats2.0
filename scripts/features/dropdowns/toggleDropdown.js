/**
 * Basculer l'état d'ouverture/fermeture d'un menu déroulant (dropdown) et gérer ses styles associés.
 *
 * @param {HTMLElement} dropdown - L'élément HTML du menu déroulant à basculer.
 */
export function toggleDropdown(dropdown) {
    dropdown.classList.toggle('open');
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const chevronDown = dropdownToggle.querySelector('.fa-chevron-down');
    const chevronUp = dropdownToggle.querySelector('.fa-chevron-up');

    if (dropdown.classList.contains('open')) {
        dropdownToggle.classList.remove('rounded-lg', 'mb-4');
        dropdownToggle.classList.add('rounded-t-lg');
        chevronDown.classList.add('hidden');
        chevronUp.classList.remove('hidden');

        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.scrollTop = 0;
        }
    } else {
        dropdownToggle.classList.remove('rounded-t-lg');
        dropdownToggle.classList.add('rounded-lg', 'mb-4');
        chevronDown.classList.remove('hidden');
        chevronUp.classList.add('hidden');
    }
}

/**
 * Ferme tous les menus déroulants (dropdowns) sur la page et réinitialise leurs styles.
 */
export function closeAllDropdowns() {
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
        dropdown.classList.remove('open');
    });
    document.querySelectorAll('.dropdown-toggle').forEach((dropdownToggle) => {
        dropdownToggle.classList.add('mb-4', 'rounded-lg');
    });
}
