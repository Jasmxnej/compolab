<script setup lang="ts">
import { type Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <RouterLink :to="{ name: 'event-detail-view', params: { id: event.id } }" class="no-underline text-gray-800">
    <!---------lab5-
cursor-pointer: เปลี่ยนเคอร์เซอร์เป็นรูปมือเมื่อวางเมาส์เหนือองค์ประกอบ เพื่อบอกว่าสามารถคลิกได้
border: เพิ่มเส้นขอบรอบๆ องค์ประกอบ
border-gray-600: ตั้งค่าสีของเส้นขอบเป็นสีเทาเข้มระดับกลาง
p-4: เพิ่มระยะห่างจากขอบด้านในขององค์ประกอบทั้งหมด 1rem (16px)
w-64: ตั้งค่าความกว้างขององค์ประกอบเป็น 16rem (256px)
mb-6: เพิ่มระยะห่างจากขอบด้านล่างขององค์ประกอบ 1.5rem (24px)
hover:scale-101: ขยายองค์ประกอบเล็กน้อยถึง 101% ของขนาดเดิมเมื่อวางเมาส์เหนือ
hover:shadow-sp: เพิ่มเงาแบบกำหนดเอง (น่าจะเป็น utility shadow-sp ที่กำหนดไว้ใน Tailwind plugin) เมื่อวางเมาส์เหนือองค์ประกอบ
------------------>
    <div class="cursor-pointer border border-gray-600 p-5 w-[250px] mb-4 hover:scale-[1.01] hover:shadow-sp transition-transform">
      <h2 v-if="event.id !== 12345">{{ event.title }}</h2>
      <span v-if="event.id !== 12345">@{{ event.time }} on {{ event.date }}</span>
     
      <div v-if="event.id === 12345" class="flex flex-col items-end text-base">
        <div>{{ event.category }}</div>
        <div>{{ event.organizer }}</div>
      </div>
    </div>
  </RouterLink>
</template>
