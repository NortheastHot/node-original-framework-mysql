const {getList, getDetail, updateBlog, newBlog, delBlog} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req,res)=>{
    const method = req.method // 获取 get post
    const id = req.query.id
    const url = req.url
    const path = url.split('?')[0]
    
    // 获取博客列表
    if(method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author,keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    // 获取博客详情
    if(method === 'GET' && path === '/api/blog/detaili') {
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    // 获取新建博客
    if(method === 'POST' && path === '/api/blog/new') {
        const author = 'demoname' // 假数据，在开发登录后再改
        req.body.author = author
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    // 更新博客
    if(method === 'POST' && path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if(val){
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }
    // 删除博客
    if(method === 'POST' && path === '/api/blog/del') {
        const author = 'kzi'
        const result = delBlog(id, author)
        return result.then(val=>{
            if(val){
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter