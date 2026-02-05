<template>
  <div>
    <h3>Moji ciljevi</h3>
    <ul>
      <li v-for="goal in goals" :key="goal.id">
        {{ goal.goalType }} - {{ goal.targetWeight || '-' }} kg - {{ goal.activityLevel || '-' }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['goals']
}
</script>
