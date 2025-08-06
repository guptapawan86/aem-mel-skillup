/**
 * Screen Component for Edge Delivery Services
 * Supports multiple variants: hero, feature, content
 */

function readBlockConfig(block) {
  const config = {};
  const rows = [...block.children];

  rows.forEach((row) => {
    if (row.children.length >= 2) {
      const key = row.children[0].textContent.trim().toLowerCase().replace(/\s+/g, '');
      const value = row.children[1].textContent.trim();

      // Handle boolean values
      if (value === 'true' || value === 'false') {
        config[key] = value === 'true';
      } else {
        config[key] = value;
      }
    }
  });

  return config;
}

function buildRedFeatureScreen(block, config) {
  const featureContainer = document.createElement('div');
  featureContainer.className = 'screen-feature-container';

  // Content wrapper with split layout
  const content = document.createElement('div');
  content.className = 'screen-feature-content';

  // Text content
  const textContent = document.createElement('div');
  textContent.className = 'screen-text-content';

  if (config.title) {
    const title = document.createElement('h2');
    title.className = 'screen-feature-title';
    title.textContent = config.title;
    textContent.appendChild(title);
  }

  if (config.description) {
    const description = document.createElement('div');
    description.className = 'screen-feature-description';
    description.innerHTML = config.description; // Use innerHTML to support <br/> tags
    textContent.appendChild(description);
  }

  content.appendChild(textContent);

  // Image content - always show if available
  const imageUrl = config.profile_image || config.image;
  if (imageUrl) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'screen-image-content';

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = config.image_alt || config.imageAlt || 'Profile photo';
    image.className = 'screen-feature-image';

    imageContainer.appendChild(image);
    content.appendChild(imageContainer);
  }

  featureContainer.appendChild(content);
  block.appendChild(featureContainer);
}

function addScrollAnimations(block) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('screen-animated');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  observer.observe(block);
}

export default function decorate(block) {
  const config = readBlockConfig(block);

  // Clear the block content
  block.innerHTML = '';

  // Add screen classes
  block.classList.add('screen-feature', 'screen-style-red');

  // Build red feature screen
  buildRedFeatureScreen(block, config);

  // Add intersection observer for animations
  addScrollAnimations(block);
}
