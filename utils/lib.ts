export function display_price(value: number, currency: string) {
	const formattedValue = value
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
	return `${formattedValue} ${currency}`
}