const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    for (const blog of blogs){
        // console.log(blog)
        total = total + blog.likes
        // console.log(total)
    }
    return total
}

const favoriteBlog = (blogs) => {

    let bestBlogCount = 0
    let bestBlog = {}

    for (const blog of blogs){
        if (bestBlogCount <= blog.likes ) {
            bestBlog = blog
            bestBlogCount = bestBlog.likes
        }                
    }
    return bestBlog
}

const mostBlogs = (blogs) => {
    let mostBlogsWriter = _.head(_(blogs)
        .countBy('author')
        .entries()
        .maxBy(_.last))
    let blogsByWriterX = _.filter(blogs, ['author', mostBlogsWriter]).length
    return {
        author: mostBlogsWriter,
        blogs: blogsByWriterX
    }
}

const mostLikes = (blogs) => {
    let blogWithMostLikes = _.maxBy(blogs, 'likes')
    let blogsByWriterX = _.filter(blogs, ['author', blogWithMostLikes.author])
    let likesForBlogsByWriterX = _.sumBy(blogsByWriterX, 'likes')
    return {
        author: blogWithMostLikes.author,
        likes: likesForBlogsByWriterX
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
