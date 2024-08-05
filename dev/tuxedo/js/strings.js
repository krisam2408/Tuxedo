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