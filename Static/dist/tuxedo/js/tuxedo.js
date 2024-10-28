const tuxApp = function () {

    const onReady = new Event('onReady');

    return {
        onReady: (func) => {
            this.addEventListener('onReady', func);
        },
        ready: () => {
            window.onload = () => {
                this.dispatchEvent(onReady);
            };
        },
        triggerEvent: (e, ev) => {
            const v = new Event(ev);
            e.dispatchEvent(v);
        },
        disableContextMenu: () => {
            const elems = document.querySelectorAll('.no-contextmenu');
            const len = elems.length;
            for (let i = 0; i < len; i++)
                elems[i].addEventListener('contextmenu', (ev) => {
                    ev.preventDefault();
                });
        }
    };
}();


const tuxFiles = function () {

	const types = [
		{ key: 'jpeg', prefix: 'data:image/jpeg;base64,', mime: 'image/jpeg' },
		{ key: 'jpg', prefix: 'data:image/jpeg;base64,', mime: 'image/jpeg' },
		{ key: 'png', prefix: 'data:image/png;base64,', mime: 'image/png' },
		{ key: 'mp3', prefix: 'data:audio/mpeg;base64,', mime: 'audio/mpeg' }
	];

	const get = (file, includePrefix = false) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				let result;
				if (includePrefix)
					result = reader.result.toString();
				else {
					let process = reader.result.toString();
					let index = process.indexOf('base64,');
					process = process.substring(index + 7);
					result = process;
				}

				resolve(result);
			};
			reader.onerror = (error) => reject(error);
		});
	}

	const format = (ext, base64) => {
		let value;
		types.forEach((e) => {
			if (e.key == ext)
				value = e.prefix;
		});

		if (value === undefined) {
			console.error(`Specified extension ${ext} not supported.`);
			return;
		}

		return `${value}${base64}`;
	}

	return {
		getBase64: async (file, includePrefix = false) => { return await get(file, includePrefix); },
		formatBase64: (ext, base64) => { return format(ext, base64); },
		prefixJPG: () => { return types[0].prefix; },
		prefixPNG: () => { return types[2].prefix; },
		prefixMP3: () => { return types[3].prefix; },
		mimeJPG: () => { return types[0].mime; },
		mimePNG: () => { return types[2].mime; },
		mimeMP3: () => { return types[3].mime; },
		absolutePath: () => {
            const host = location.href.replace(location.pathname, '').split('?')[0];
			return host;
		}
	}

}();


const tuxHttp = function () {

    return {
        get: async (url) => {
            const response = await fetch(url);
            const promiseResult = response.text();
            return promiseResult;
        },
        post: async (url, data) => {
            const response = await fetch(url,
                {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                });
            const promiseResult = await response.text();
            return promiseResult;
        },
        put: async (url, data) => {
            const response = await fetch(url,
                {
                    method: 'put',
                    body: JSON.stringify(data),
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                });
            const promiseResult = await response.text();
            return promiseResult;
        },
        delete: async (url) => {
            const response = await fetch(url,
                {
                    method: 'delete'
                });
            const promiseResult = await response.text();
            return promiseResult;
        },
        refresh: () => { location.reload(); },
        redirect: (url) => { location.href = url; }
    };
}();


const tuxLists = function () {

    const add = (array, item) => {
        if (item == undefined || item == null)
            return;

        if (!contains(array, item))
            array.push(item);
    }

    const contains = (array, item) => {
        if (array.indexOf(item) > -1)
            return true;
        return false;
    }

    const where = (array, predicate) => {

        const result = [];

        array.forEach((e) => {
            if (predicate(e))
                add(result, e);
        });
        return result;
    }

    return {
        contains: (array, item) => {
            return contains(array, item);
        },
        where: (array, predicate) => {
            return where(array, predicate);
        },
        add: (array, item) => {
            add(array, item);
        },
        remove: (array, item) => {
            const index = array.indexOf(item);
            if (index === -1)
                return;
            array.splice(index, 1);
        },
        removeAt: (array, index) => {
            return array.splice(index, 1)[0];
        }
    }
}();


const tuxMath = function () {

    const clamp = (v, n, x) => {
        if (v < n)
            return n;
        if (v > x)
            return x;
        return v;
    }

    return {
        clamp: (value, min, max) => { return clamp(value, min, max); },
        clamp01: (value) => { return clamp(value, 0, 1); },
        betweenExc: (value, min, max) => {
            if (value > min && value < max)
                return true;
            return false;
        },
        betweenInc: (value, min, max) => {
            if (value >= min && value <= max)
                return true;
            return false;
        },
        min: (value, min) => {
            if (value < min)
                return min;
            return value;
        },
        max: (value, max) => {
            if (value > max)
                return max;
            return value;
        }
    }
}();


const tuxStrings = function () {

    const contains = (str, search) => {
        if (str.indexOf(search) > -1)
            return true;
        return false;
    }

    const replace = (str, search, replace) => {
        while (contains(str, search)) {
            str = str.replace(search, replace);
        }
        return str;
    }

    return {
        contains: (str, search) => {
            return contains(str, search);
        },
        insert: (str, insert, index) => {
            const result = str.slice(0, index) + insert + str.slice(index);
            return result;
        },
        replace: (str, search, repl) => {
            return replace(str, search, repl);
        }
    }
}();


const tuxStyles = function () {

    const concatenateClasses = (classes) => {
        let result = '';
        classes.forEach((str) => {
            result += `${str} `;
        });
        return result;
    };

    const contains = (e, c) => {
        const classes = e.className.split(' ');
        if (tuxLists.contains(classes, c))
            return true;
        return false;
    }

    const add = (e, c) => {
        if (e == null || e == undefined)
            return;

        const classes = e.className.split(' ');
        if (!tuxLists.contains(classes, c))
            classes.push(c);
        e.className = concatenateClasses(classes);
    }

    const remove = (e, c) => {
        const classes = e.className.split(' ');
        const resultClasses = [];
        classes.forEach((str) => {
            if (str != c)
                resultClasses.push(str);
        });
        e.className = concatenateClasses(resultClasses);
    }

    return {
        contains: (e, c) => { return contains(e, c); },
        add: (e, c) => { add(e, c); },
        remove: (e, c) => { remove(e, c); },
        toggle: (e, c) => {
            if (contains(e, c)) {
                remove(e, v);
                return;
            }
            add(e, c);
        },
        pixelToNumber: (m) => {
            let num = measure.replace('px', '');
            let result = parseInt(num);
            return result;
        }
    };
}();


