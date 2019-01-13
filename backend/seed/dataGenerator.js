const fs = require('fs')

const offlineIdentity = '45d7c1e0-4770-4fc8-97ca-f707c5e6b841' // offlineContext_cognitoIdentityId
const jobDescription = fs.readFileSync('./jobDescription.txt', 'utf-8')

let jobOffers = []
for (let i = 1; i <= 5; i++) {
  jobOffers.push({
    id: `${i}`, // RANGE
    cognitoID: offlineIdentity, // HASH
    title: `Job ${i}`,
    company: `Company ${i}`,
    description: jobDescription,
    location: 'London, UK',
    salary: {
      start: '£28000',
      end: '£40000'
    },
    keywords: ["CTO", "Impact"],
    categories: ["Social", "Energy and Water"],
    jobTypes: ["Permanent", "Full-time"]
  })
}
fs.writeFileSync('./jobOffers.json', JSON.stringify(jobOffers, null, 2), 'utf-8')

const profile = {
  id: offlineIdentity,
  causes: ['Eliminate Poverty', 'Fight hunger', 'Improve health & wellbeing'],
  location: 'London',
  technologies: ['Swift', 'Java'],
  profiles: {
    github: 'https://github.com/abc',
    linkedin: 'https://linkedin.com/abc'
  }
}
fs.writeFileSync('./profiles.json', JSON.stringify([profile], null, 2), 'utf-8')
