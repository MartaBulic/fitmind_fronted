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
    <!-- Main Layout -->
    <div class="main-layout">
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ 'mobile-open': sidebarOpen }">
        <div class="sidebar-header">
          <h3>MY GOALS</h3>
          <button class="refresh-btn" @click="fetchGoals" title="Refresh goals">🔄</button>
          <button class="close-sidebar" @click="sidebarOpen = false">✕</button>
        </div>
        <div class="goals-list">
          <div v-for="goal in goals" :key="goal.id" class="goal-item">
            <div class="goal-info">
              <strong>{{ goal.goalType }}</strong>
              <div class="goal-details">
                <span class="goal-badge">🎯 {{ goal.targetWeight }}kg</span>
                <span class="activity-badge">💪 {{ goal.activityLevel }}</span>
              </div>
            </div>
            <div class="goal-actions">
              <button @click="deleteGoal(goal.id)" class="icon-btn delete" title="Delete">🗑</button>
            </div>
          </div>
          <div v-if="goals.length === 0" class="empty-state">
            <span class="empty-icon">🎯</span>
            <p>No goals yet. Add your first goal!</p>
          </div>
        </div>
        <button class="add-goal-btn" @click="showAddGoal = true">
          <span class="btn-icon">➕</span>
          Add New Goal
        </button>
      </aside>

      <!-- Main Content -->
      <main class="content-area">
        <button class="mobile-sidebar-toggle" @click="sidebarOpen = true">
          <span>🎯</span> My Goals
        </button>
        <div class="dashboard-content">
          <!-- Welcome Section -->
          <div class="welcome-section">
            <h1>User Dashboard</h1>
            <p class="welcome-text">Welcome back, <strong>{{ user.name }}</strong>! 🎯</p>
          </div>

          <!-- Stats Grid -->
          <div class="stats-grid">
            <div class="stat-card goals-card">
              <div class="stat-icon">🎯</div>
              <h3>{{ goals.length }}</h3>
              <p>Active Goals</p>
            </div>

            <div class="stat-card plans-card">
              <div class="stat-icon">📋</div>
              <h3>{{ mealPlans.length }}</h3>
              <p>Meal Plans</p>
            </div>
          </div>

          <!-- MEAL PLANS SECTION -->
          <div class="meal-plans-section">
            <div class="section-header">
              <h2>📋 My Meal Plans</h2>
              <button @click="fetchMealPlans" class="refresh-btn" title="Refresh plans">🔄</button>
            </div>
            
            <div v-if="mealPlans.length > 0" class="meal-plans-list">
              <div v-for="plan in mealPlans" :key="plan.id" class="meal-plan-card">
                <div class="plan-header">
                  <h3>{{ plan.goal_type || 'General Plan' }}</h3>
                  <span class="plan-date">{{ formatDate(plan.created_at) }}</span>
                </div>
                <div class="plan-content">
                  <p class="plan-from">
                    <span class="from-icon">👨‍⚕️</span>
                    <strong>From:</strong> {{ plan.nutritionist?.name || 'Nutritionist' }}
                  </p>
                  <div class="plan-notes">
                    <strong>📝 Plan Details:</strong>
                    <p>{{ plan.notes }}</p>
                  </div>
                  <div v-if="plan.daily_calories" class="plan-calories">
                    <span class="calories-icon">🔥</span>
                    <strong>Daily Calories:</strong> {{ plan.daily_calories }} kcal
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="empty-state-plans">
              <div class="empty-icon-large">🥗</div>
              <p>No meal plans yet. Your nutritionist will create one for you!</p>
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

    <!-- Add Goal Modal -->
    <div v-if="showAddGoal" class="modal-overlay" @click="cancelGoal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>🎯 Add New Goal</h2>
        </div>
        <form @submit.prevent="saveGoal">
          <div class="form-group">
            <label for="goalType">
              <span class="label-icon">🎯</span>
              Goal Type
            </label>
            <select id="goalType" v-model="newGoal.goalType" required>
              <option value="">-- Select Goal --</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Weight Gain">Weight Gain</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Muscle Building">Muscle Building</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="targetWeight">
              <span class="label-icon">⚖️</span>
              Target Weight (kg)
            </label>
            <input
              id="targetWeight"
              v-model.number="newGoal.targetWeight"
              type="number"
              step="0.1"
              placeholder="e.g., 70"
              required
            />
          </div>

          <div class="form-group">
            <label for="activityLevel">
              <span class="label-icon">💪</span>
              Activity Level
            </label>
            <select id="activityLevel" v-model="newGoal.activityLevel" required>
              <option value="">-- Select Activity --</option>
              <option value="sedentary">Sedentary (little/no exercise)</option>
              <option value="light">Light (1-3 days/week)</option>
              <option value="moderate">Moderate (3-5 days/week)</option>
              <option value="active">Active (6-7 days/week)</option>
              <option value="very_active">Very Active (2x per day)</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="button" @click="cancelGoal" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary">
              <span>💾</span>
              Save Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'UserDashboard',

  data() {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    return {
      user,

      // goals from backend
      goals: [],
      showAddGoal: false,
      newGoal: {
        goalType: '',
        targetWeight: '',
        activityLevel: ''
      },

      // meal plans from backend
      mealPlans: [],

      // layout
      mobileMenuOpen: false,
      sidebarOpen: false,
    }
  },

  mounted() {
    this.fetchGoals()
    this.fetchMealPlans()
  },

  methods: {
    // ================= AUTH =================
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/')
    },

    // ================= GOALS =================
    async fetchGoals() {
      try {
        const res = await api.get('/goals')
        this.goals = res.data || []
        console.log('Goals loaded:', this.goals)
      } catch (err) {
        console.error('Error fetching goals:', err)
        if (err.response?.status === 401) {
          alert('Session expired. Please login again.')
        }
      }
    },

    async saveGoal() {
      if (!this.newGoal.goalType || !this.newGoal.targetWeight || !this.newGoal.activityLevel) {
        alert('Please fill all fields!')
        return
      }

      try {
        await api.post('/goals', {
          goalType: this.newGoal.goalType,
          targetWeight: this.newGoal.targetWeight,
          activityLevel: this.newGoal.activityLevel
        })
        
        alert('Goal added successfully! ✅')
        await this.fetchGoals() // Refresh goals
        this.cancelGoal()
      } catch (err) {
        console.error('Error saving goal:', err)
        alert('Failed to save goal: ' + (err.response?.data?.message || err.message))
      }
    },

    async deleteGoal(goalId) {
      if (!confirm('Are you sure you want to delete this goal?')) return

      try {
        await api.delete(`/goals/${goalId}`)
        alert('Goal deleted! ✅')
        await this.fetchGoals() // Refresh goals
      } catch (err) {
        console.error('Error deleting goal:', err)
        alert('Failed to delete goal: ' + (err.response?.data?.message || err.message))
      }
    },

    cancelGoal() {
      this.showAddGoal = false
      this.newGoal = {
        goalType: '',
        targetWeight: '',
        activityLevel: ''
      }
    },

    // ================= MEAL PLANS =================
    async fetchMealPlans() {
      try {
        const res = await api.get('/meal-plans/my')
        this.mealPlans = res.data || []
        console.log('Meal plans loaded:', this.mealPlans)
      } catch (err) {
        console.error('Error fetching meal plans:', err)
        this.mealPlans = []
      }
    },

    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
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
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  padding: 2rem 2rem 2rem 8rem;
  min-height: calc(100vh - 72px);
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: 350px;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  height: fit-content;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 88px;
  margin-left: 2rem;
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
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.goal-item {
  padding: 1rem;
  border-radius: 12px;
  background: #f9fafb;
  border: 2px solid transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.goal-item:hover {
  background: #fff5f0;
  border-color: #ffe8dc;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(241, 130, 19, 0.1);
}

.goal-info {
  flex: 1;
}

.goal-info strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.goal-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.goal-badge,
.activity-badge {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  width: fit-content;
}

.goal-badge {
  background: #ffe8dc;
  color: #974f39;
}

.activity-badge {
  background: #e0f2fe;
  color: #0369a1;
}

.goal-actions {
  display: flex;
  gap: 0.25rem;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: #fee2e2;
  transform: scale(1.1);
}

.icon-btn.delete:hover {
  background: #fee2e2;
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

.empty-state p {
  font-size: 0.9rem;
  color: #6b7280;
}

.add-goal-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.add-goal-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(241, 130, 19, 0.4);
}

.btn-icon {
  font-size: 1.1rem;
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

/* ===== MEAL PLANS SECTION ===== */
.meal-plans-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.6rem;
  font-weight: 700;
}

.meal-plans-list {
  display: grid;
  gap: 1.5rem;
}

.meal-plan-card {
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.75rem;
  transition: all 0.3s ease;
}

.meal-plan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  border-color: #ffe8dc;
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
}

.plan-header h3 {
  margin: 0;
  color: #f18213;
  font-size: 1.3rem;
  font-weight: 700;
}

.plan-date {
  color: #9ca3af;
  font-size: 0.85rem;
  font-weight: 600;
  background: #f3f4f6;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
}

.plan-content {
  color: #2c3e50;
}

.plan-from {
  margin: 0 0 1.25rem 0;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.from-icon {
  font-size: 1.2rem;
}

.plan-notes {
  background: linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%);
  padding: 1.25rem;
  border-radius: 12px;
  border-left: 4px solid #f18213;
  margin-bottom: 1rem;
}

.plan-notes strong {
  display: block;
  margin-bottom: 0.75rem;
  color: #974f39;
  font-size: 1rem;
}

.plan-notes p {
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.7;
  color: #2c3e50;
}

.plan-calories {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  color: #f18213;
  font-weight: 600;
  border: 2px solid #ffe8dc;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.calories-icon {
  font-size: 1.3rem;
}

.empty-state-plans {
  text-align: center;
  padding: 4rem 2rem;
  color: #9ca3af;
}

.empty-icon-large {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.empty-state-plans p {
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

/* ===== MODAL ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  max-width: 550px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-content h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.6rem;
  font-weight: 700;
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

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f9fafb;
  font-weight: 500;
  color: #2c3e50;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #f18213;
  background: white;
  box-shadow: 0 0 0 3px rgba(241, 130, 19, 0.1);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-secondary, .btn-primary {
  padding: 0.9rem 1.75rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.btn-secondary {
  background: #f3f4f6;
  color: #6b7280;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, #974f39 0%, #f18213 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(241, 130, 19, 0.4);
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
    padding-left: 1rem;
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

  .modal-content {
    padding: 1.5rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .btn-secondary, .btn-primary {
    width: 100%;
    justify-content: center;
  }
}
</style>