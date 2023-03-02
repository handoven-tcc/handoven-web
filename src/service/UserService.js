import axios from "axios";

export class UserService {
    url = "https://handoven-api-production-production.up.railway.app";

    async getUser() {
        return await axios
            .get(`${this.url}/user`)
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getUserId(id) {
        return await axios
            .get(`${this.url}/user/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async getFamilyId(id) {
        return await axios
            .get(`${this.url}/user/familyId/${id}`)
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async postUser({ name, birthDate, cell, email, password, familyId }) {
        return await axios
            .post(`${this.url}/user/adduser`, { name, birthDate, cell, email, password, familyId })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async postLoginUser({ email, password }) {
        return await axios
            .post(`${this.url}/user/login`, { email, password })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async putUser(id, { name, birthDate, cell, email, password, familyId }) {
        return await axios
            .put(`${this.url}/user/${id}`, { name, birthDate, cell, email, password, familyId })
            .then((res) => res.data)
            .catch((err) => console.log(err));
    }

    async deleteUser(id) {
        await axios
            .delete(`${this.url}/user/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }
}
