const container = document.querySelector('.container');
const items = document.querySelectorAll('.elements__item');
items.forEach((item) => {
	const button = item.querySelector('.elements__item-button');
	const icon = item.querySelector('.elements__item-icon>img');

	button.onclick = (e) => {
		item.classList.add('hidden');
		const dragElem = new makeDraggable(icon, container, 0, 0);
		dragElem.deleter.addEventListener('click', () => {
			item.classList.remove('hidden');
		})
	}
})
