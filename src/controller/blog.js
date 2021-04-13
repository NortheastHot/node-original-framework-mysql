const getList = (author, keyword) => {
    // 先返回假数据（格式是正确的）
    return [
        {
            id: 1,
            title: '标题1',
            content: '内容1',
            createTime: 1618113001142,
            author: 'kizi'
        }
    ]
}

const newBlog = (blogData ={}) => {
    // blogData是一个博客对象，包含title content属性
    return {
        id: 223
    }
}

module.exports = {
    getList,
    newBlog
}