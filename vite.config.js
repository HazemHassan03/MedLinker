import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        signup: resolve(__dirname, "signup/signup.html"),
        information: resolve(__dirname, "signup/information.html"),
        login: resolve(__dirname, "login/login.html"),
        home: resolve(__dirname, "home/home.html"),
        job: resolve(__dirname, "job/job.html"),
        postJob: resolve(__dirname, "post-job/post-job.html"),
        profile: resolve(__dirname, "profile/profile.html"),
      },
    },
  },
});
