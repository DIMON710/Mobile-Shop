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
    static async pay ({amount, description, delivery}) {
        return await axios.post(`${CLIENT}/pay/`, {amount, description, delivery});
    }
    static async getPay (page) {
        return await axios.get(`${CLIENT}/pay/${page}`);
    }
    static async changeOrder ({id, complete}) {
        return await axios.put(`${CLIENT}/pay/order`, {id, complete: !complete});
    }
    static async getAllPay () {
        return await axios.get(`${CLIENT}/pay/all`);
    }
}