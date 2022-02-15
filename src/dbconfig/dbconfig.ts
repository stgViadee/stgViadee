import createConnectionPool, {sql} from '@databases/pg';

export {sql};

const db = createConnectionPool('postgres://postgres:password@localhost:5432/postgres');

export default db;