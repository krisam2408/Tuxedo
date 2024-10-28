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
	};

	const format = (ext, base64) => {
		let value;
		types.forEach((e) => {
			if (e.key == ext)
				value = e.prefix;
		});

		if (value === undefined) {
			console.error(`Specified extension ${ext} not supported.`);
			return;
		};

		return `${value}${base64}`;
	};

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