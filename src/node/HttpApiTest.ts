import * as http from 'http';

export class HttpApiTest {
    constructor() {
        this.init();
    }

    init() {
        const server = http.createServer((req, res) => {
            // 设置响应头
            res.writeHead(200, { 'Content-Type': 'application/json' });

            // 获取请求的消息头、协议和消息体
            const headers = req.headers;
            const method = req.method;
            const url = req.url;
            let body = '';

            req.on('data', chunk => {
                body += chunk;
            });

            req.on('end', () => {
                // 构建响应内容
                const responseContent = {
                    headers: headers,
                    method: method,
                    url: url,
                    body: body
                };
                const str = JSON.stringify(responseContent);
                console.log(str);
                console.log(responseContent);
                // 返回响应内容
                res.end(str);
            });
        });

        // 服务器监听端口
        server.listen(3000, () => {
            console.log('Server is listening on port 3000');
        });
    }
}

new HttpApiTest();