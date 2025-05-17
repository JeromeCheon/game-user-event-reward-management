import config from '..';

const { username, password, host, port, db } = config.get('mongodb');
export const ConnectionUrl = `mongodb://${username}:${password}@${host}:${port}/${db}`;
