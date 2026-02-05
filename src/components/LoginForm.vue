<template>
  <div class="login-form">
    <h2>Welcome Back!</h2>
    <p class="subtitle">Login to continue your fitness journey</p>
    
    <form @submit.prevent="loginUser">
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

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password"
          v-model="password" 
          type="password" 
          placeholder="Enter your password" 
          required 
        />
      </div>

      <button type="submit" class="submit-btn" :disabled="loading">
        <span v-if="!loading">Login</span>
        <span v-else>Logging in...</span>
      </button>
    </form>

    <p v-if="error" class="error-message">{{ error }}</p>
    <p v-if="success" class="success-message">{{ success }}</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      success: '',
      loading: false
    }
  },
  methods: {
    async loginUser() {
      this.error = '';
      this.success = '';
      this.loading = true;

      try {
        const res = await api.post('/login', {
          email: this.email,
          password: this.password
        });

        const token = res.data.token;
        const user = res.data.user;

        // Save token and user in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.success = 'Login successful! Redirecting...';

        // Small delay for user feedback
        setTimeout(() => {
          // Redirect based on role
          if (user.role === 'superadmin') {
            this.$router.push('/admin/dashboard');
          } else if (user.role === 'nutritionist') {
            this.$router.push('/nutritionist/dashboard');
          } else {
            this.$router.push('/dashboard');
          }
        }, 500);

      } catch (err) {
        console.error('Login error:', err);
        this.error = err.response?.data?.message || 'Login failed. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 100%;
}

h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 0.95rem;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(225, 113, 44, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  background: #fee;
  padding: 12px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 0.9rem;
}

.success-message {
  color: #27ae60;
  background: #efd;
  padding: 12px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 0.9rem;
}
</style>