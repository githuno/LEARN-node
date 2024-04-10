<template>
    <div class="mb-3">
        <div class="form-group">
            <label for="date" class="form-label">年月:</label>
            <input id="date" :value="experience.date" @input="updateExperience('date', $event.target.value)" type="month" class="form-control" />
        </div>
        <div class="form-group">
            <label for="industry" class="form-label">業種／職種:</label>
            <input id="industry" :value="experience.industry" @input="updateExperience('industry', $event.target.value)" type="text" class="form-control" />
        </div>
        <div class="form-group">
            <label for="description" class="form-label">業務内容:</label>
            <textarea id="description" :value="experience.description" @input="updateExperience('description', $event.target.value)" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label for="tools" class="form-label">ツール類:</label>
            <input id="tools" :value="experience.tools" @input="updateExperience('tools', $event.target.value)" type="text" class="form-control" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserExperience',
    props: ['experience'],
    methods: {
        updateExperience(key, value) {
            this.$emit('update:experience', { ...this.experience, [key]: value });
        },
    },
}
</script>
