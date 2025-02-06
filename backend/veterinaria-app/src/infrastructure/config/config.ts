import dotenv from 'dotenv';
dotenv.config();

export const config = {
    server: {
        port: process.env.PORT as unknown as number || 3000,
        host : process.env.HOST || "0.0.0.0"
    },
    database: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
        databaseName: process.env.DATABASE_NAME || 'mydatabase',
    }, 
    jwt: {
        secret: process.env.JWT_SECRET || 'fallback_secret',
        tokenExpired : process.env.JWT_EXPIRED || '1h'
    },
    email: {
        user: process.env.EMAIL_USER || 'example@example.com',
        pass: process.env.EMAIL_PASS || 'password',
    },
};