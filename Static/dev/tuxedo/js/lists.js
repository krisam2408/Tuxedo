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