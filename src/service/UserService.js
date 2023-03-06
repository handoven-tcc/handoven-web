import axios from "axios";

export class UserService {
    url = "https://handoven-api-production-production.up.railway.app";
    handovenService = false

    async getUser({userId, familyId}) {
        return await axios

            .get(`${this.url}/user`, {
                headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getUserId({userId, familyId}) {
        return await axios
            .get(`${this.url}/user/${userId}`, {
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
            .get(`${this.url}/user/familyId/${familyId}`, {
                headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async postUser({ name, birthDate, cell, email, password, familyId }) {
        return await axios
            .post(`${this.url}/user/adduser`, {
                name, birthDate, cell, email, password, familyId
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async postLoginUser({ email, password }) {
        return await axios
            .post(`${this.url}/user/login`, {
                email, password})
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async putUser({userId, name, birthDate, cell, email, password, familyId }) {
        return await axios
            .put(`${this.url}/user/${userId}`, {
                name, birthDate, cell, email, password, familyId, headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async deleteUser({userId, familyId}) {
        await axios
            .delete(`${this.url}/user/${userId}`, {
                headers: {
                    "X-HandOven-User": userId,
                    "X-HandOven-Family": familyId,
                    "X-handOven-Service": this.handovenService
                }
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }
}
