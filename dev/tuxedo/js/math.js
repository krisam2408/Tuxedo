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