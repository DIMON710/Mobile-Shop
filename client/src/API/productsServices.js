import axios from 'axios';
const SERVER = import.meta.env.VITE_API_URL
export default class productsServices {
    static async getAll () {
        return await axios.get(`${SERVER}/products`);
    }
    static async getAllPage (page) {
        page = page || 1
        return await axios.get(`${SERVER}/products/page/` + page);
    }
    static async getOne (id) {
        return await axios.get(`${SERVER}/products/` + id);
    }
    static async getSome (ids) {
        return await axios.post(`${SERVER}/products/basket/`, {ids});
    }
    static async addNew (product) {
        return await axios.post(`${SERVER}/products/add-new/`, product);
    }
    static async remove (id) {
        return await axios.delete(`${SERVER}/products/remove/` + id);
    }
    static async pay ({amount, description, delivery, img, order_id}) {
        return await axios.post(`${SERVER}/pay/`, {amount, description, delivery, img, order_id});
    }
    static async getStatus (order_id) {
        return await axios.post(`${SERVER}/pay/status`, {order_id});
    }
    static async getOrders (page) {
        if (page < 1) {
            page = 1
        }
        return await axios.get(`${SERVER}/orders/${page}`);
    }
    static async filterOrders (params, page) {
        return await axios.post(`${SERVER}/orders/filter/${page}`, {params});
    }
    static async changeOrder ({id, complete}) {
        return await axios.put(`${SERVER}/orders/order`, {id, complete: !complete});
    }
    static async getAllOrders () {
        return await axios.get(`${SERVER}/orders/all`);
    }
}