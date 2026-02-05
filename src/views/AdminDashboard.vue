<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <p>Welcome, {{ user.name }}!</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user') || '{}')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 40px;
}
</style>