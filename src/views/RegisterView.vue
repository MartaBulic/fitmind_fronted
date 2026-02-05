<template>
  <div>
    <h1>Registracija</h1>
    <RegisterForm />
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue';

export default {
  components: { RegisterForm }
};
</script>
