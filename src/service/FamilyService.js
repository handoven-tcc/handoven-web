import axios from "axios";

export class FamilyService {
    url = "https://handoven-api-production-production.up.railway.app";

    async getFamily() {
        return await axios
            .get(`${this.url}/family`)
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getFamilyId(id) {
        return await axios
            .get(`${this.url}/family/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async postFamily({ name }) {
        return await axios
            .post(`${this.url}/family`, { name })
            .then((res) => res.data)
            .catch((err) => console.log(err))
    }

    async putFamily(id, { name }) {
        return await axios
            .put(`${this.url}/family/${id}`, { name })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async deleteFamily(id) {
        await axios.delete(`${this.url}/family/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
}
