import { SHOPPER_URL, SHOPPER_API } from './constant'

class Service {

    async fetchCommerceAPI(limit) {
        return new Promise(async (success, failure) => {
            try {
                const url = new URL(SHOPPER_URL)
                let params = {
                    "limit": limit,
                };
                Object.keys(params)
                    .forEach(key => url.searchParams.append(key, params[key]));
                let headers = {
                    "X-Authorization": SHOPPER_API,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                };

                const res = await fetch(url, {
                    method: "GET",
                    headers: headers,
                })
                if (res) {
                    const json = await res.json()
                    const data = json.data.map(item => ({
                        name: item.name,
                        categories: item.categories[0].name,
                        description: item.description,
                        inventory: item.inventory.available,
                        price: item.price.raw
                    }))
                    success(data)
                } else {
                    failure({ error: 'Invalid http request' })
                }
            } catch (error) {
                failure(error)
            }
        })

    }
}

export default Service