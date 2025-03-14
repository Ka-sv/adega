const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://kaiqueguerra013:Silvalvs10@cluster0.nmeo2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// mongodb+srv://kaiqueguerra013:Silvalvs10@cluster0.nmeo2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://kaiqueguerra013:Silvalvs10@cluster0.nmeo2.mongodb.net/KaiqueSilva?retryWrites=true&w=majority&appName=Cluster0
// "C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe" "mongodb+srv://kaiqueguerra013:Silvalvs10@cluster0.nmeo2.mongodb.net/KaiqueSilva?retryWrites=true&w=majority&appName=Cluster0"
// & "C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe" "mongodb+srv://kaiqueguerra013:Silvalvs10@cluster0.nmeo2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function testarConexao() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🔥 Conectado ao MongoDB com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao MongoDB:", error);
    } finally {
        mongoose.disconnect();
    }
}

testarConexao();
