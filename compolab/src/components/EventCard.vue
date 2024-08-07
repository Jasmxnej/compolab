<script setup lang="ts">
import { Event } from '@/types'
defineProps<{
  event: Event
}>()
// const event = ref ({
//   id: 5928101,
//   category: 'animal welfare',
//   title: 'Cat Adoption Day',
//   descriptiion:'Find your new feline friend at this event.',
//   location: 'Meow Town',
//   date: 'January 28, 2022',
//   time: '12:00',
//   petsAllowed: true,
//   organizer: 'Kat Laydee'
// })
</script>

<template>
  <RouterLink class="event-link" :to="{name: 'event-detail-view', params: { id: event.id }}">
     <div class="event-card">
      <h2 v-if="event.id !== 12345">{{  event.title }}</h2>
      <span  v-if="event.id !== 12345">@{{ event.time }} on {{ event.date }}</span>
     
      <div v-if="event.id === 12345" class="event-details">
        <div class="category">{{ event.category }}</div>
        <div class="organizer">{{ event.organizer }}</div>
      </div>
    </div>
  </RouterLink>

</template>

  <style scoped>
  .event-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
  }
  .event-card:hover{
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0,0,0,0.2);
  }

  .event-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 16px; 
  }

  .event-link{
    text-decoration: none;
    color: #2c3e50;
  }
 
  </style>

