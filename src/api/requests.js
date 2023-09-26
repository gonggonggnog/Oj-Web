import axios from "axios";
import { ElMessage } from 'element-plus';
const service = axios.create({
    baseURL: "http://localhost:8080",
})

service.interceptors.request.use((req) => {
    return req;
})

service.interceptors.response.use((res) => {
    return res.data;
})

function request(options) {
    options.method = options.method || 'get';
    if (typeof options.data === 'object' && options.headers['Content-Type'] === 'application/json') {
        options.data = JSON.stringify(options.data);
    }
    return service(options);
}
export default request;