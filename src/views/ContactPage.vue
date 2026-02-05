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

    <div class="contact-wrapper">
      <!-- Main Contact Section -->
      <div class="contact-page">
        <!-- Header -->
        <div class="contact-header">
          <div class="header-icon">✉️</div>
          <h1>Get In Touch</h1>
          <center><p>We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p></center>
        </div>

        <!-- Contact Form and Info Grid -->
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="form-section">
            <div class="section-title">
              <h2>📝 Send us a Message</h2>
            </div>
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="name">
                  <span class="label-icon">👤</span>
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  placeholder="Enter your full name" 
                  required
                />
              </div>

              <div class="form-group">
                <label for="email">
                  <span class="label-icon">📧</span>
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  placeholder="your.email@example.com" 
                  required
                />
              </div>

              <div class="form-group">
                <label for="message">
                  <span class="label-icon">💬</span>
                  Your Message
                </label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  placeholder="Tell us what's on your mind..." 
                  required
                ></textarea>
              </div>

              <button type="submit" class="submit-btn">
                <span class="btn-icon">🚀</span>
                Send Message
              </button>

              <transition name="fade">
                <div v-if="successMessage" class="success-message">
                  <span class="success-icon">✅</span>
                  {{ successMessage }}
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
  name: 'ContactPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      successMessage: '',
      mobileMenuOpen: false,
      showLanding: false // Set to true if you want to show login/signup buttons
    }
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.form)
      this.successMessage = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon!'
      
      // Clear form
      this.form.name = ''
      this.form.email = ''
      this.form.message = ''

      // Clear success message after 5 seconds
      setTimeout(() => {
        this.successMessage = ''
      }, 5000)
    },
    goToAuth(mode) {
      // Navigate to auth page with login or register mode
      this.$router.push({ name: 'Auth', params: { mode } })
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.app-container {
  padding-top: 90px; /* visina fixed navbara */
  

}

/* ===== TOP NAVIGATION ===== */
.top-nav {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #f18213;
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

@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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
}

.contact-wrapper {
  min-height: calc(100vh - 90px);
  display: flex;
  justify-content: center; /* horizontalno centriranje */
  align-items: center;     /* vertikalno centriranje */
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding: 2rem;
}



/* ===== CONTACT PAGE ===== */
.contact-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* ===== HEADER ===== */
.contact-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 2rem;
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
}

.header-icon {
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.contact-header h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-header p {
  color: #6b7280;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
}

/* ===== CONTACT GRID ===== */
.contact-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 2rem;
}

/* ===== SECTION TITLES ===== */
.section-title {
  margin-bottom: 2rem;
}

.section-title h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  font-weight: 700;
}

/* ===== FORM SECTION ===== */
.form-section {
  background: white;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  font-size: 1rem;
}

.label-icon {
  font-size: 1.3rem;
}

.form-group input,
.form-group textarea {
  padding: 1.1rem 1.3rem;
  border-radius: 14px;
  border: 2px solid #e5e7eb;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
  background: #f9fafb;
  color: #2c3e50;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #f18213;
  background: white;
  box-shadow: 0 0 0 4px rgba(241, 130, 19, 0.1);
  transform: translateY(-2px);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #9ca3af;
}

textarea {
  resize: vertical;
  min-height: 180px;
  line-height: 1.7;
}

.submit-btn {
  padding: 1.2rem 2.5rem;
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 35px rgba(241, 130, 19, 0.5);
}

.btn-icon {
  font-size: 1.4rem;
}

.success-message {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  padding: 1.3rem;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  border: 2px solid #6ee7b7;
  margin-top: 0.5rem;
}

.success-icon {
  font-size: 1.6rem;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ===== INFO SECTION ===== */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-items {
  background: white;
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  border-radius: 14px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.info-item:hover {
  border-color: #ffe8dc;
  transform: translateX(8px);
  box-shadow: 0 6px 16px rgba(241, 130, 19, 0.15);
  background: linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%);
}

.info-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(241, 130, 19, 0.2);
}

.info-item h4 {
  color: #2c3e50;
  font-size: 1.05rem;
  margin-bottom: 0.4rem;
  font-weight: 700;
}

.info-item p {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
}

/* ===== QUICK LINKS ===== */
.quick-links-card {
  background: white;
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
}

.quick-links-card h4 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 1.25rem;
  font-weight: 700;
}

.quick-links {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.quick-link {
  color: #6b7280;
  text-decoration: none;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 2px solid transparent;
}

.quick-link:hover {
  background: linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%);
  color: #f18213;
  transform: translateX(8px);
  border-color: #ffe8dc;
  box-shadow: 0 4px 12px rgba(241, 130, 19, 0.15);
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-header h1 {
    font-size: 2.2rem;
  }

  .contact-header p {
    font-size: 1.05rem;
  }

  .form-section {
    padding: 2.5rem;
  }
}

@media (max-width: 768px) {
  .contact-wrapper {
    padding-top: 4rem;
  }

  .contact-page {
    padding: 1.5rem;
  }

  .contact-header {
    padding: 2.5rem 1.5rem;
    margin-bottom: 2rem;
  }

  .contact-header h1 {
    font-size: 2rem;
  }

  .header-icon {
    font-size: 3.5rem;
  }

  .form-section {
    padding: 2rem;
  }

  .info-items {
    padding: 2rem;
  }

  .section-title h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .contact-header {
    padding: 2rem 1.25rem;
  }

  .contact-header h1 {
    font-size: 1.8rem;
  }

  .contact-header p {
    font-size: 1rem;
  }

  .form-section {
    padding: 1.5rem;
  }

  .info-items {
    padding: 1.5rem;
  }

  .quick-links-card {
    padding: 1.5rem;
  }

  .section-title h2 {
    font-size: 1.3rem;
  }
}
</style>