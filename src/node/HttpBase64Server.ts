const fs = require('fs');
const http = require('http');

function startServer() {
    const server = http.createServer((req, res) => {
        if (req.method === 'POST') {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    // 验证Base64编码
                    if (!/^data:image\/png;base64,/.test(body)) {
                        throw new Error('Invalid Base64 data');
                    }

                    // 去掉前缀并解码Base64数据
                    const base64Data = body.replace(/^data:image\/png;base64,/, '');
                    const buffer = Buffer.from(base64Data, 'base64');

                    // 保存PNG文件
                    fs.writeFile('output.png', buffer, (err) => {
                        if (err) {
                            throw err;
                        }
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Data received and PNG created');
                    });
                } catch (err) {
                    console.error('Error processing data:', err);
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Bad Request');
                }
            });

            req.on('error', (err) => {
                console.error('Error receiving data:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Method Not Allowed');
        }
    });

    server.listen(8080, () => {
        console.log('Server is listening on port 8080');
    });
}

startServer();