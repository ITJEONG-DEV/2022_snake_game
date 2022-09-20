const server = "http://localhost:3308";

export async function addRank(name, score) {
    const url = server+'/snakegame/addrank?name='+name+'&score='+score;
    const config = {
        method: 'GET'
    };

    return fetch(url, config)
    .then((res) => {
        return res.json();
    });
}

export async function getRank(name, score) {
    const url = server+'/snakegame/getrank?name='+name+'&score='+score;
    const config = {
        method: 'GET'
    };

    return fetch(url, config)
    .then((res) => {
        return res.json();
    });
}