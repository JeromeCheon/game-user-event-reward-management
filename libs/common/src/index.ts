import * as convict from 'convict';
import * as path from 'path';
import * as yaml from 'js-yaml';

convict.addParser({ extension: 'yaml', parse: yaml.load });

const config = convict({
  mongodb: {
    username: {
      format: String,
      default: '',
      env: 'MONGODB_USERNAME',
    },
    password: {
      format: String,
      default: '',
      env: 'MONGODB_PASSWORD',
    },
    host: {
      format: String,
      default: 'localhost',
      env: 'MONGODB_HOST',
    },
    port: {
      format: 'port',
      default: 27017,
      env: 'MONGODB_PORT',
    },
    db: {
      format: String,
      default: 'maple-story-user-event-reward-management',
      env: 'MONGODB_DB',
    },
  },
  jwt: {
    secret: {
      format: String,
      default: 'secretKey',
      env: 'JWT_SECRET',
    },
    expiresIn: {
      format: Number,
      default: 3600,
      env: 'JWT_EXPIRES_IN',
    },
  },
});

config.loadFile(path.join(process.cwd(), 'libs/common/src/config/config.yaml'));

config.validate({ allowed: 'strict' });

export default config;
