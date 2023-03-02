import axios from "axios";

export class ProductService {
    url = "https://handoven-api-production-production.up.railway.app";

        async getProducts() {
        return await axios
            .get(`${this.url}/products`)
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getProductsId(id) {
        return await axios
            .get(`${this.url}/products/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getProductsByFamilyId(familyId) {
        return await axios
            .get(`${this.url}/products/familyId/${familyId}`)
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async postProducts({ name, type, validity, category, cost, amount, familyId }) {
        return await axios
            .post(`${this.url}/products`, { name, type, validity, category, cost, amount, familyId })
            .then((res) => res.data)
            .catch((err) => console.log(err))
    }

    async putProduct(id, { name, type, validity, category, cost, amount, familyId }) {
        return await axios
            .put(`${this.url}/products/${id}`, { name, type, validity, category, cost, amount, familyId })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async deleteProduct(id) {
        await axios.delete(`${this.url}/products/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
}
