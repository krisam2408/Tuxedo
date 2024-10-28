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