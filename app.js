const { resolve } = require('path')
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 用于处理POST data
const getPostData = (req) => {
    const promise = new Promise((resolve,reject)=>{
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', ()=>{
            if(!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req,res)=>{
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    // 解析 query
    req.query = querystring.parse(req.url.split('?')[0])

    // 处理postData
    getPostData(req).then(postData => {
        req.body = postData

        // 处理Blog路由
        const blogData = handleBlogRouter(req,res)
        if(blogData){
            res.end(JSON.stringify(blogData))
            return
        } 
        // 处理User路由
        const userData = handleUserRouter(req,res)
        if(userData){
            res.end(JSON.stringify(userData))
            return
        }
        // 404
        res.writeHead(404,{"Content-type":'text/plain'})
        res.write("404 Not Found")
        res.end()
    })
}

module.exports = serverHandle 