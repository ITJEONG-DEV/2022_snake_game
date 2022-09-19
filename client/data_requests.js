const server = "http://localhost:3308";

export function addRank(name, score) {
    const url = server+'/addrank?name='+name+'&score='+score;
    fetch(url, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        });
}

export function getRank() {
    const url = server+'/getrank';
    fetch(url, {
        method: 'GET'
    })
        .then(response => { 
            return response.json();
        })
        .then(data => {
            console.log(data);
        });
}