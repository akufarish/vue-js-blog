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

  <div class="container mt-5">
    <div class="" v-for="(post, index) in posts" :key="index">
      <router-link
        :to="{ name: 'post.single', params: { id: post.id } }"
        class="text-body-secondary"
        >{{ post.name }}</router-link
      >
      <h3 class="text-body-secondary">{{ post.slug }}</h3>
      <router-link
        :to="{ name: 'post.single', params: { id: post.id } }"
        class="text-body-secondary"
        >{{ post.slug }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "../routes";
import axios from "axios";

let loggedIn = JSON.parse(localStorage.getItem("users"));
if (loggedIn === null) {
  router.push("/");
}
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("users")),
    };
  },

  methods: {
    doLogout() {
      axios
        .post(
          `http://127.0.0.1:8000/api/auth/logout?token=${loggedIn.data.token}`
        )
        .then((res) => {
          console.log(res);
          localStorage.clear();
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  setup() {
    let posts = ref([]);
    onMounted(() => {
      axios
        .get("http://127.0.0.1:8000/api/post/")
        .then((res) => {
          console.log(res);
          posts.value = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      posts,
    };
  },
};

let isLogged = JSON.parse(localStorage.getItem("users"));
if (isLogged == null) {
  router.push("/");
}
</script>
