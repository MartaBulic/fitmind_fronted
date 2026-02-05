<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit" class="login-btn">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('/api/login', {
          email: this.email,
          password: this.password
        })

        const token = res.data.token
        const user = res.data.user

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        // Redirect prema roli
        if (user.role === 'nutritionist') {
          this.$router.push('/nutritionist/dashboard')
        } else if (user.role === 'superadmin') {
          this.$router.push('/admin/dashboard')
        } else {
          this.$router.push('/dashboard')
        }
      } catch (err) {
        console.error('Login error:', err)
        alert('Login failed. Check your credentials.')
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
}

.login-form {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.login-btn {
  padding: 10px;
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(241, 130, 19, 0.4);
}
</style>
