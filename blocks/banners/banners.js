function createScreenItem(row) {
  const screenItem = document.createElement('div');
  screenItem.className = 'screen-item';

  const cols = [...row.children];
  if (cols.length < 2) {
    return null;
  }

  const key = cols[0].textContent.trim().toLowerCase();
  const content = cols[1];

  switch (key) {
    case 'title': {
      const title = document.createElement('h2');
      title.className = 'screen-title';
      title.textContent = content.textContent.trim();
      screenItem.appendChild(title);
      break;
    }

    case 'description': {
      const description = document.createElement('div');
      description.className = 'screen-description';
      description.innerHTML = content.innerHTML;
      screenItem.appendChild(description);
      break;
    }

    case 'image': {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'screen-image';

      const img = content.querySelector('img');
      if (img) {
        const clonedImg = img.cloneNode(true);
        clonedImg.classList.add('screen-profile-image');
        imageWrapper.appendChild(clonedImg);
        screenItem.appendChild(imageWrapper);
      }
      break;
    }

    default:
  }

  return screenItem;
}

export default function decorate(block) {
  const screenContainer = document.createElement('div');
  screenContainer.className = 'screen-container';

  const rows = [...block.children];

  rows.forEach((row) => {
    const screenItem = createScreenItem(row);
    if (screenItem) {
      screenContainer.appendChild(screenItem);
    }
  });

  // Clear the original block and insert the new structure
  block.textContent = '';
  block.appendChild(screenContainer);
}
