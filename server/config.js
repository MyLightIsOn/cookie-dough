const apiIdHeader = process.env.API_ID_HEADER || 'API_ID_HEADER';
const apiId = process.env.API_ID || '123456789';
const apiKeyHeader = process.env.API_KEY_HEADER || 'API_KEY_HEADER';
const apiKey = process.env.API_KEY || '987654321';
const headers = {};
headers[apiIdHeader] = apiId;
headers[apiKeyHeader] = apiKey;

module.exports = {
    baseURL : process.env.BASEURL || 'http://localhost:3000',
    headers: headers
};