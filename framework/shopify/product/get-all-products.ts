const placeholderNumbers = [1,2,3]

const placeholderEndpoint = "https://jsonplaceholder.typicode.com/posts";
export const getAllProducts = async () => {
    const response = await fetch(placeholderEndpoint)
    return [...await response.json()].map((item : {title: string})=> item.title)
}