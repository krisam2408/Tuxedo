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