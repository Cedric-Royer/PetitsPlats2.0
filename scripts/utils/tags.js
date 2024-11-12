export function updateTags(selectedTags, tagsContainer, applyFiltersAndSearch) {
    tagsContainer.textContent = '';

    Object.keys(selectedTags).forEach(type => {
        selectedTags[type].forEach(value => {
            createTag(value, type, tagsContainer, selectedTags, applyFiltersAndSearch);
        });
    });
}

function createTag(value, type, tagsContainer, selectedTags, applyFiltersAndSearch) {
    const tag = document.createElement('span');
    tag.classList.add('tag-label', 'flex', 'items-center', 'rounded-lg', 'p-3', 'text-sm', 'mr-2', 'mb-2',);

    const tagText = document.createElement('span');
    tagText.textContent = value.charAt(0).toUpperCase() + value.slice(1);
    tagText.classList.add('mr-2');

    const removeIcon = document.createElement('span');
    removeIcon.textContent = '\u00D7';
    removeIcon.classList.add('ml-2', 'cursor-pointer', 'remove-tag');
    
    removeIcon.addEventListener('click', () => {
        removeTag(type, value, selectedTags, tagsContainer, applyFiltersAndSearch);
    });

    tag.appendChild(tagText);
    tag.appendChild(removeIcon);
    tag.dataset.type = type;
    tag.dataset.value = value;

    tagsContainer.appendChild(tag);
}

function removeTag(type, value, selectedTags, tagsContainer, applyFiltersAndSearch) {
    selectedTags[type] = selectedTags[type].filter(tag => tag !== value);       
    updateTags(selectedTags, tagsContainer, applyFiltersAndSearch);
    applyFiltersAndSearch();
}
