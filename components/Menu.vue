<script setup>
	import { useRouter } from "vue-router"

	const router = useRouter()
</script>

<template>
	<nav class="pad-m">
		<div class="logo">
			<NuxtLink to="/"><img src="/assets/images/logo.svg" /></NuxtLink>
		</div>
		<ul>
			<li class="search">
				<NuxtLink to="/search"
					><img src="/assets/images/search.svg"
				/></NuxtLink>
			</li>
			<li class="favorite">
				<NuxtLink to="/favorite"
					><img src="/assets/images/Favorite.svg"
				/></NuxtLink>
			</li>
			<li class="user">
				<NuxtLink to="/user"
					><img src="/assets/images/User.svg"
				/></NuxtLink>
			</li>
			<li class="basket">
				<NuxtLink to="/basket"
					><img src="/assets/images/Basket.svg"
				/></NuxtLink>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
	nav {
		top: 0;
		left: 0;
		display: flex;
		width: 100%;
		background-color: var(--color-light-l);
		padding: 2.5rem 2.5rem 1rem 2.5rem;
	}

	nav .logo {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	nav ul {
		width: 100%;
		gap: 1rem;
		margin: 0;
		padding: 0;
		padding-right: 3rem;
		display: flex;
		justify-content: right;
		align-items: center;
		list-style: none;
	}

	nav li {
		display: inline;
		text-align: center;
	}

	nav a {
		text-decoration: none;
	}

	nav a.active {
		border-bottom: 3px solid var(--color-dark-l);
		padding-bottom: 5px;
	}

	@media (max-width: 480px) {
		nav ul {
			display: grid;
			grid-template-columns: auto auto 1fr;
			grid-template-areas: "user search basket";
			align-items: center;
			padding-right: 0;
		}

		.favorite {
			display: none;
		}
		.user {
			grid-area: user;
		}
		.search {
			grid-area: search;
		}
		.basket {
			grid-area: basket;
			justify-self: end;
		}
	}
</style>
