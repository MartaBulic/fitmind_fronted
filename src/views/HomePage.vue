<template>
  <div class="app-container">
    <!-- Top Navigation Bar (Consistent across all pages) -->
    <header class="top-nav">
      <div class="nav-container">
        <div class="logo-section">
          <div class="brand-logo">
            <img src="@/assets/logo.png" alt="Fit&Mind Logo" />
          </div>
          <span class="brand-name">Fit&Mind</span>
        </div>
        <nav class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
          <router-link to="/" class="nav-link">HOME</router-link>
          <router-link to="/dashboard" class="nav-link">PROFILE</router-link>
          <router-link to="/contact" class="nav-link">CONTACT</router-link>
        </nav>
        <div class="nav-actions">
          <button v-if="showLanding" class="nav-btn-login" @click="goToAuth('login')">
            LOG IN
          </button>
          <button v-if="showLanding" class="nav-btn-signup" @click="goToAuth('register')">
            SIGN UP
          </button>
          <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
            ☰
          </button>
        </div>
      </div>
    </header>

    <!-- Landing Page -->
    <div v-if="showLanding" class="landing-page">
      <div class="landing-overlay"></div>
      <div class="landing-content">
        <!-- Main Heading -->
        <h1 class="main-heading">
          Train Your <span class="highlight-white">Body</span>,<br />
          <span class="highlight-orange">Empower</span><br />
          Your <span class="highlight-white">Mind</span>.
        </h1>

        <p class="subtitle">
          Transform your fitness journey with personalized nutrition plans and expert guidance
        </p>

        <!-- Call to Action -->
        <div class="cta-buttons">
          <button class="btn-signup" @click="goToAuth('register')">
            GET STARTED
          </button>
          <p class="login-text">
            Already have an account?
            <span class="login-link" @click="goToAuth('login')">LOG IN</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Auth Page -->
    <div v-else class="auth-container">
      <!-- Left Image -->
      <div class="left-section">
        <img src="@/assets/gym-image.jpg" alt="Fitness" class="gym-image" />
      </div>

      <!-- Right Forms -->
      <div class="right-section">
        <div class="forms-wrapper">
          <button class="back-button" @click="showLanding = true">
            ← Back to Home
          </button>

          <!-- Tabs -->
          <div class="tabs">
            <button
              :class="['tab', { active: activeTab === 'login' }]"
              @click="activeTab = 'login'"
            >
              Login
            </button>
            <button
              :class="['tab', { active: activeTab === 'register' }]"
              @click="activeTab = 'register'"
            >
              Register
            </button>
          </div>

          <!-- Forms -->
          <div v-show="activeTab === 'login'" class="form-container">
            <LoginForm />
          </div>

          <div v-show="activeTab === 'register'" class="form-container">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'HomePage',
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      showLanding: true,
      activeTab: 'login',
      mobileMenuOpen: false
    }
  },
  methods: {
    goToAuth(tab) {
      this.activeTab = tab
      this.showLanding = false
    }
  }
}
</script>

<style scoped>
/* ================================ */
/* GLOBAL RESET FOR THIS PAGE */
/* ================================ */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* ================================ */
/* TOP NAVIGATION BAR - MATCHING UserDashboard */
/* ================================ */
.top-nav {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.nav-container {
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.brand-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-name {
  font-weight: 700;
  font-size: 1.2rem;
  color: #333;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #555;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #f18213;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-btn-login,
.nav-btn-signup {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.nav-btn-login {
  background: #f0f0f0;
  color: #666;
}

.nav-btn-login:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.nav-btn-signup {
  background: linear-gradient(135deg, #974f39 0%, #ff6b35 100%);
  color: white;
}

.nav-btn-signup:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(241, 130, 19, 0.4);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #333;
  margin: 0;
}

/* ================================ */
/* LANDING PAGE - NO WHITE SPACE */
/* ================================ */
.landing-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  padding-top: 72px; /* Height of navbar */

  /* Background Image */
  background: url('@/assets/gym-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
}

/* Dark Overlay for Better Text Readability */
.landing-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(151, 79, 57, 0.4) 50%,
    rgba(241, 130, 19, 0.3) 100%
  );
  z-index: 1;
}

.landing-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1100px;
  padding: 0 40px;
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Main Heading */
.main-heading {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 30px;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  letter-spacing: -1px;
  animation: fadeInUp 1.4s ease-out;
}

.highlight-white {
  color: #ffffff;
}

.highlight-orange {
  color: #ff6b35;
  text-shadow: 0 0 30px rgba(255, 107, 53, 0.6);
}

/* Subtitle */
.subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 1.6s ease-out;
}

/* CTA Buttons */
.cta-buttons {
  animation: fadeInUp 1.8s ease-out;
}

.btn-signup {
  padding: 18px 60px;
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #974f39 0%, #ff6b35 50%, #f18213 100%);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 10px 30px rgba(241, 130, 19, 0.5);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  margin: 0;
}

.btn-signup::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-signup:hover::before {
  left: 100%;
}

.btn-signup:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(241, 130, 19, 0.7);
}

.btn-signup:active {
  transform: translateY(-2px);
}

.login-text {
  margin-top: 25px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  font-weight: 300;
}

.login-link {
  color: #ff6b35;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  padding-bottom: 2px;
}

.login-link:hover {
  border-bottom: 2px solid #ff6b35;
  color: #f18213;
}

/* ================================ */
/* AUTH PAGE - NO WHITE SPACE */
/* ================================ */
.auth-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding-top: 72px; /* Height of navbar */
  display: flex;
  margin: 0;
  overflow: hidden;
}

.left-section {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.gym-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
}

.right-section {
  flex: 1;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
}

.forms-wrapper {
  width: 100%;
  max-width: 480px;
  padding: 20px;
}

/* Back Button */
.back-button {
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 8px 0;
  transition: all 0.3s ease;
  font-weight: 500;
}

.back-button:hover {
  color: #ff6b35;
  transform: translateX(-5px);
}

/* Tabs */
.tabs {
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.tab {
  flex: 1;
  padding: 12px;
  border: none;
  background: #f5f5f5;
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.tab:hover {
  background: #e8e8e8;
}

.tab.active {
  background: linear-gradient(135deg, #974f39 0%, #ff6b35 100%);
  color: white;
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(241, 130, 19, 0.3);
}

.form-container {
  animation: fadeIn 0.5s ease-out;
}

/* Make form text smaller to fit */
.form-container :deep(h2) {
  font-size: 1.4rem !important;
  margin-bottom: 8px !important;
}

.form-container :deep(.subtitle) {
  font-size: 0.85rem !important;
  margin-bottom: 20px !important;
}

.form-container :deep(.form-group) {
  margin-bottom: 15px !important;
}

.form-container :deep(label) {
  font-size: 0.85rem !important;
  margin-bottom: 6px !important;
  margin-top: 0 !important;
}

.form-container :deep(input),
.form-container :deep(select) {
  padding: 10px 12px !important;
  font-size: 0.9rem !important;
  margin-top: 0 !important;
}

.form-container :deep(button[type="submit"]) {
  padding: 12px !important;
  font-size: 1rem !important;
  margin-top: 10px !important;
}

.form-container :deep(.error-message),
.form-container :deep(.success-message) {
  font-size: 0.85rem !important;
  padding: 10px 12px !important;
  margin-top: 12px !important;
}

.form-container :deep(p) {
  font-size: 0.85rem !important;
  margin-top: 12px !important;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ================================ */
/* RESPONSIVE DESIGN */
/* ================================ */
@media (max-width: 1200px) {
  .main-heading {
    font-size: 3.5rem;
  }
}

@media (max-width: 968px) {
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 250px;
    background: white;
    flex-direction: column;
    padding: 4rem 2rem;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    z-index: 999;
  }

  .nav-links.mobile-open {
    right: 0;
  }

  .mobile-menu-btn {
    display: block;
  }

  .nav-btn-login,
  .nav-btn-signup {
    display: none;
  }

  .auth-container {
    flex-direction: column;
  }

  .left-section {
    display: none;
  }

  .main-heading {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .btn-signup {
    padding: 16px 50px;
    font-size: 1.1rem;
  }

  .landing-content {
    padding: 0 20px;
  }

  .forms-wrapper {
    max-width: 100%;
    padding: 15px;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem 1.5rem;
  }

  .brand-name {
    font-size: 1.1rem;
  }

  .brand-logo {
    width: 35px;
    height: 35px;
  }

  .main-heading {
    font-size: 2.5rem;
    letter-spacing: 0;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .btn-signup {
    padding: 14px 40px;
    font-size: 1rem;
  }

  .right-section {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0.75rem 1rem;
  }

  .brand-name {
    font-size: 1rem;
  }

  .brand-logo {
    width: 32px;
    height: 32px;
  }

  .main-heading {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .btn-signup {
    padding: 12px 35px;
    font-size: 0.95rem;
    letter-spacing: 1px;
  }

  .login-text {
    font-size: 0.9rem;
  }

  .right-section {
    padding: 10px;
  }

  .forms-wrapper {
    padding: 10px;
  }

  .form-container :deep(h2) {
    font-size: 1.2rem !important;
  }

  .form-container :deep(input),
  .form-container :deep(select) {
    padding: 8px 10px !important;
    font-size: 0.85rem !important;
  }
}
</style>