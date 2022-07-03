import dotenv from 'dotenv';

dotenv.config();
const { ADMIN_KEY, WRITER_KEY } = process.env;

export const isAdmin = (key) => key == ADMIN_KEY;

export const isWriter = (key) => key == WRITER_KEY;