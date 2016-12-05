/**
 * Created by ndenelson on 30/11/2016.
 */
// Object to capture process exits and call app specific cleanup function


function Cleanup(callback) {

    this.defaultHandler = function() {
        console.log('Default handler.')
        if(typeof this.listSocket !== 'undefined')
        this.listSocket.forEach((socket) => {
            socket.disconnect(0)
        })
    };

    // do app specific cleaning before exiting
    process.on('exit',  () => {
        console.log('On exit event occur...')
    });

    // catch ctrl+c event and exit normally
    process.on('SIGINT', () => {
        console.log('Ctrl-C...');
        process.exit(2);
    });

    //catch uncaught exceptions, trace, then exit normally
    process.on('uncaughtException', (e) => {
        console.log('Uncaught Exception...');
        console.log(e.stack);
        process.exit(99);
    });
};

Cleanup.prototype.listSocket =  new Set();


module.exports = Cleanup
