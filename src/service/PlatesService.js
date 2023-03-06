import axios from "axios";

export class PlatesService {
    url = "https://handoven-api-production-production.up.railway.app";
    handovenService = false;

    async getPlates({ userId, familyId }) {
        return await axios
            .get(`${this.url}/plates`, {
                headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getPlatesId(id, { userId, familyId }) {
        return await axios
            .get(`${this.url}/plates/platesId/${id}`, {
                headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getPlatesLimit(limit, { userId, familyId }) {
        return await axios
            .get(`${this.url}/plates/${limit}`, {
                headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .then((err) => console.log(err));
    }

    async postPlates({ name, secao }, {userId, familyId}) {
        return await axios
            .post(`${this.url}/plates`, {
                name, secao, headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err))
    }

    async putPlates(id, { name, category, ingredients, available }, { userId, familyId }) {
        return await axios
            .put(`${this.url}/plates/${id}`, {
                name, category, ingredients, available, headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async deletePlates(id, { userId, familyId }) {
        await axios.delete(`${this.url}/plates/${id}`, {
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
