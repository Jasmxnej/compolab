<script setup lang="ts">
import { defineProps } from 'vue';
import type { Student } from '@/types';

defineProps<{
  student: Student
}>();
</script>

<template>
  <div class="p-5 w-64 border border-gray-700 mb-4 text-center hover:scale-105 hover:shadow-lg transition-transform duration-150 ease-in-out">
    <h2>{{ student.name }} {{ student.surname }}</h2>
    <p>GPA : {{ student.gpa }}</p>
  </div>
</template>

  <!-- <style scoped>
  .student-card {
    padding: 20px;
    width: 250px;
    border: 1px solid #39495c;
    margin-bottom: 18px;
    text-align: center;
  }
  .student-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  }
  </style> -->
  