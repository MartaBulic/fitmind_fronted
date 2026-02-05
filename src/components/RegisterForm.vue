<template>
  <div class="register-form">
    <h2>Create Account</h2>
    <p class="subtitle">Join Fit&Mind and start your journey</p>
    
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input 
          id="name"
          v-model="name" 
          type="text" 
          placeholder="Enter your name" 
          required 
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email"
          v-model="email" 
          type="email" 
          placeholder="Enter your email" 
          required 
        />
      </div>

      <!-- ROLE -->
      <div class="form-group">
        <label for="role">Register as</label>
        <select id="role" v-model="role" required>
          <option value="user">User</option>
          <option value="nutritionist">Nutritionist</option>
        </select>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password"
          v-model="password" 
          type="password" 
          placeholder="Create a password (min. 6 characters)" 
          required 
          minlength="6"
        />
      </div>

      <div class="form-group">
        <label for="password_confirmation">Confirm Password</label>
        <input 
          id="password_confirmation"
          v-model="password_confirmation" 
          type="password" 
          placeholder="Confirm your password" 
          required 
        />
      </div>

      <button type="submit" class="submit-btn" :disabled="loading">
        <span v-if="!loading">Register</span>
        <span v-else>Creating account...</span>
      </button>
    </form>

    <p v-if="error" class="error-message">{{ error }}</p>
    <p v-if="success" class="success-message">{{ success }}</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      email: '',
      role: 'user', // default
      password: '',
      password_confirmation: '',
      error: '',
      success: '',
      loading: false
    }
  },
  methods: {
    async registerUser() {
      this.error = '';
      this.success = '';

      if (this.password !== this.password_confirmation) {
        this.error = 'Passwords do not match!';
        return;
      }

      this.loading = true;

      try {
        const res = await api.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        });

        const token = res.data.token;
        const user = res.data.user;

        // Save token and user info
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.success = 'Registration successful! Redirecting...';

        // Redirect based on role immediately
        if (user.role === 'nutritionist') {
          this.$router.push('/nutritionist/dashboard');
        } else if (user.role === 'superadmin') {
          this.$router.push('/admin/dashboard');
        } else {
          this.$router.push('/dashboard');
        }

      } catch (err) {
        if (err.response?.data?.errors) {
          this.error = Object.values(err.response.data.errors).flat().join(' ');
        } else {
          this.error = err.response?.data?.message || 'Registration failed.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.register-form {
  width: 100%;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input, select {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
}

.error-message {
  color: #e74c3c;
  background: #fee;
  padding: 12px;
  border-radius: 8px;
  margin-top: 15px;
}

.success-message {
  color: #27ae60;
  background: #efd;
  padding: 12px;
  border-radius: 8px;
  margin-top: 15px;
}
</style>
