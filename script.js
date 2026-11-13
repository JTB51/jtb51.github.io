const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const projectSection = document.querySelector('#projects');
const projectGrid = document.querySelector('#project-grid');
const projectNavLink = document.querySelector('.projects-nav-link');

if (Array.isArray(portfolioProjects) && portfolioProjects.length > 0) {
  portfolioProjects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';

    const image = document.createElement('img');
    image.className = 'project-image';
    image.src = project.image;
    image.alt = project.imageAlt;
    image.loading = 'lazy';

    const content = document.createElement('div');
    content.className = 'project-content';

    const title = document.createElement('h3');
    title.textContent = project.title;

    const description = document.createElement('p');
    description.textContent = project.description;

    const tags = document.createElement('ul');
    tags.className = 'tags';
    tags.setAttribute('aria-label', 'Skills used');
    (project.skills || []).forEach((skill) => {
      const tag = document.createElement('li');
      tag.textContent = skill;
      tags.append(tag);
    });

    content.append(title, description, tags);

    if (project.link) {
      const link = document.createElement('a');
      link.className = 'project-link';
      link.href = project.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'View project →';
      content.append(link);
    }

    card.append(image, content);
    projectGrid.append(card);
  });

  projectSection.hidden = false;
  projectNavLink.hidden = false;
}
