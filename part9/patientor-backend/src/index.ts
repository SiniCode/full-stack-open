import express from 'express';
import diagnosisRouter from './routes/diagnoses';
const app = express();
import cors from 'cors';
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
	console.log('Pinged!');
	res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
