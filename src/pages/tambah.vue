<template>
  <nav class="navbar navbar-expand-lg bg-danger">
    <div class="container-fluid">
      <router-link class="nav-link text-white" :to="{ name: 'post.dashboard' }"
        >IDK</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link text-white"
              :to="{ name: 'post.dashboard' }"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white"
              :to="{ name: 'post.tambah' }"
              >Post</router-link
            >
          </li>
        </ul>
        <form class="d-flex" role="search">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link text-white" href="#"> {{ user.data.name }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" @click="doLogout">Logout</a>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </nav>

  <div class="center-card">
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h3 class="text-center mb-4">Tambah datas</h3>
        <form @submit.prevent="addPost">
          <div class="mb-3">
            <p for="exampleInputEmail1" class="form-label">Name</p>
            <input type="text" class="form-control" v-model="post.judul" />
          </div>
          <div class="mb-3">
            <p for="exampleInputEmail1" class="form-label">Slug</p>
            <input type="text" class="form-control" v-model="post.slug" />
          </div>
          <div class="form-floating mb-3">
            <p for="exampleInputEmail1" class="form-label">Isi</p>
            <textarea
              v-model="post.isi"
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style="height: 100px"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary w-100">Submit</button>
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
      post: [],
      user: JSON.parse(localStorage.getItem("users")),
    };
  },

  methods: {
    addPost() {
      axios
        .post("http://127.0.0.1:8000/api/post/create", {
          judul: this.post.judul,
          slug: this.post.slug,
          isi: this.post.isi,
        })
        .then((res) => {
          console.log(res);
          router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
let isLogged = JSON.parse(localStorage.getItem("users"));
if (isLogged == null) {
  router.push("/");
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
