const app = require('./app');
const {connectMongoDB} = require('./servis/index')
const { PORT } = process.env;


const startServer = async () => {
  try {
    await connectMongoDB();
    console.log(
      ` Database connection successful`
    );
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT}`
      );
    });
  } catch(err) {
    console.log(err.message);
    process.exit(1);
  }
};

startServer();