const mongoose = require('mongoose');

mongoose.set('strictQuery', true)

const connection = async()=>{
    mongoose.connect('mongodb+srv://starkboy02:Allpasswordsame@cluster0.uheiwhy.mongodb.net/coding-ninjas?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
}

module.exports = connection;