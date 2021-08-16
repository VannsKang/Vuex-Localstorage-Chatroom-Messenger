<template>
	<section class="noti">
		<div class="noti_telInfo">
			<div class="noti_telInfo_carrier">
				<span class="noti_telInfo_carrier_bar">
					<FontAwesomeIcon :icon="['fas', 'signal']" size="xs" color="white" />
				</span>
				<span class="noti_telInfo_carrier_title">Carrier</span>
			</div>
			<div class="noti_telInfo_carrier_wifi">
				<FontAwesomeIcon :icon="['fas', 'wifi']" size="xs" color="white" />
			</div>
		</div>
		<div class="noti_time">
			<span>{{ time }}</span>
		</div>
		<div class="noti_phoneInfo">
			<FontAwesomeIcon :icon="['fas', 'lock']" size="xs" color="white" />
			<FontAwesomeIcon :icon="['fas', 'location-arrow']" size="xs" color="white" />
			<FontAwesomeIcon :icon="['fas', 'stopwatch']" size="xs" color="white" />
			<FontAwesomeIcon :icon="['fab', 'bluetooth-b']" size="xs" color="white" />
			<span class="noti_phoneInfo_batteryview"> {{ batteryRate }}% </span>
			<FontAwesomeIcon :icon="['fas', 'battery-half']" color="white" />
		</div>
	</section>
</template>

<script lang="ts">
import format from 'date-fns/format';
import Vue from 'vue';

export default Vue.extend({
	name: 'Notibar',

	computed: {
		time(): string {
			return format(new Date(), 'h:mm a');
		},

		batteryRate(): number {
			return Math.floor(Math.random() * 100);
		},
	},
});
</script>

<style src="./Notibar.scss" lang="scss" scoped />
