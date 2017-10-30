'use strict';
if ( process.env.NODE_ENV == 'dev') {
    require('./config/dev-server');
} else {
    require('./config/build-server');
}
