Base URL

/api

Authentication

JWT-based authentication

Send token in header:

Authorization: Bearer <JWT_TOKEN>

🔐 Authentication (/api/auth)
POST /api/auth/signup

Create a new user account.

Request Body

`{
"username": "john",
"email": "john@test.com",
"password": "password123"
}`

Response — 201

{
"id": "userId",
"username": "john",
"role": "user"
}

POST /api/auth/login

Authenticate user and issue JWT.

Request Body

{
"username": "john",
"password": "password123"
}

Response — 200

{
"token": "jwt-token",
"username": "john",
"role": "user"
}

GET /api/auth/me

Get currently authenticated user.

Auth: Required

Response

{
"id": "userId",
"username": "john",
"role": "user"
}

👤 Users (/api/users)
GET /api/users

List all users and authors.

Response

[
{
"username": "john",
"role": "author",
"createdAt": "2024-01-01"
}
]

GET /api/users/:username

Get user public profile and interactions.

Response

{
"user": {
"username": "john",
"role": "author",
"bio": "",
"createdAt": "2024-01-01"
},
"interactions": {
"likedArticles": [
{ "title": "Post A", "slug": "post-a" }
],
"dislikedArticles": [],
"comments": [
{
"article": { "title": "Post B", "slug": "post-b" },
"content": "Nice article",
"createdAt": "2024-01-02"
}
]
}
}

PATCH /api/users/:id/role

Change user role.

Auth: Admin only

Request Body

{
"role": "author"
}

📝 Blogs (/api/blogs)
GET /api/blogs

Get all blogs (public).

Response

[
{
"title": "Tech Blog",
"slug": "tech-blog",
"description": "All about tech",
"author": {
"username": "john",
"role": "author"
}
}
]

GET /api/blogs/:slug

Get blog metadata and published articles.

Response

{
"blog": {
"title": "Tech Blog",
"slug": "tech-blog",
"author": { "username": "john" }
},
"articles": [
{
"title": "First Post",
"slug": "first-post"
}
]
}

POST /api/blogs

Create a new blog.

Auth: Author / Admin

Request Body

{
"title": "Tech Blog",
"slug": "tech-blog",
"description": "All about tech"
}

PUT /api/blogs/:id

Update a blog.

Auth: Owner / Admin

DELETE /api/blogs/:id

Delete a blog.

Auth: Owner / Admin

✍️ Articles (/api/articles)
GET /api/articles/:slug

Get a published article (public).

Response

{
"title": "My Article",
"content": "...",
"author": { "username": "john" },
"blog": { "title": "Tech Blog" },
"likesCount": 10,
"dislikesCount": 2
}

GET /api/articles

Get own articles (draft + published).

Auth: Author / Admin

POST /api/articles

Create an article (draft by default).

Auth: Author / Admin

Request Body

{
"title": "Draft Article",
"slug": "draft-article",
"content": "Markdown content",
"blogId": "blogId"
}

PUT /api/articles/:id

Update article (edit or publish).

Auth: Owner / Admin

Request Body

{
"title": "Updated title",
"published": true
}

DELETE /api/articles/:id

Delete article.

Auth: Owner / Admin

💬 Comments
POST /api/articles/:id/comments

Add a comment to an article.

Auth: Logged-in user

Request Body

{
"content": "Great article!"
}

PUT /api/comments/:id

Edit a comment.

Auth: Owner / Admin

DELETE /api/comments/:id

Delete a comment.

Auth: Owner / Admin

👍 Reactions (Likes / Dislikes)
POST /api/articles/:id/like

Toggle like on article.

Behavior

Like → Unlike

Dislike → Switch to Like

Response

````{
"likesCount": 5,
"dislikesCount": 1
}```

POST /api/articles/:id/dislike

Toggle dislike on article.

Behavior

Dislike → Remove

Like → Switch to Dislike
````
