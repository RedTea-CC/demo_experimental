<template>
    <div class="fileName">
        <div class="over" ref="fileName">{{ file?.name.split('pd')[0] }}</div>
        <div :style="isOver ? ' margin-left: -5px' : ''">pdf</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const fileName = ref<HTMLElement>();
const isOver = ref(false);
onMounted(() => {
    if (fileName.value) {
        if (fileName.value.scrollWidth > fileName.value.clientWidth) {
            // console.log('文本超出隐藏了');
            isOver.value = true;
        } else {
            // console.log('文本未超出隐藏');
            isOver.value = false;
        }
    }
});
</script>

<style lang="scss" scoped></style>