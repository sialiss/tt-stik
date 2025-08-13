<script setup>
	import { display_price } from "#imports"

	const thumbnailsImports = [
		import("../assets/images/thumbnails/fed986a1ae0540870eff072b34e28c9050e15f88.png"),
		import("../assets/images/thumbnails/8df10cbde9d255156782fb0e66cd29227b3ea563.png"),
		import("../assets/images/thumbnails/ea664da6f506a1efcf0b516aa65078587150d0e1.png"),
	]
	const relatedImports = [
		{
			img: import(
				"../assets/images/related/87c99caae07fa43a97378becd30cec251c29f7f2.png"
			),
			name: "ПЛАТЬЕ С V-ОБРАЗНЫМ ВЫРЕЗОМ, БЕЛЫЙ",
			price: {
				value: 8000,
				old_value: 14900,
				currency: "RUB",
			},
		},
		{
			img: import(
				"../assets/images/related/e05471ba89e5b6362046012a79f4ac0fe7b9dd6a.png"
			),
			name: "ЖАКЕТ ДВУБОРТНЫЙ, СЕРО-ГОЛУБОЙ",
			price: {
				value: 8900,
				currency: "RUB",
			},
		},
		{
			img: import(
				"../assets/images/related/bcf5fa302e2e9c17abccc82e0ca657284f9265c9.png"
			),
			name: "ПЛАТЬЕ МАКСИ С ЯРУСАМИ, БЕЛЫЙ",
			price: {
				value: 10500,
				currency: "RUB",
			},
		},
		{
			img: import(
				"../assets/images/related/1b9b53d8ad4733f1011310262b6f178172b85b1e.png"
			),
			name: "КОМБИНЕЗОН СО СТОЙКОЙ, ЧЁРНЫЙ",
			price: {
				value: 9500,
				currency: "RUB",
			},
		},
	]

	const thumbnails = ref([])
	const related = ref([])

	const product = {
		name: "Жакет удлинённый",
		color: "белый",
		price: {
			value: 8900,
			currency: "RUB",
		},
		sizes: [
			{ label: "XS", disabled: false, extra: "мало" },
			{ label: "S", disabled: false },
			{ label: "M", disabled: true, extra: "подписка" },
		],
		colors: [
			{ name: "белый", value: "#fff" },
			{ name: "черный", value: "#000" },
			{ name: "бежевый", value: "#F9F1DC" },
		],
	}

	let currentIndex = ref(0)
	let previewIndex = ref(null)

	const displayedImage = computed(() =>
		previewIndex.value !== null
			? thumbnails.value[previewIndex.value]
			: thumbnails.value[currentIndex.value]
	)

	function setImage(index) {
		currentIndex.value = index
	}

	function prevImage() {
		currentIndex.value =
			(currentIndex.value - 1 + thumbnails.value.length) % thumbnails.value.length
	}

	function nextImage() {
		currentIndex.value = (currentIndex.value + 1) % thumbnails.value.length
	}

	onMounted(async () => {
		const thumbsModules = await Promise.all(thumbnailsImports)
		thumbnails.value = thumbsModules.map(m => m.default)

		related.value = await Promise.all(
			relatedImports.map(async item => {
				const mod = await item.img
				return {
					img: mod.default,
					name: item.name,
					price: item.price,
				}
			})
		)
	})
</script>

<template>
	<div class="product-page">
		<section class="product-main">
			<div class="gallery">
				<div class="thumbnails">
					<img
						v-for="(img, i) in thumbnails"
						:key="i"
						:src="img"
						:class="{ active: i === currentIndex }"
						@mouseover="previewIndex = i"
						@mouseleave="previewIndex = null"
						@click="setImage(i)"
					/>
				</div>
				<div class="main-image">
					<button
						class="arrow-btn left"
						:class="{
							disabled: currentIndex === 0,
						}"
						@click="prevImage"
					>
						<img src="assets/images/icons/Arrow_left.svg" />
					</button>
					<div class="img-wrapper">
						<transition name="fade">
							<img
								class="product"
								:key="displayedImage"
								:src="displayedImage"
								alt="product"
							/>
						</transition>
					</div>

					<div class="image-indicators">
						<span
							v-for="(img, i) in thumbnails"
							:key="i"
							:class="{ active: i === currentIndex }"
							@click="setImage(i)"
						></span>
					</div>

					<button
						class="arrow-btn right"
						:class="{
							disabled: currentIndex === thumbnails.length - 1,
						}"
						@click="nextImage"
					>
						<img src="assets/images/icons/Arrow_right.svg" />
					</button>
				</div>
			</div>

			<div class="product-info">
				<div>
					<div class="title-row">
						<h1 class="title">
							{{ product.name + ", " + product.color }}
						</h1>
						<button class="mobile-fav">
							<img src="/assets/images/icons/Favorite.svg" />
						</button>
					</div>
					<h2 class="price">
						{{
							display_price(
								product.price.value,
								product.price.currency
							)
						}}
					</h2>
				</div>

				<div class="flex gap-s">
					<h3>Размеры</h3>
					<div class="sizes">
						<div
							class="size"
							v-for="size in product.sizes"
							:key="size"
						>
							<span :class="{ disabled: size.disabled }">
								{{ size.label }}
							</span>
							<p
								v-if="size.extra"
								:class="{ disabled: size.disabled }"
							>
								{{ size.extra }}
							</p>
						</div>
					</div>
				</div>

				<div class="colors flex gap-s">
					<h3>Цвет: {{ product.color }}</h3>
					<div class="available-colors">
						<div
							v-for="color in product.colors"
							:key="color.name"
							class="color"
							:class="{ selected: product.color === color.name }"
							:style="{ backgroundColor: color.value }"
						></div>
					</div>
				</div>

				<div class="actions">
					<button class="add-to-cart">ДОБАВИТЬ В КОРЗИНУ</button>
					<button class="fav-btn">
						<img src="/assets/images/icons/Favorite.svg" />
					</button>
				</div>

				<div class="extra-info">
					<details>
						<summary>Описание</summary>
						<p>описание...</p>
					</details>
					<details>
						<summary>Состав и уход</summary>
						<p>состав...</p>
					</details>
				</div>
			</div>
		</section>

		<section class="related">
			<h2>ПОХОЖИЕ ТОВАРЫ</h2>
			<div class="related-grid">
				<div v-for="(item, i) in related" :key="i" class="card">
					<img :src="item.img" alt="" />
					<div class="description flex gap-s">
						<p class="name">{{ item.name }}</p>
						<div class="price">
							<p v-if="item.price.old_value" class="old-price">
								{{
									display_price(
										item.price.old_value,
										item.price.currency
									)
								}}
							</p>
							<p>
								{{
									display_price(
										item.price.value,
										item.price.currency
									)
								}}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
	.product-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
	}

	/* Продукт */
	.product-main {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 1rem;
		padding-left: 5%;
		padding-right: 5%;
		max-width: 1200px;
		width: 100%;
		align-items: start;
	}

	.gallery {
		display: flex;
		justify-content: center;
		gap: 3rem;
	}

	.image-indicators {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		display: none; /* скрыты для широких экранов */
		gap: 8px;
		z-index: 3;
	}
	.image-indicators span {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.6);
		cursor: pointer;
		transition: background-color 0.3s ease, transform 0.2s ease;
	}
	.image-indicators span.active {
		background-color: white;
	}
	.image-indicators span:hover {
		background-color: rgba(255, 255, 255, 0.9);
	}

	.thumbnails {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.thumbnails img {
		width: 70px;
		height: auto;
		cursor: pointer;
		opacity: 1;
		transition: opacity 0.3s, transform 0.2s;
	}
	.thumbnails img:hover {
		transform: scale(1.05);
	}
	.thumbnails img.active {
		opacity: 0.6;
	}

	.main-image {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.main-image .img-wrapper {
		position: relative;
		display: inline-block;
		max-width: 500px;
	}
	.main-image .product {
		display: block;
		width: 100%;
		height: auto;
	}

	.arrow-btn {
		position: absolute;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 50%;
		border: none;
		cursor: pointer;
		padding: 0.5rem 0.6rem;
		margin: 0.5rem 3rem;
		z-index: 2;
	}
	.arrow-btn.left {
		left: -2rem;
	}
	.arrow-btn.right {
		right: -2rem;
	}
	.arrow-btn.disabled {
		opacity: 0.3;
		pointer-events: none;
	}

	/* Информация */
	.product-info {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.product-info .title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.mobile-fav {
		display: none;
		border: none; /* скрыта для широких экранов */
		background: transparent;
		padding: 0;
		cursor: pointer;
	}
	.product-info .title {
		margin-bottom: 0.5rem;
	}
	.product-info h1,
	h2 {
		text-transform: uppercase;
		color: var(--color-black-middle);
		font-size: larger;
	}
	.product-info h3 {
		color: var(--color-gray-dark);
	}
	.price {
		display: flex;
		gap: 1rem;
	}
	.old-price {
		text-decoration: line-through;
		color: var(--color-gray-middle);
	}
	.sizes {
		display: flex;
		gap: 1rem;
	}
	.sizes .size {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.sizes span {
		border: 1px solid var(--color-black-dark);
		padding: 0.7rem 3rem;
		cursor: pointer;
		transition: transform 0.3s linear;
	}
	.sizes p {
		color: var(--color-gray-middle);
	}
	.sizes .disabled {
		border-color: var(--color-gray-light);
		color: var(--color-gray-light);
		pointer-events: none;
	}
	.available-colors {
		margin-left: 4px;
		display: flex;
		gap: 1.5rem;
		margin-bottom: 1rem;
	}
	.color {
		width: 2.5rem;
		height: 2.5rem;
		cursor: pointer;
		transition: transform 0.1s ease;
	}
	.color.selected {
		position: relative;
		border: 1px solid var(--color-gray-light);
	}
	.color.selected::after {
		content: "";
		position: absolute;
		left: -4px;
		right: -4px;
		bottom: -6px;
		height: 1px;
		background-color: var(--color-gray-dark);
		transition: transform 0.3s linear;
	}

	.size span:hover,
	.color:hover {
		transform: scale(1.03);
	}
	.color.selected:hover::after {
		transform: translateY(1px);
	}
	.actions {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}
	.add-to-cart {
		flex: 1;
		background: var(--color-black-dark);
		color: white;
		padding: 1rem;
		border: none;
		font-size: 1rem;
		text-transform: uppercase;
		cursor: pointer;
	}
	.fav-btn {
		border: 1px solid var(--color-black-dark);
		background: white;
		padding: 0.8rem;
		cursor: pointer;
	}
	.extra-info details {
		border-top: 1px solid var(--color-gray-lighter);
	}

	.extra-info details:last-child {
		border-bottom: 1px solid var(--color-gray-lighter);
	}

	.extra-info summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		padding: 1rem 0;
		text-transform: uppercase;
	}

	.extra-info summary::-webkit-details-marker {
		display: none;
	}

	.extra-info summary::after {
		content: "";
		display: inline-block;
		width: 12px;
		height: 12px;
		background: url("/assets/images/Plus.svg") no-repeat center / contain;
		color: var(--color-gray-middle);
		transition: transform 0.5s ease;
	}

	.extra-info[open] summary::after,
	.extra-info details[open] summary::after {
		transform: rotate(45deg);
	}

	.extra-info p {
		padding-bottom: 1rem;
	}

	/* Похожие */
	.related h2 {
		margin: 2rem 0 1rem;
	}
	.related-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}
	.card {
		transition: transform 0.2s ease;
	}
	.card img {
		width: 100%;
		object-fit: cover;
	}
	.card .description {
		margin-top: 0.5rem;
		margin-left: 1.5rem;
	}
	.name {
		text-transform: lowercase;
	}
	.card:hover {
		transform: scale(1.01);
	}

	/* Для анимации переключения изображения */
	.fade-enter-active,
	.fade-leave-active {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: auto;
		transition: opacity 0.4s ease;
	}
	.main-image .img-wrapper img:first-child {
		position: relative;
	}
	.fade-enter-from {
		opacity: 0;
	}
	.fade-enter-to {
		opacity: 1;
	}
	.fade-leave-from {
		opacity: 1;
	}
	.fade-leave-to {
		opacity: 0;
	}

	@media (max-width: 1024px) {
		.gallery {
			flex-direction: column;
			align-items: center;
			gap: 1rem;
		}

		.thumbnails {
			flex-direction: row;
			justify-content: center;
			order: 2;
		}

		.main-image {
			order: 1;
		}
	}

	@media (max-width: 768px) {
		.product-main {
			grid-template-columns: 1fr;
		}

		.thumbnails img {
			display: none;
		}

		.image-indicators {
			display: flex;
		}

		.add-to-cart {
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.product-page {
			padding: 1rem 0;
		}

		.product-main {
			padding: 0;
		}

		.product-info {
			padding: 2rem;
		}

		.sizes span {
			padding: 1rem 2.5rem;
		}

		.mobile-fav {
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		.actions .fav-btn {
			display: none;
		}

		.related {
			padding: 2rem;
		}
		.related-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
