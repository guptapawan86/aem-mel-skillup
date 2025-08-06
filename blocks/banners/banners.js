function createScreenItem(row) {
  const screenItem = document.createElement('div');
  screenItem.className = 'screen-item';

  const cols = [...row.children];
  if (cols.length < 2) return null;

  const key = cols[0].textContent.trim().toLowerCase();
  const content = cols[1];

  if (key === 'title') {
    const title = document.createElement('h2');
    title.className = 'screen-title';
    title.textContent = content.textContent.trim();
    screenItem.appendChild(title);
  } else if (key === 'description') {
    const description = document.createElement('div');
    description.className = 'screen-description';
    description.innerHTML = content.innerHTML;
    screenItem.appendChild(description);
  } else if (key === 'image') {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'screen-image';

    const img = content.querySelector('img');
    if (img) {
      img.className = 'screen-profile-image';
      imageWrapper.appendChild(img);
    }
    screenItem.appendChild(imageWrapper);
  }

  return screenItem;
}

export default function decorate(block) {
  const screenContainer = document.createElement('div');
  screenContainer.className = 'screen-container';

  [...block.children].forEach((row) => {
    const screenItem = createScreenItem(row);
    if (screenItem) {
      screenContainer.appendChild(screenItem);
    }
  });

  block.textContent = '';
  block.append(screenContainer);
}
