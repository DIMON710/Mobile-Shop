import axios from 'axios';
export default class productsServices {
    static async getAll () {
        return await axios.get('http://localhost:3000/products/');
    }
    static async getOne (id) {
        return await axios.get('http://localhost:3000/products/' + id);
    }
    static async addNew (product) {
        return await axios.post('http://localhost:3000/products/add-new', product);
    }
    static async remove (id) {
        return await axios.delete('http://localhost:3000/products/remove/' + id);
    }
}