export const bookmarks = () => ({
  "data": {
    "bookmarks": [
      {
        "id": "6017e468a8239b001ce8c154",
        "title": "reactHooks",
        "link": "https://usehooks.com/",
        "employee": {
          "id": "test.employee@syncretis.com",
          "name": "Test Employee",
          "email": "test.employee@syncretis.com",
          "__typename": "Employee"
        },
        "skills": [
          {
            "id": "5d1f24a9aac59500102fab49",
            "name": "React",
            "__typename": "Skill"
          }
        ],
        "likes": [
          {
            "id": "6017fdd0a8239b001ce8c157",
            "__typename": "Bookmarklike"
          }
        ],
        "access": {
          "read": true,
          "write": true,
          "__typename": "Access"
        },
        "createdAt": "2 hours ago",
        "likedByMe": true,
        "__typename": "Bookmark"
      },
      {
        "id": "6017e189a8239b001ce8c151",
        "title": "reactHooks",
        "link": "https://usehooks.com/",
        "employee": {
          "id": "test.employee@syncretis.com",
          "name": "Test Employee",
          "email": "test.employee@syncretis.com",
          "__typename": "Employee"
        },
        "skills": [
          {
            "id": "5d1f24a9aac59500102fab49",
            "name": "React",
            "__typename": "Skill"
          }
        ],
        "likes": [],
        "access": {
          "read": true,
          "write": true,
          "__typename": "Access"
        },
        "createdAt": "2 hours ago",
        "likedByMe": false,
        "__typename": "Bookmark"
      },
    ]
  }
})
