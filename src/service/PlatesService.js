import axios from "axios";

export class PlatesService {
    url = "https://handoven-api-production-production.up.railway.app";

    async getPlates() {
        return await axios
            .get(`${this.url}/plates`)
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getPlatesId(id) {
        return await axios
            .get(`${this.url}/plates/platesId/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getPlatesLimit(limit) {
        return await axios  
            .get(`${this.url}/plates/${limit}`)
            .then((res) => res.data)
            .then((err) => console.log(err));
    }

    async postPlates({ name, secao }) {
        return await axios
            .post(`${this.url}/plates`, { name, secao })
            .then((res) => res.data)
            .catch((err) => console.log(err))
    }

    async putPlates(id, { name, category, ingredients, available }) {
        return await axios
            .put(`${this.url}/plates/${id}`, { name, category, ingredients, available })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async deletePlates(id) {
        await axios.delete(`${this.url}/plates/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
}
