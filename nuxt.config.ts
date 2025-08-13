// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	app: {
		baseURL:
			import.meta.env.VITE_DEPLOY_ENV === "GH_PAGES"
				? "/tt-stik/"
				: "/",
	},
	ssr: import.meta.env.VITE_DEPLOY_ENV !== "GH_PAGES",
})
