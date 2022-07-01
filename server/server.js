import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;
const { DATA_LIMIT } = process.env;

const app = express();
app.use(express.json());

const bodyParserSettings = { limit: DATA_LIMIT, extended: true };
app.use(bodyParser.json(bodyParserSettings));
app.use(bodyParser.urlencoded(bodyParserSettings));

app.use(cors( ));
app.get('/', (request, response) => {
	response.send('SERVER ALL RIGHT');
});

app.listen(PORT, () => {
	console.log(`SERVER RUNNING ON PORT::${PORT}`);
});
