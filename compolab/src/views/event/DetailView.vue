<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import {type Event} from '@/types'

const props = defineProps<{
    event: Event
    id: String
}>()
const { event } = toRefs(props)
</script>

<template>
  <p class="font-bold mt-5">{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p class="font-bold mt-5">{{ event.description }}</p>
</template>
