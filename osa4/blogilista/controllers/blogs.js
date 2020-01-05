const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const _ = require('lodash')

const User = require('../models/user')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    // console.log('@ get /')
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })

    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs.map(blog => blog.toJSON()))

})


blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

// blogsRouter.post('/', async (request, response) => {
//     // console.log('@ post /')
//     const blog = new Blog(request.body)

//     // set likes to 0 if it doesn't exist.
//     if (!blog.get('likes')) {
//         blog.likes = 0
//     }

//     // return 400 Bad request jos ei title ja url kenttiä
//     if (!blog.get('title') || !blog.get('url')) {
//         response.status(400).send()
//     } else {
//         blog
//             .save()
//             .then(result => {
//                 response.status(201).json(result)
//             })
//     }
// })

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    //const token = getTokenFrom(request)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
        response.status(400).send()
    }

    let user = await User.findById(decodedToken.id)

    console.log('user: ' + user)

    // laitetaan eka käyttäjä jollei ole.
    if (user === null) {
        console.log('ei ole HEI!')
        user = User.find({})[0]
        console.log(`nyt on hei: ${user}`)
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})


// update
blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    // console.log('@ put /')

    // pitää tällee valita päivitettävät kentät..
    // näemmä jos jotain ei ole niin ei tule myöskään tähän olioon..
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    // console.log(`sehän on nyt: ${JSON.stringify(blog)}`)

    try {
        result = await Blog.findByIdAndUpdate(
            request.params.id,
            blog,
            { new: true }
        )
        response.status(200).json(result)
    } catch (exception) {
        next(exception)
    }

})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        }

        // check the creator is same as the caller / deleter now.
        let blog = await Blog.findById(request.params.id)
        if ( blog.user.toString() === decodedToken.id.toString ) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            return response.status(401).json({ error: 'other user created this blog. can not delete.' })  
        }

    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter
