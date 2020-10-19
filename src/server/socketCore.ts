import {io} from './Server';

io.on('connection',(socket) => {
    console.log('some connected to main pool');
});

