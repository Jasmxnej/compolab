<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRoute, useRouter } from 'vue-router' 

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value) 
  return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const page = computed(()=> props.page)

const route = useRoute()
const router = useRouter()
const pageSize = ref(Number(route.query.pageSize) || 2)

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(pageSize.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = parseInt(response.headers['x-total-count'])
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})

function updatePageSize(size: number) { 
  pageSize.value = size
  router.push({
    name: 'event-list-view',
    query: {
      ...route.query,
      pageSize: pageSize.value,
      page: 1, 
    },
  })
}

const specificEventId = 12345
</script>

<template>
  <h1 class="mb-5">Events For Good</h1>
  
  <div class="flex justify-center items-center mb-5">
    <label for="page-size" class="mr-2">Events per page:</label>
    <select id="page-size" v-model="pageSize" @change="updatePageSize(pageSize)" class="p-1 border rounded">
      <option v-for="n in totalEvents" :key="n" :value="n">{{ n }}</option>
    </select>
  </div>
  
  <div class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <EventDetails :events="events" :eventId="specificEventId" />
  </div>
  
  <div class="flex w-[290px] mx-auto mt-5">
    <RouterLink
      id="page-prev"
      :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: pageSize } }" 
      rel="prev"
      v-if="page != 1"
      class="flex-1 text-left text-[#2c3e50] no-underline"
    >
      &#60; Prev Page
    </RouterLink>

    <RouterLink
      id="page-next"
      :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: pageSize } }" 
      rel="next"
      v-if="hasNextPage"
      class="flex-1 text-right text-[#2c3e50] no-underline"
    >
      Next Page &#62;
    </RouterLink>
  </div>
</template>

<!-- <style scoped>
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
</style> -->
