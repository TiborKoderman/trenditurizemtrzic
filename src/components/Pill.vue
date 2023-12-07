<template>
    <div class="pill" :class="{selected: isSelected}">
        {{ text }}
    </div>
</template>

<script>
export default {
    name: 'Pill',
    props: {
        text: String,
        isSelected: Boolean,
    },
    data() {
        return {
        };
    },
    methods: {
    }
}
</script>

<style>
.pill {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    background-color: azure;
    color: #333;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
}
.pill:hover {
    background-color: #e5ffdd;
    cursor: pointer;
}

.pill.selected {
    background-color: #b7dbad;
    color: #000;
}
</style>