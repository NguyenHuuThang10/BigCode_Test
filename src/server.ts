// src/server.ts
import connectMongo from './context/mongo.context';
import app from './start-up/main';

const PORT = process.env.PORT || 3000;
connectMongo();
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
