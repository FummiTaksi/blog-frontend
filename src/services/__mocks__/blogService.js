
const blogs = [
    {
        title:"Kaiku kalliolla",
        author: "Risto Reipas",
        url :"www.sfas.fi",
        likes: 2
    }
]

const getAll = () => {
    const response = {data:blogs}
    return Promise.resolve(response)
}

export default {blogs, getAll}

