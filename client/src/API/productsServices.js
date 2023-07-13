import axios from 'axios';
const CLIENT = 'http://178.165.38.121:5000'
export default class productsServices {
    static async getAll () {
        return await axios.get(`${CLIENT}/products/`);
    }
    static async getAllPage (page) {
        page = page || 1
        return await axios.get(`${CLIENT}/products/page/` + page);
    }
    static async getOne (id) {
        return await axios.get(`${CLIENT}/products/` + id);
    }
    static async getSome (ids) {
        return await axios.post(`${CLIENT}/products/basket/`, {ids});
    }
    static async addNew (product) {
        return await axios.post(`${CLIENT}/products/add-new/`, product);
    }
    static async remove (id) {
        return await axios.delete(`${CLIENT}/products/remove/` + id);
    }
    static async pay ({amount, description, delivery, img, order_id}) {
        return await axios.post(`${CLIENT}/pay/`, {amount, description, delivery, img, order_id});
    }
    static async getStatus (order_id) {
        return await axios.post(`${CLIENT}/pay/status`, {order_id});
    }
    static async getOrders (page) {
        if (page < 1) {
            page = 1
        }
        return await axios.get(`${CLIENT}/orders/${page}`);
    }
    static async filterOrders (params) {
        return await axios.post(`${CLIENT}/orders/filter`, {params});
    }
    static async changeOrder ({id, complete}) {
        return await axios.put(`${CLIENT}/orders/order`, {id, complete: !complete});
    }
    static async getAllOrders () {
        return await axios.get(`${CLIENT}/orders/all`);
    }
}