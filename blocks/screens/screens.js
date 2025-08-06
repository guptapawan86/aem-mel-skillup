export default function decorate(block) {
  // Get all rows from the block
  const rows = [...block.children];

  // Create the main container
  const container = document.createElement('div');
  container.className = 'screen-container';

  // Process each row to build the screen content
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase();
      const value = cells[1];

      if (key === 'title') {
        const title = document.createElement('h2');
        title.className = 'screen-title';
        title.textContent = value.textContent.trim();
        container.appendChild(title);
      } else if (key === 'description') {
        const description = document.createElement('div');
        description.className = 'screen-description';
        description.innerHTML = value.innerHTML;
        container.appendChild(description);
      } else if (key === 'image' || key === 'profile_image') {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'screen-image';

        const img = value.querySelector('img');
        if (img) {
          img.className = 'screen-profile-image';
          imageContainer.appendChild(img);
        }
        container.appendChild(imageContainer);
      }
    }
  });

  // Clear the original block content and add the new structure
  block.innerHTML = '';
  block.appendChild(container);

  // Add CSS classes for styling
  block.classList.add('screen-block');
}
