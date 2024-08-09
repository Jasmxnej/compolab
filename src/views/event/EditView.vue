<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
    event: Event
    id: String
}>()

const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const edit = () => {
  // Update the message in the store
  store.updateMessage('The data has been updated successfully')

  // Set a timeout to clear the message after 3 seconds
  setTimeout(() => {
    store.resetMessage()
  }, 3000)

  // Navigate to the event detail view
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>

<template>
   <p class="font-bold mt-5">Edit event here</p>
   <button @click="edit" class="font-bold mt-5 bg-gray-500 text-white py-2 px-4 rounded">Edit</button>
</template>
