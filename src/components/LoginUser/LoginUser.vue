<template>
	<li @click="loginHandler" :data-id="user.id" :data-name="user.name">
		<div class="users_profile">
			<img :src="user.profile" alt="user-profile" />
		</div>
		<div class="users_preview">
			<div class="users_preview_name">{{ user.name }}</div>
			<div class="users_preview_message">Click here for login as {{ user.name }} 🍩</div>
		</div>
		<div class="users_noti">
			<FontAwesomeIcon :icon="['fas', 'sign-in-alt']" size="lg" color="var(--primary)" />
		</div>
	</li>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { User } from '@/views/Home/typings';

export default Vue.extend({
	name: 'LoginUser',

	props: {
		user: {
			type: Object as PropType<User>,
			default: null,
		},

		loginHandler: {
			type: Function as PropType<() => void>,
			default: null,
		},
	},
});
</script>

<style src="./LoginUser.scss" lang="scss" scoped />
