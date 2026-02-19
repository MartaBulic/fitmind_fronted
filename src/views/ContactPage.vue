<template>
  <div class="app-container">
    <!-- Top Navigation Bar -->
    <header class="top-nav">
      <div class="nav-container">
        <div class="logo-section">
          <div class="brand-logo">
            <img src="@/assets/logo.png" alt="Fit&Mind Logo" />
          </div>
          <span class="brand-name">Fit&Mind</span>
        </div>

        <!-- NAV LINKS in padded box -->
        <nav class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
          <router-link to="/" class="nav-link">HOME</router-link>
          <router-link to="/dashboard" class="nav-link">PROFILE</router-link>
          <router-link to="/contact" class="nav-link">CONTACT</router-link>
        </nav>

        <div class="nav-actions">
          <button v-if="showLanding" class="nav-btn-login" @click="goToAuth('login')">LOG IN</button>
          <button v-if="showLanding" class="nav-btn-signup" @click="goToAuth('register')">SIGN UP</button>
          <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">☰</button>
        </div>
      </div>
    </header>

    <div class="contact-wrapper">
      <!-- Main Contact Section -->
      <div class="contact-page">
        <!-- Header -->
        <div class="contact-header">
          <div class="header-icon">✉️</div>
          <h1>Get In Touch</h1>
          <center><p>We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p></center>
        </div>

        <!-- Contact Grid -->
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="form-section">
            <div class="section-title">
              <h2>📝 Send us a Message</h2>
            </div>
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="name"><span class="label-icon">👤</span> Full Name</label>
                <input type="text" id="name" v-model="form.name" placeholder="Enter your full name" required />
              </div>

              <div class="form-group">
                <label for="email"><span class="label-icon">📧</span> Email Address</label>
                <input type="email" id="email" v-model="form.email" placeholder="your.email@example.com" required />
              </div>

              <div class="form-group">
                <label for="message"><span class="label-icon">💬</span> Your Message</label>
                <textarea id="message" v-model="form.message" placeholder="Tell us what's on your mind..." required></textarea>
              </div>

              <button type="submit" class="submit-btn"><span class="btn-icon">🚀</span> Send Message</button>

              <transition name="fade">
                <div v-if="successMessage" class="success-message">
                  <span class="success-icon">✅</span>{{ successMessage }}
                </div>
              </transition>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="info-section">
            <div class="section-title">
              <h2>📞 Contact Information</h2>
            </div>
            <div class="info-items">
              <div class="info-item">
                <div class="info-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>info@fitandmind.com</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+123 456 7890</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">📍</div>
                <div>
                  <h4>Location</h4>
                  <p>Mostar, Bosnia and Herzegovina</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">🕐</div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="quick-links-card">
              <h4>🔗 Quick Links</h4>
              <div class="quick-links">
                <router-link to="/" class="quick-link">🏠 Home</router-link>
                <router-link to="/dashboard" class="quick-link">📊 Dashboard</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactPage",
  data() {
    return {
      form: { name: "", email: "", message: "" },
      successMessage: "",
      mobileMenuOpen: false,
      showLanding: false
    };
  },
  methods: {
    submitForm() {
      console.log("Form submitted:", this.form);
      this.successMessage =
        "Thank you! Your message has been sent successfully. We'll get back to you soon!";
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
      setTimeout(() => (this.successMessage = ""), 5000);
    },
    goToAuth(mode) {
      this.$router.push({ name: "Auth", params: { mode } });
    }
  }
};
</script>

<style>
/* Global styles - affects entire app */
html,
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%) !important;
  min-height: 100vh;
  width: 100%;
}

#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
}
</style>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app-container {
  padding-top: 90px;
  min-height: 100vh;
  background: transparent;
}

/* ===== TOP NAVIGATION ===== */
.top-nav {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo img {
  height: 40px;
  width: auto;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
}

/* NAV LINKS in padded box */
.nav-links {
  display: flex;
  gap: 2rem;
  background: #f5f5f5;
  padding: 0.5rem 1.5rem;
  border-radius: 12px;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #f18213;
  background: #fff3e0;
  border-radius: 8px;
}

.nav-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-btn-login,
.nav-btn-signup {
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.nav-btn-login {
  background: transparent;
  color: #f18213;
  border: 2px solid #f18213;
}

.nav-btn-login:hover {
  background: #f18213;
  color: white;
}

.nav-btn-signup {
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  color: white;
}

.nav-btn-signup:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(241, 130, 19, 0.3);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #2c3e50;
}

/* ===== CONTACT WRAPPER ===== */
.contact-wrapper {
  min-height: calc(100vh - 90px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding: 3rem 2rem 4rem;
}

/* ===== CONTACT PAGE ===== */
.contact-page {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* ===== CONTACT HEADER ===== */
.contact-header {
  text-align: center;
  margin: 0 1rem 3rem 1rem;
  padding: 3rem 2rem;
  background: transparent;      
  border-radius: 0;             
  box-shadow: none;             
}

.header-icon {
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

.contact-header h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-header p {
  color: #6b7280;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
  text-align: center;
}

/* ===== CONTACT GRID ===== */
.contact-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
  padding: 0 1rem;
}

/* ===== FORM SECTION ===== */
.form-section {
  background: transparent;   
  padding: 2.5rem;
  border-radius: 0;          
  box-shadow: none;         
  margin: 0.5rem;
}


.section-title {
  margin-bottom: 2rem;
}

.section-title h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  font-weight: 700;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label-icon {
  font-size: 1.1rem;
}

.form-group input,
.form-group textarea {
  padding: 1rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #f18213;
  box-shadow: 0 0 0 3px rgba(241, 130, 19, 0.1);
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(241, 130, 19, 0.3);
}

.btn-icon {
  font-size: 1.2rem;
}

.success-message {
  padding: 1rem 1.5rem;
  background: #d4edda;
  border: 2px solid #28a745;
  border-radius: 12px;
  color: #155724;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  margin-top: 0.5rem;
}

.success-icon {
  font-size: 1.3rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== INFO SECTION ===== */
.info-section {
  background: transparent;   
  padding: 2.5rem;
  border-radius: 0;          
  box-shadow: none;          
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0.5rem;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.25rem;
  background: #f9fafb;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: #f3f4f6;
  transform: translateX(5px);
}

.info-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.info-item h4 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.info-item p {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
}

/* ===== QUICK LINKS CARD ===== */
.quick-links-card {
  background: transparent;     
  padding: 1.75rem;
  border-radius: 0;
  color: #2c3e50;            
  margin-top: 0.5rem;
}

.quick-links-card h4 {
  font-size: 1.2rem;
  margin-bottom: 1.25rem;
  font-weight: 700;
}

.quick-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quick-link {
  color: #6b7280;
  text-decoration: none;
  padding: 0.875rem 1.25rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quick-link:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateX(5px);
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-header h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    gap: 0.5rem;
  }

  .nav-links.mobile-open {
    display: flex;
  }

  .mobile-menu-btn {
    display: block;
  }

  .nav-btn-login,
  .nav-btn-signup {
    display: none;
  }

  .contact-wrapper {
    padding: 2rem 1rem 3rem;
  }

  .contact-header {
    padding: 2rem 1.5rem;
    margin: 0 0.5rem 2rem 0.5rem;
  }

  .contact-header h1 {
    font-size: 2rem;
  }

  .contact-header p {
    font-size: 1rem;
  }

  .form-section,
  .info-section {
    padding: 1.75rem;
    margin: 0.25rem;
  }

  .section-title h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .app-container {
    padding-top: 70px;
  }

  .brand-name {
    font-size: 1.2rem;
  }

  .contact-wrapper {
    padding: 1.5rem 0.75rem 2rem;
  }

  .contact-header {
    padding: 1.5rem 1rem;
    margin: 0 0.25rem 1.5rem 0.25rem;
  }

  .header-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .contact-header h1 {
    font-size: 1.75rem;
  }

  .contact-header p {
    font-size: 0.95rem;
  }

  .form-section,
  .info-section {
    padding: 1.5rem;
    margin: 0.25rem;
  }

  .contact-form {
    gap: 1.25rem;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.875rem 1rem;
  }

  .submit-btn {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }

  .info-item {
    padding: 1rem;
    gap: 1rem;
  }

  .info-icon {
    font-size: 1.75rem;
  }

  .quick-links-card {
    padding: 1.5rem;
  }
}
</style>