<template>
  <div class="center-card">
    <div class="card shadow-lg rounded-3" style="width: 18rem">
      <div class="card-body">
        <div class="d-flex justify-content-center align-items-center mb-3">
          <img src="../assets/vue.svg" width="100" />
        </div>
        <h3 class="text-center mb-4">Selamat datang!</h3>
        <form @submit.prevent="doLogin">
          <div class="mb-3">
            <p for="exampleInputEmail1" class="form-label">Name</p>
            <input type="text" class="form-control" v-model="users.name" />
          </div>
          <div class="mb-3">
            <p for="exampleInputPassword1" class="form-label">Password</p>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="users.password"
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
          <button
            type="submit"
            @click.prevent="doRegister"
            class="btn btn-primary w-100 mt-3"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../routes";
export default {
  data() {
    return {
      users: [],
    };
  },

  methods: {
    doLogin() {
      axios
        .post("http://127.0.0.1:8000/api/auth/login", {
          name: this.users.name,
          password: this.users.password,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("users", JSON.stringify(res.data));
          router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doRegister() {
      axios
        .post("http://127.0.0.1:8000/api/auth/register", {
          name: this.users.name,
          password: this.users.password,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("users", JSON.stringify(res.data));
          router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};

let isLogged = JSON.parse(localStorage.getItem("users"));
if (isLogged != null) {
  router.push("/dashboard");
}
</script>

<style scoped>
.center-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}
</style>
