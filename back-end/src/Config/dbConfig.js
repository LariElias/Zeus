import { connect } from 'mongoose';

const dbConfig = 'mongodb+srv://larissaelias4545:larissa123@cluster0.u761xmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connection = connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão com MongoDB estabelecida.  : - )');
  }).catch(err => console.error('Erro ao conectar ao MongoDB:', err));
  

export default connection;