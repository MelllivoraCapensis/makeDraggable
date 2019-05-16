class makeDraggable {
	constructor (element, container) {
        this.element = element;
        this.container = container;
       
        this.state = {
        	x: null,
        	y: null
        }

        this.init();
	}

	set x (value) {
		let correctValue = Math.max(0, value);
		correctValue = Math.min(correctValue, 
			this.containerWidth - this.element.width);
		this.state.x = correctValue;

		this.render();
	}

	set y (value) {
		let correctValue = Math.max(0, value);
		correctValue = Math.min(correctValue,
			this.containerHeight - this.element.height);
		this.state.y = correctValue;
		this.render();
	}

	get containerWidth () {
		return parseFloat(getComputedStyle(this.container)
		    .width);
	}

	get containerHeight () {
		return parseFloat(getComputedStyle(this.container)
		    .height);
	}

	get refPoint () {
		return this.getCoords(this.container);
	}

	init () {
		this.build();
		this.addHandlers();
	}

	build () {
        const containerBorderWidth = getComputedStyle(
        	this.container).borderWidth;
        if(containerBorderWidth)
        	this.containerBorderWidth = parseFloat(
        		containerBorderWidth);
        else
            this.containerBorderWidth = 0;

		this.wrapper = document.createElement('div');
		this.wrapper.classList
		    .add('make-draggable__wrapper');
		this.container.appendChild(this.wrapper);
		this.wrapper.appendChild(this.element);

		this.container.style.position = 'relative';
		this.wrapper.style.position = 'absolute';

		this.element.width = parseFloat(
        	getComputedStyle(this.wrapper).width);
		this.element.height = parseFloat(
        	getComputedStyle(this.wrapper).height);
       
		this.x = this.getCoords(this.wrapper).left
		    - this.refPoint.left - this.containerBorderWidth;
		this.y = - this.getCoords(this.wrapper).bottom
		    + this.refPoint.bottom - this.containerBorderWidth;
		
	}

	addHandlers () {
		this.wrapper.ondragstart = () => {
			return false;
		}

		this.wrapper.onmousedown = (e) => {
			const startElem = {
				x: this.state.x,
				y: this.state.y
			};
			const startTouch = {
				top: e.clientY,
				left: e.clientX
			};

            this.container.onmousemove = (e) => {
                this.x = startElem.x + (e.clientX - 
                	startTouch.left);
                this.y = startElem.y - (e.clientY - 
                	startTouch.top);

                this.container.onmouseup = (e) => {
                	this.container.onmousemove = null;
                }
            }
		}

		this.container.onmouseleave = () => {
			this.container.onmousemove = null;
		}
	}

    getCoords(elem) { 
        const box = elem.getBoundingClientRect();

		return {
			bottom: box.bottom + pageYOffset,
			left: box.left + pageXOffset
		};

	}

	render () {
		this.wrapper.style.left = this.state.x + 'px';
		this.wrapper.style.bottom = this.state.y + 'px';
		this.element.innerHTML = 'x: ' + Math.round(this.state.x) +
		    '<br>y: ' + Math.round(this.state.y);
	}


}
