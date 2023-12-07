import {google} from 'googleapis';



const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

const sheets = google.sheets({ version: 'v4', auth });

const range = 'Sheet1!A1:G1';

const response = await sheets.spreadsheets.values.get({
    spreadsheetId: '1JMYKXc8OPW7hRUChgfQ57PN81Xxq37KoCZrHHh2S3DU',
    range,
    });
const rows = response.data.values;
console.log(rows);