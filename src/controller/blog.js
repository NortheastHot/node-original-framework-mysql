const {exec} = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回promise
    return exec(sql)
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