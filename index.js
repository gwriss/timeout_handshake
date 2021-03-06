var Client = require('ssh2').Client;

var host = process.env.TIMEOUT_HANDSHAKE_HOST
var user = process.env.TIMEOUT_HANDSHAKE_USER
var pass = process.env.TIMEOUT_HANDSHAKE_PASS
var path = process.env.TIMEOUT_HANDSHAKE_PATH || '/'


var conn = new Client();
conn.on('ready', function() {
  console.log('Client :: ready');
  conn.sftp(function(err, sftp) {
    if (err) throw err;
    sftp.readdir(path, function(err, list) {
      if (err) throw err;
      console.dir(list);
      conn.end();
    });
  });
}).connect({
  host: host,
  port: 22,
  username: user,
  password: pass,
  readyTimeout: 10000,
});

// example output:
// Client :: ready
// [ { filename: 'test.txt',
//     longname: '-rw-r--r--    1 frylock   frylock         12 Nov 18 11:05 test.txt',
//     attrs:
//      { size: 12,
//        uid: 1000,
//        gid: 1000,
//        mode: 33188,
//        atime: 1353254750,
//        mtime: 1353254744 } },
//   { filename: 'mydir',
//     longname: 'drwxr-xr-x    2 frylock   frylock       4096 Nov 18 15:03 mydir',
//     attrs:
//      { size: 1048576,
//        uid: 1000,
//        gid: 1000,
//        mode: 16877,
//        atime: 1353269007,
//        mtime: 1353269007 } } ]
