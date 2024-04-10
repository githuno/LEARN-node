<template>
	<div class="container py-5">
		<form @submit.prevent="submitForm" class="needs-validation" novalidate>
            <InputField id="name" label="名前" v-model="form.name" required />
            <InputField id="kana" label="フリガナ" v-model="form.kana" />
            <InputField id="birthDate" label="生年月日" v-model="form.birthDate" type="date" />
            <InputField id="postalCode" label="郵便番号" v-model="form.postalCode" />
            <InputField id="address" label="現住所" v-model="form.address" />
			<div class="form-group mt-3">
				<label class="form-label">性別:</label>
				<div class="d-flex">
					<div class="form-check mr-3">
						<input class="form-check-input" id="male" v-model="form.gender" type="radio" value="男" />
						<label class="form-check-label" for="male">男</label>
					</div>
					<div class="form-check mr-3">
						<input class="form-check-input" id="female" v-model="form.gender" type="radio" value="女" />
						<label class="form-check-label" for="female">女</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" id="other" v-model="form.gender" type="radio" value="その他" />
						<label class="form-check-label" for="other">その他</label>
					</div>
				</div>
			</div>
			<div class="form-group mt-3">
				<label for="phone" class="form-label">電話番号:</label>
				<input id="phone" v-model="form.phone" type="tel" class="form-control" />
			</div>
			<div class="form-group mt-3">
				<label for="email" class="form-label">メールアドレス:</label>
				<input id="email" v-model="form.email" type="email" class="form-control" />
			</div>
			<div class="form-group mt-3">
				<label for="motivation" class="form-label">志望動機:</label>
				<textarea id="motivation" v-model="form.motivation" class="form-control"></textarea>
			</div>
			<div class="form-group mt-3">
				<label for="selfPr" class="form-label">自己PR:</label>
				<textarea id="selfPr" v-model="form.selfPr" class="form-control"></textarea>
			</div>
			<div class="form-group mt-3">
				<div v-for="(experience, index) in form.experiences" :key="index"
					class="flex-column align-items-center mb-3">
					<div class="d-flex align-items-center justify-content-between">
						<label class="form-label mr-3">資格・経験{{ index + 1 }}</label>
						<button type="button" class="btn btn-danger ml-3" @click="removeExperience(index)">
							<i class="bi bi-dash"></i>
						</button>
					</div>
					<UserExperience :experience="experience" class="flex-grow" />
				</div>
				<div class="d-flex justify-content-end">
					<button type="button" class="btn btn-primary mt-3" @click="addExperience">
						<i class="bi bi-plus"></i>
					</button>
				</div>
			</div>
			<button type="submit" class="btn btn-primary mt-3">作成</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import UserExperience from './components/UserExperience.vue';
import InputField from './components/InputField.vue';

export default {
	components: {
		UserExperience,
        InputField,
	},
	data() {
		return {
			form: {
				name: '',
				kana: '',
				birthDate: '',
				postalCode: '',
				address: '',
				gender: '',
				phone: '',
				email: '',
				motivation: '',
				experiences: [
					{
						date: '',
						industry: '',
						description: '',
						tools: '',
					},
				],
			}
		}
	},
	methods: {
		async submitForm() {
			try {
				const response = await axios.post('https://your-api-url.com', this.form);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		},
		addExperience() {
			this.form.experiences.push({
				date: '',
				industry: '',
				description: '',
				tools: '',
			});
		},
		removeExperience(index) {
			this.form.experiences.splice(index, 1);
		},
	}
}
</script>
