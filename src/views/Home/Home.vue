<template>
	<main class="users">
		<ul>
			<LoginUser v-for="user in users" :user="user" :loginHandler="loginHandler" :key="user.id" />
		</ul>
	</main>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { mapActions, mapState } from 'vuex';
import { LoginUser } from '@/components';
import { UserState, User, Logined } from '@/views/Home/typings';

interface VuexBindings {
	users: User[];
	loadUserData: () => Promise<void>;
	updateLoginedAction: (payload: Logined) => void;
	loginHandler: () => void;
}

export default (Vue as VueConstructor<Vue & VuexBindings>).extend({
	name: 'Home',

	components: { LoginUser },

	computed: {
		...mapState('userReducer', {
			users: (state) => (state as UserState).users,
		}),
	},

	mounted() {
		this.loadUserData();
	},

	methods: {
		...mapActions('userReducer', ['loadUserData', 'updateLoginedAction']),

		loginHandler(e: MouseEvent): void {
			const selectedUser = e.currentTarget as HTMLLIElement;

			try {
				if (!selectedUser) throw new Error('Error: No valid user');

				const { id, name } = selectedUser.dataset;

				const loginUser = {
					id: parseInt(id as string),
					name,
				};

				// update globalstate
				this.updateLoginedAction(loginUser);

				// routing
				this.$router.push('/list');
			} catch (error) {
				console.error(error.message);
			}
		},
	},
});
</script>
