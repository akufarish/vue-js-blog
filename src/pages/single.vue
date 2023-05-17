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
    <h3>{{ posts.judul }}</h3>
    <p>{{ posts.slug }}</p>
    <p>{{ posts.isi }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "../routes";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

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
      localStorage.clear();
      router.push("/");
    },
  },

  setup() {
    let posts = ref([]);
    let route = useRoute();
    onMounted(() => {
      axios
        .get(`http://127.0.0.1:8000/api/post/${route.params.id}`)
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
</script>
