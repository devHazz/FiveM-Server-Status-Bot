const axios = require('axios').default;
function checkIfExists(hostname, port) {
if(hostname && port)
{
    console.log(`${hostname}:${port}/info.json`);
    const checkIf = axios.get(`http://${hostname}:${port}/info.json`)
    .then(res => {
        if(res.status == 200 && res.data.server) {
            return true;
        }
        return false;
    });
    return checkIf;
}

}
module.exports = checkIfExists