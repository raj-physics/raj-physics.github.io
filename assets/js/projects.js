/*
	Project popups (Research > Details).

	Each project card holds its full text in a <template> next to its <button>;
	clicking clones that template into the shared <dialog id="project-modal">.
	Card face and long text both live in index.html, so adding a project means
	copying an <article class="project-card"> block -- nothing to change here.

	The same machinery drives .sidebar-modal__button (the sidebar's [Talks] link),
	whose <template> sits inside the same <h2>; it has no .project-card__title, so
	the popup heading comes from its data-project-title attribute.

	Esc, focus restoration and the backdrop are native <dialog> behaviour. The
	page behind is deliberately left scrollable: the dialog sits in the top layer
	and the background scrolls under it. Do not add a body scroll lock.
*/

(function () {

	var modal = document.getElementById('project-modal');

	if (!modal) return;

	var body  = document.getElementById('project-modal-body'),
		title = document.getElementById('project-modal-title');

	document.querySelectorAll('.project-card__button, .sidebar-modal__button').forEach(function (button) {
		button.addEventListener('click', function () {

			var template = button.parentNode.querySelector('template');

			if (!template) return;

			var heading = button.querySelector('.project-card__title');

			title.textContent = heading ? heading.textContent : button.getAttribute('data-project-title');
			body.replaceChildren(template.content.cloneNode(true));
			body.scrollTop = 0;
			modal.showModal();

		});
	});

	// Close on the button, or on a backdrop click (which targets the dialog itself).
	document.getElementById('project-modal-close').addEventListener('click', function () {
		modal.close();
	});

	modal.addEventListener('click', function (event) {
		if (event.target === modal)
			modal.close();
	});

	// Emptying the body on close stops any animated GIF and drops its images.
	modal.addEventListener('close', function () {
		body.replaceChildren();
	});

})();
