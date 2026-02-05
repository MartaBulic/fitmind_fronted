<template>
  <div>
    <h3>Dodaj cilj</h3>
    <form @submit.prevent="addGoal">
      <input v-model="goalType" placeholder="Goal Type" required />
      <input v-model="targetWeight" type="number" placeholder="Target Weight" />
      <input v-model="activityLevel" placeholder="Activity Level" />
      <button type="submit">Dodaj</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      goalType: '',
      targetWeight: '',
      activityLevel: ''
    }
  },
  methods: {
    async addGoal() {
      try {
        await api.post('/goals', {
          goalType: this.goalType,
          targetWeight: this.targetWeight,
          activityLevel: this.activityLevel
        });
        this.goalType = '';
        this.targetWeight = '';
        this.activityLevel = '';
        this.$emit('goalAdded'); // obavijesti dashboard da osvježi listu
      } catch (err) {
        console.error(err.response?.data);
      }
    }
  }
}
</script>
