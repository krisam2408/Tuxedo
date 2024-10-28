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