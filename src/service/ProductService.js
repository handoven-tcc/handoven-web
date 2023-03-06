import axios from "axios";

export class ProductService {
    url = "https://handoven-api-production-production.up.railway.app";
    handovenService = false

    async getProducts({userId, familyId}) {
        return await axios
            .get(`${this.url}/products`, {
                headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getProductsId(id, {userId, familyId}) {
        return await axios
            .get(`${this.url}/products/${id}`, {
                headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getProductsByFamilyId({userId, familyId}) {
        return await axios
            .get(`${this.url}/products/familyId/${familyId}`, {
                headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async postProducts({ name, type, validity, category, cost, amount, familyId, userId }) {
        return await axios
            .post(`${this.url}/products`, {
                name, type, validity, category, cost, amount, familyId, headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err))
    }

    async putProduct(id, { name, type, validity, category, cost, amount, familyId }, userId) {
        return await axios
            .put(`${this.url}/products/${id}`, {
                name, type, validity, category, cost, amount, familyId, headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async deleteProduct(id, {userId, familyId}) {
        await axios.delete(`${this.url}/products/${id}`, {
            headers: {
                "X-HandOven-User": userId,
                "X-HandOven-Family": familyId,
                "X-handOven-Service": this.handovenService
            }
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
}
