
class ImagePlugin {

	constructor(context) {
		this.context = context;
		this.popup = this.createPopup();
		this.setup(context);
	}

	createPopup(baseValue) {
		const popups = this.context.popups;
		const imgPopup = new popups.GenericPopup({ title: "Select your image"});
		imgPopup.addItem(new popups.InputItem({ name: "alt", label: "Image description" }));
		const imgItem = new popups.ImageItem({ name: "img", label: "Your image", value: baseValue });
		imgPopup.addItem(imgItem);

		return (baseValue) => {
				imgItem.setValue(baseValue);
				return popups.showPopup(imgPopup)
		}
	}

	setup(context) {
		const imageElements = document.querySelectorAll('[data-simplecms-img]');
		for (let el of imageElements) {
			el.classList.add('simplecms__image');
			el.addEventListener('click', e => {
				if (!context.isEditing()) return;
				e.preventDefault();
				e.stopPropagation();
				const name = e.target.dataset['simplecmsImg'];
				const el = e.target;

				this.popup(el.src).then(data => {
						if (data == null) return;
						console.log(data);
						// TODO: do something with ALT tag
						context.uploadSnippetImage(name, data.content.img)
								.then(url => el.src = url);
				})
			});
		}
	}

	enable() {
	}

	disable() {
	}
}

__KONTRL_ADMIN_PLUGINS.push(ImagePlugin);
