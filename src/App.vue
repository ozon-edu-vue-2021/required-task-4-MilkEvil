<template>
  <div id="app" class="container p-5">
    <div class="row justify-content-center">
      <Form class="col-8" />
    </div>
  </div>
</template>

<script>
import Form from "./components/Form.vue";

export default {
  name: "App",
  components: {
    Form,
  },
};
</script>

<style>
@import "~normalize.css";
@import "~bootstrap/dist/css/bootstrap.min.css";

* {
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
}
</style>
