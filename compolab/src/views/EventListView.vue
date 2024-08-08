<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRoute, useRouter } from 'vue-router' 


const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
const totalPages = Math.ceil(totalEvents.value / pageSize.value) // Updated
return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const page = computed(()=> props.page)

const route = useRoute()  // Added
const router = useRouter() // Added
const pageSize = ref(Number(route.query.pageSize) || 2) // Updated


onMounted(() => {
  watchEffect(() => {
   
    EventService.getEvents(pageSize.value, page.value) // Updated
      .then((response) => {
        events.value = response.data
        totalEvents.value = parseInt(response.headers['x-total-count'])
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
      
  })
})

// Added function to handle page size change
function updatePageSize(size) { 
  pageSize.value = size
  router.push({
    name: 'event-list-view',
    query: {
      ...route.query,
      pageSize: pageSize.value,
      page: 1, // Reset to page 1 when page size changes
    },
  })
}


const specificEventId = 12345
</script>

<template>
  <h1>Events For Good</h1>
  <!-- added Page size selector -->
  <div class="page-size-selector">
    <label for="page-size">Events per page:</label>
    <select id="page-size" v-model="pageSize" @change="updatePageSize(pageSize)">
      <option v-for="n in totalEvents" :key="n" :value="n">{{ n }}</option> <!-- Updated to use totalEvents -->
    </select>
  </div>
  
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <EventDetails :events="events" :eventId="specificEventId" />
  </div>
  <div class="pagination">
    <RouterLink
      id="page-prev"
      :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: pageSize } }" 
      rel="prev"
      v-if="page != 1"
    > <!-- Updated -->
      &#60; Prev Page
    </RouterLink>

    <RouterLink
      id="page-next"
      :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: pageSize } }" 
      rel="next"
      v-if="hasNextPage"
    > <!-- Updated -->
      Next Page &#62;
    </RouterLink>
  </div>
</template>

<style scoped>
h1 { /* New style added */
  margin-bottom: 20px;
}


.page-size-selector { 
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.page-size-selector label {
  margin-right: 10px;
}


.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
  margin: 20px auto 0; /* Updated */
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
