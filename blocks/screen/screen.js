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

function createButton(text, url, type = 'primary') {
  const button = document.createElement('a');
  button.href = url;
  button.textContent = text;
  button.className = `screen-cta screen-cta-${type}`;
  return button;
}

function buildHeroScreen(block, config) {
  const heroContainer = document.createElement('div');
  heroContainer.className = 'screen-hero-container';

  // Background image
  if (config.backgroundImage) {
    heroContainer.style.backgroundImage = `url(${config.backgroundImage})`;
  }

  // Overlay
  if (config.overlay) {
    const overlay = document.createElement('div');
    overlay.className = 'screen-overlay';
    heroContainer.appendChild(overlay);
  }

  // Content wrapper
  const content = document.createElement('div');
  content.className = 'screen-content';

  // Title
  if (config.title) {
    const title = document.createElement('h1');
    title.className = 'screen-title';
    title.textContent = config.title;
    content.appendChild(title);
  }

  // Subtitle
  if (config.subtitle) {
    const subtitle = document.createElement('p');
    subtitle.className = 'screen-subtitle';
    subtitle.textContent = config.subtitle;
    content.appendChild(subtitle);
  }

  // CTA buttons
  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'screen-cta-container';

  if (config.ctaText && config.ctaUrl) {
    const primaryCta = createButton(config.ctaText, config.ctaUrl, 'primary');
    ctaContainer.appendChild(primaryCta);
  }

  if (config.secondaryCtaText && config.secondaryCtaUrl) {
    const secondaryCta = createButton(config.secondaryCtaText, config.secondaryCtaUrl, 'secondary');
    ctaContainer.appendChild(secondaryCta);
  }

  if (ctaContainer.children.length > 0) {
    content.appendChild(ctaContainer);
  }

  heroContainer.appendChild(content);
  block.appendChild(heroContainer);

  // Set height
  if (config.height) {
    block.style.height = config.height;
  }

  // Set text color
  if (config.textColor) {
    block.style.color = config.textColor;
  }
}

function buildFeatureScreen(block, config) {
  const featureContainer = document.createElement('div');
  featureContainer.className = 'screen-feature-container';

  // Set background color
  if (config.backgroundColor) {
    featureContainer.style.backgroundColor = config.backgroundColor;
  }

  // Set text color
  if (config.textColor) {
    featureContainer.style.color = config.textColor;
  }

  // Content wrapper
  const content = document.createElement('div');
  content.className = 'screen-feature-content';

  // Layout handling
  if (config.layout === 'split') {
    content.classList.add('screen-split-layout');
  }

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
    const description = document.createElement('p');
    description.className = 'screen-feature-description';
    description.textContent = config.description;
    textContent.appendChild(description);
  }

  content.appendChild(textContent);

  // Image content
  if (config.image) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'screen-image-content';

    const image = document.createElement('img');
    image.src = config.image;
    image.alt = config.imageAlt || '';
    image.className = 'screen-feature-image';

    imageContainer.appendChild(image);
    content.appendChild(imageContainer);
  }

  featureContainer.appendChild(content);
  block.appendChild(featureContainer);
}

function buildDefaultScreen(block, config) {
  // Default screen implementation
  const container = document.createElement('div');
  container.className = 'screen-default-container';

  if (config.title) {
    const title = document.createElement('h2');
    title.textContent = config.title;
    container.appendChild(title);
  }

  block.appendChild(container);
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
  const variant = config.variant || 'hero';

  // Clear the block content
  block.innerHTML = '';

  // Add variant class
  block.classList.add(`screen-${variant}`);

  // Build component based on variant
  switch (variant) {
    case 'hero':
      buildHeroScreen(block, config);
      break;
    case 'feature':
      buildFeatureScreen(block, config);
      break;
    default:
      buildDefaultScreen(block, config);
  }

  // Add intersection observer for animations
  addScrollAnimations(block);
}
