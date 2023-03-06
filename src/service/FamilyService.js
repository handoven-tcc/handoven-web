import axios from "axios";

export class FamilyService {
    url = "https://handoven-api-production-production.up.railway.app";
    handovenService = false

    async getFamily({userId, familyId}) {
        return await axios
            .get(`${this.url}/family`, {
                headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getFamilyId({userId, familyId}) {
        return await axios
            .get(`${this.url}/family/${familyId}`, {
                headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async postFamily({ name }) {
        return await axios
            .post(`${this.url}/family`, {
                name
            })
            .then((res) => res.data)
            .catch((err) => console.log(err))
    }

    async putFamily({userId, familyId, name }) {
        return await axios
            .put(`${this.url}/family/${familyId}`, {
                name, headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async deleteFamily({userId, familyId}) {
        await axios.delete(`${this.url}/family/${familyId}`, {
            "X-HandOven-User": userId,
            "X-HandOven-Family": familyId,
            "X-handOven-Service": this.handovenService
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
}
