'use strict';
if ( process.env.NODE_ENV == 'dev') {
    require('./config/dev-server');
} else if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'testing') {
    require('./config/build-server');
}
