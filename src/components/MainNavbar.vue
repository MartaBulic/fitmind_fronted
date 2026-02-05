<template>
  <header class="top-nav">
    <div class="nav-container">
      <div class="logo-section">
        <div class="avatar"></div>
        <span class="brand-name">Fit&Mind</span>
      </div>

      <nav class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
        <router-link to="/" class="nav-link">HOME</router-link>
        <router-link to="/dashboard" class="nav-link">PROFILE</router-link>
        <router-link to="/contact" class="nav-link">CONTACT</router-link>
      </nav>

      <div class="nav-actions">
        <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
          ☰
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainNavbar',
  data() {
    return {
      mobileMenuOpen: false
    }
  }
}
</script>

<style scoped>
.top-nav {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
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

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #974f39, #f18213);
}

.brand-name {
  font-weight: 700;
  font-size: 1.2rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  font-weight: 600;
  color: #555;
  text-decoration: none;
}

.nav-link.router-link-active {
  color: #f18213;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
}
</style>
