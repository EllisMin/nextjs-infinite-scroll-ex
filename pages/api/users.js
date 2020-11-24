const faker = require('faker')

/** Generate Fake user data */
const fakeUsers = []
// Generate 300 users with fake names
for (let i = 0; i < 300; i++) {
  fakeUsers.push({ name: faker.name.findName() })
}

// Limit users to return per page
const getLimitedUsers = limit => {
  const refinedUsers = []
  for (let i = 0; i < limit; i++) {
    refinedUsers.push(fakeUsers[i])
  }
  return refinedUsers
}

export default function handler(req, res) {
  const curPage = req.body.page || 1
  // Display 30 users per page load
  const perPage = 30

  try {
    const totalUsers = fakeUsers.length
    const refinedUsers = getLimitedUsers(perPage * curPage)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        message: 'Fetched users',
        users: refinedUsers,
        curPage: curPage,
        maxPage: Math.ceil(totalUsers / perPage),
      })
    )
  } catch (err) {
    console.log(err) ///
  }
}
