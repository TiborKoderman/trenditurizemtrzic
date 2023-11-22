<template>
    <div class="dropdown-pill">
        <div class="dropdown-pill__label">
        <slot name="label"></slot>
        </div>
        <div class="dropdown-pill__content">
        <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropdownPill',
    props: {
        label: {
            type: String,
            required: true
        }
    }
}
</script>

<style>
.dropdown-pill {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.dropdown-pill__label {
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.dropdown-pill__content {
    display: flex;
    flex-wrap: wrap;
}

.dropdown-pill__content > * {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
}

.dropdown-pill__content > *:last-child {
    margin-right: 0;
}



</style>