const sendData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: data
    });

    return await result.json();
};

const getData = async (url) => {
    const result = await fetch(url);

    return await result.json();
};

export {sendData, getData};