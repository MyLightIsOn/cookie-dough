const apiIdHeader = process.env.API_ID_HEADER || 'My-App-Id';
const apiId = process.env.API_ID || '123456';
const apiKeyHeader = process.env.API_KEY_HEADER || 'My-App-Key';
const apiKey = process.env.API_KEY || '12345';
const headers = {};
const updateHeaders = {};

headers[apiIdHeader] = apiId;
headers[apiKeyHeader] = apiKey;
updateHeaders[apiIdHeader] = apiId;

module.exports = {
    baseURL : process.env.BASEURL || 'http://localhost:3000',
    headers: headers,
    updatedHeaders: updateHeaders,
    appId : apiId
};