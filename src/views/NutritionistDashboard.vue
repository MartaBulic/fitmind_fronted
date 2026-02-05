<template>
  <div class="dashboard-wrapper">
    <!-- Top Navigation Bar -->
    <header class="top-nav">
      <div class="nav-container">
        <div class="logo-section">
          <div class="avatar"></div>
          <span class="brand-name">Fit&Mind</span>
        </div>
        <nav class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
          <router-link to="/" class="nav-link">HOME</router-link>
          <router-link to="/nutritionist/dashboard" class="nav-link active">DASHBOARD</router-link>
          <router-link to="/contact" class="nav-link">CONTACT</router-link>
        </nav>
        <div class="nav-actions">
          <input type="search" placeholder="Search..." class="search-input" />
          <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">☰</button>
        </div>
      </div>
    </header>

    <!-- Main Layout -->
    <div class="main-layout">
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ 'mobile-open': sidebarOpen }">
        <div class="sidebar-header">
          <h3>USERS & GOALS</h3>
          <button class="refresh-btn" @click="fetchUsers" title="Refresh users">🔄</button>
          <button class="close-sidebar" @click="sidebarOpen = false">✕</button>
        </div>
        <div class="goals-list">
          <div v-for="u in users" :key="u.id" class="goal-item" :class="{ 'selected': u.id === selectedUserId }">
            <div>
              <strong>{{ u.name }}</strong>
              <div v-if="u.goals && u.goals.length > 0" class="user-goals">
                <ul>
                  <li v-for="g in u.goals" :key="g.id">
                    <span class="goal-badge">{{ g.goalType }}</span>
                    <span class="goal-weight">{{ g.targetWeight }}kg</span>
                  </li>
                </ul>
              </div>
              <div v-else class="no-goals">
                <em>No goals set</em>
              </div>
            </div>
          </div>
          <div v-if="users.length === 0" class="empty-state">
            <span class="empty-icon">👥</span>
            <p>No users found</p>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="content-area">
        <button class="mobile-sidebar-toggle" @click="sidebarOpen = true">
          <span>☰</span> Users & Goals
        </button>
        
        <div class="dashboard-content">
          <!-- Welcome Section -->
          <div class="welcome-section">
            <h1>Nutritionist Dashboard</h1>
            <p class="welcome-text">Welcome back, <strong>{{ user.name }}</strong>! 🥗</p>
          </div>

          <!-- Stats Grid -->
          <div class="stats-grid">
            <div class="stat-card users-card">
              <div class="stat-icon">👥</div>
              <h3>{{ users.length }}</h3>
              <p>Total Users</p>
            </div>
            <div class="stat-card plans-card">
              <div class="stat-icon">📋</div>
              <h3>{{ users.filter(u => u.goals && u.goals.length > 0).length }}</h3>
              <p>Active Plans</p>
            </div>
          </div>

          <!-- Nutrition Plan Card -->
          <div class="meal-plan-section">
            <div class="section-header">
              <h2>📝 Create Nutrition Plan</h2>
              <p>Select a user and create their personalized meal plan</p>
            </div>

            <div class="meal-plan-card">
              <div class="form-group">
                <label for="selectUser">
                  <span class="label-icon">👤</span>
                  Select User
                </label>
                <select id="selectUser" v-model="selectedUserId" @change="loadMealPlan" class="user-select">
                  <option value="">-- Choose a user --</option>
                  <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name }}</option>
                </select>
              </div>

              <div v-if="selectedUserId" class="meal-plan-form">
                <div class="selected-user-info" v-if="selectedUser">
                  <div class="user-badge">
                    <div class="user-avatar">{{ selectedUser.name.charAt(0) }}</div>
                    <div>
                      <p class="user-name">{{ selectedUser.name }}</p>
                      <div v-if="selectedUser.goals && selectedUser.goals.length > 0" class="user-goals-inline">
                        <span v-for="g in selectedUser.goals" :key="g.id" class="goal-tag">
                          {{ g.goalType }} • {{ g.targetWeight }}kg
                        </span>
                      </div>
                      <p v-else class="no-goals-text">No goals set</p>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="nutritionPlan">
                    <span class="label-icon">🥗</span>
                    Nutrition Plan
                  </label>
                  <textarea
                    id="nutritionPlan"
                    v-model="nutritionPlanLocal"
                    class="nutrition-textarea"
                    placeholder="Enter personalized nutrition plan..."
                  ></textarea>
                </div>
                
                <button @click="saveNutritionPlan" class="btn-primary">
                  <span class="btn-icon">💾</span>
                  Save Nutrition Plan
                </button>
              </div>

              <div v-else class="select-user-prompt">
                <div class="prompt-icon">👆</div>
                <p>Please select a user above to create or edit their nutrition plan</p>
              </div>
            </div>
          </div>

          <!-- Logout Button -->
          <div class="logout-section">
            <button @click="logout" class="logout-btn">
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NutritionistDashboard',
  data() {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return {
      user,
      mobileMenuOpen: false,
      sidebarOpen: false,
      users: [],
      selectedUserId: '',
      nutritionPlanLocal: '', // <-- lokalni model za textarea
    }
  },
  computed: {
    selectedUser() {
      if (!this.selectedUserId) return null
      return this.users.find(u => u.id === this.selectedUserId)
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
      this.$router.push('/')
    },

    async fetchUsers() {
      try {
        const res = await axios.get('/nutritionist/users-goals')
        this.users = res.data || []

        if (this.users.length > 0 && !this.selectedUserId) {
          this.selectedUserId = this.users[0].id
          await this.loadMealPlan()
        }
        
        if (this.selectedUserId && this.users.find(u => u.id === this.selectedUserId)) {
          await this.loadMealPlan()
        }
      } catch (err) {
        console.error('Error fetching users:', err)
        alert('Failed to load users: ' + (err.response?.data?.message || err.message))
      }
    },

    async loadMealPlan() {
      if (!this.selectedUserId) {
        this.nutritionPlanLocal = ''
        return
      }
      
      try {
        const res = await axios.get(`/meal-plans/user/${this.selectedUserId}`)
        if (res.data.meal_plans && res.data.meal_plans.length > 0) {
          this.nutritionPlanLocal = res.data.meal_plans[0].notes || ''
        } else {
          this.nutritionPlanLocal = ''
        }
      } catch (err) {
        console.error('Error loading meal plan:', err)
        this.nutritionPlanLocal = ''
      }
    },

    async saveNutritionPlan() {
      if (!this.selectedUserId) {
        alert('Please select a user first!')
        return
      }

      if (!this.nutritionPlanLocal || this.nutritionPlanLocal.trim() === '') {
        alert('Please enter a nutrition plan!')
        return
      }

      try {
        await axios.post('/meal-plans', {
          user_id: this.selectedUserId,
          notes: this.nutritionPlanLocal,
          goal_type: 'General'
        })
        alert('✅ Nutrition plan saved successfully!')
        await this.loadMealPlan()
      } catch (err) {
        console.error('Error saving meal plan:', err)
        alert('Failed to save meal plan: ' + (err.response?.data?.message || err.message))
      }
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

.dashboard-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
}

/* ===== TOP NAVIGATION ===== */
.top-nav {
  background: white;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #e8ecf1;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
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

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  box-shadow: 0 2px 8px rgba(241, 130, 19, 0.3);
}

.brand-name {
  font-weight: 700;
  font-size: 1.3rem;
  color: #2c3e50;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #f18213;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #974f39, #f18213);
  border-radius: 2px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-input {
  padding: 0.6rem 1.2rem;
  border: 2px solid #e5e7eb;
  border-radius: 24px;
  width: 200px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background: #f9fafb;
}

.search-input:focus {
  outline: none;
  border-color: #f18213;
  width: 260px;
  background: white;
  box-shadow: 0 2px 8px rgba(241, 130, 19, 0.15);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #2c3e50;
}

/* ===== MAIN LAYOUT ===== */
.main-layout {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  min-height: calc(100vh - 72px);
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: 320px;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  height: fit-content;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  position: sticky;
  top: 88px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
}

.sidebar-header h3 {
  font-size: 0.8rem;
  color: #9ca3af;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
  flex: 1;
}

.refresh-btn {
  background: linear-gradient(135deg, #f18213 0%, #974f39 100%);
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.4rem;
  transition: all 0.3s ease;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.refresh-btn:hover {
  transform: rotate(180deg);
  box-shadow: 0 4px 12px rgba(241, 130, 19, 0.3);
}

.close-sidebar {
  display: none;
}

.goals-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.goal-item {
  padding: 1rem;
  border-radius: 12px;
  background: #f9fafb;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.goal-item:hover {
  background: #fff5f0;
  border-color: #ffe8dc;
  transform: translateX(4px);
}

.goal-item.selected {
  background: linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%);
  border-color: #f18213;
  box-shadow: 0 2px 8px rgba(241, 130, 19, 0.15);
}

.goal-item strong {
  color: #2c3e50;
  font-size: 0.95rem;
  display: block;
  margin-bottom: 0.5rem;
}

.user-goals ul {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
}

.user-goals li {
  font-size: 0.85rem;
  color: #6b7280;
  padding: 0.4rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.goal-badge {
  background: #ffe8dc;
  color: #974f39;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.75rem;
}

.goal-weight {
  font-weight: 600;
  color: #f18213;
}

.no-goals {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #9ca3af;
  font-style: italic;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #9ca3af;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
  opacity: 0.5;
}

.mobile-sidebar-toggle {
  display: none;
}

/* ===== MAIN CONTENT ===== */
.content-area {
  flex: 1;
  min-width: 0;
}

.dashboard-content {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  max-width: 900px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f3f4f6;
}

.dashboard-content h1 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.welcome-text {
  color: #6b7280;
  font-size: 1.1rem;
}

.welcome-text strong {
  color: #f18213;
  font-weight: 600;
}

/* ===== STATS GRID ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%);
  padding: 1.75rem;
  border-radius: 16px;
  text-align: center;
  border: 2px solid #ffe0d1;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(241, 130, 19, 0.2);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.stat-card h3 {
  font-size: 2.5rem;
  color: #f18213;
  margin: 0.5rem 0;
  font-weight: 700;
}

.stat-card p {
  color: #6b7280;
  margin: 0;
  font-weight: 600;
  font-size: 0.9rem;
}

/* ===== MEAL PLAN SECTION ===== */
.meal-plan-section {
  margin-bottom: 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.6rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.section-header p {
  color: #6b7280;
  font-size: 0.95rem;
}

.meal-plan-card {
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  padding: 2rem;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.95rem;
}

.label-icon {
  font-size: 1.2rem;
}

.user-select {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #2c3e50;
}

.user-select:focus {
  outline: none;
  border-color: #f18213;
  box-shadow: 0 0 0 3px rgba(241, 130, 19, 0.1);
}

.selected-user-info {
  background: linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #f18213;
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(241, 130, 19, 0.3);
}

.user-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.user-goals-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.goal-tag {
  background: white;
  color: #974f39;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid #ffe0d1;
}

.no-goals-text {
  font-size: 0.9rem;
  color: #9ca3af;
  font-style: italic;
}

.nutrition-textarea {
  width: 100%;
  min-height: 220px;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  resize: vertical;
  font-size: 0.95rem;
  color: #2c3e50;
  background: white;
  font-family: inherit;
  line-height: 1.6;
  transition: all 0.3s ease;
}

.nutrition-textarea:focus {
  outline: none;
  border-color: #f18213;
  box-shadow: 0 0 0 3px rgba(241, 130, 19, 0.1);
}

.nutrition-textarea::placeholder {
  color: #9ca3af;
}

.btn-primary {
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(241, 130, 19, 0.4);
}

.btn-icon {
  font-size: 1.2rem;
}

.select-user-prompt {
  text-align: center;
  padding: 3rem 2rem;
  color: #9ca3af;
}

.prompt-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.select-user-prompt p {
  font-size: 1rem;
  color: #6b7280;
}

/* ===== LOGOUT SECTION ===== */
.logout-section {
  text-align: center;
  padding-top: 2rem;
  border-top: 2px solid #f3f4f6;
}

.logout-btn {
  padding: 0.9rem 2.5rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 968px) {
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 280px;
    background: white;
    flex-direction: column;
    padding: 4rem 2rem;
    box-shadow: -4px 0 20px rgba(0,0,0,0.15);
    transition: right 0.3s ease;
    z-index: 999;
  }

  .nav-links.mobile-open {
    right: 0;
  }

  .mobile-menu-btn {
    display: block;
  }

  .search-input {
    width: 160px;
  }

  .search-input:focus {
    width: 180px;
  }

  .main-layout {
    padding: 1rem;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: -100%;
    height: 100vh;
    width: 300px;
    max-height: 100vh;
    z-index: 999;
    transition: left 0.3s ease;
    border-radius: 0;
  }

  .sidebar.mobile-open {
    left: 0;
    box-shadow: 4px 0 20px rgba(0,0,0,0.15);
  }

  .close-sidebar {
    display: block;
    background: none;
    border: none;
    font-size: 1.8rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-sidebar-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    padding: 0.9rem 1.2rem;
    background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
    justify-content: center;
  }

  .dashboard-content {
    padding: 1.5rem;
  }

  .dashboard-content h1 {
    font-size: 1.8rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0.75rem 1rem;
  }

  .brand-name {
    font-size: 1.1rem;
  }

  .search-input {
    display: none;
  }

  .dashboard-content {
    padding: 1.25rem;
  }

  .dashboard-content h1 {
    font-size: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.3rem;
  }
  
  .meal-plan-card {
    padding: 1.5rem;
  }
}
</style>