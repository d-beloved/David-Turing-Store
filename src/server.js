import app from './app';

const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);

const server = app.listen(port, () => {
});

export default server;
