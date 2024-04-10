<template>
    <div class="form-group mt-3">
        <label :for="id" class="form-label">{{ label }}:</label>
        <input :id="id" :value="modelValue" @input="updateValue" :type="type" class="form-control" :required="required" />
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
        },
    },
}
</script>
