const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const _ = require('lodash')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    // ei toimi.. tässä in-muodossa blog onkin järjestysnumero..
    // for ( let blog in initialBlogs ) {
    //     console.log('sehän on: ' + blog)
    // }

    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

})

describe('4.8', () => {

    test('notes are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are ' + initialBlogs.length + ' blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('one title is \'Type wars\'', async () => {
        const response = await api.get('/api/blogs')

        const titleContents = response.body.map(r => r.title)

        expect(titleContents).toContain(
            'Type wars'
        )
    })

})

describe('4.9', () => {

    test('tulee olla kenttä nimeltään id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()

        // for (let blog of response.body) {
        //     console.log(blog)
        // }
    })

})

describe('4.10', () => {

    const uusiBlogi = {
        title: "Juustosodat",
        author: "Kuuraketti de Francois",
        url: "http://www.juustosodat.com",
        likes: 999
    }

    test('voi lisätä blogeja', async () => {

        await api
            .post('/api/blogs')
            .send(uusiBlogi)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titleContents = response.body.map(r => r.title)

        expect(response.body.length).toBe(initialBlogs.length + 1)

        expect(titleContents).toContain(
            'Juustosodat'
        )

        // for (let blog of response.body) {
        //     console.log(blog)
        // }

    })

})

describe('4.11', () => {

    const uusiBlogi = {
        title: "PHP pro programing",
        author: "Coder de professional",
        url: "http://www",
        //likes: 999
    }

    test('olematon likes tulee arvoon 0', async () => {

        await api
            .post('/api/blogs')
            .send(uusiBlogi)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        let lisattyBlogi = _.filter(response.body, ['title', uusiBlogi.title])[0]

        expect(lisattyBlogi.likes).toBeDefined()

        expect(lisattyBlogi.likes).toBe(0)

        // console.log('lisättiin:' + lisattyBlogi.author)

    })

})

describe('4.12', () => {

    const uusiBlogiIlmanTitle = {
        author: "Tuntematon koodari",
        url: "http://www",
        likes: 666
    }

    const uusiBlogiIlmanUrl = {
        title: "Ei nettii",
        author: "Mies 80-luvulta",
        likes: 80
    }

    test('jos uudella blogilla ei kenttiä \'title\' ja \'url\' vastaus on 400 Bad request', async () => {

        await api
            .post('/api/blogs')
            .send(uusiBlogiIlmanTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(uusiBlogiIlmanUrl)
            .expect(400)

    })

})

describe('4.13, deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {

        const blogToDelete = initialBlogs[0]

        // console.log('deletoidaan blogi: ' + blogToDelete._id)

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .expect(204)

        // check count after delete
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length - 1)

        const titleContents = response.body.map(r => r.title)

        expect(titleContents).not.toContain(
            blogToDelete.title
        )

    })
})

describe('4.14, updating a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {

        const blogToUpdate =
        {
            id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        }
        blogToUpdate.title = "Updated Aivan turha otsikko"

        // console.log('päivitetään blogi: ' + blogToUpdate.id)
        // console.log('päivitetään blogi: ' + blogToUpdate.title)

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        // check that content changed
        const response = await api.get('/api/blogs')

        const titleContents = response.body.map(r => r.title)

        expect(titleContents).toContain(
            blogToUpdate.title
        )

    })
})

afterAll(() => {
    mongoose.connection.close()
})