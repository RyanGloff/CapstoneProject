var axios = require('axios');

async function get (host, port, path) {
    let result;
    await axios.get('http://' + host + ':' + port + path)
        .then(res => {
            result = res;
        })
        .catch(error => {
            console.log(error);
        });
    return result.data;
}

async function post (host, port, path, data) {
    let result;
    let sendData = JSON.stringify(data);
    await axios.post('http://' + host + ':' + port + path, sendData, {
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(res => {
        result = res;
    })
    .catch(error => {
        console.log('error:', error);
    });
    return result.data;
}

async function del (host, port, path) {
    let result;
    await axios.delete('http://' + host + ':' + port + path)
        .then(res => {
            result = res;
        })
        .catch(error => {});
    return result.data;
}

exports.get = get;
exports.post = post;
exports.del = del;