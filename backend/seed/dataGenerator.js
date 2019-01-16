const fs = require('fs')

const offlineIdentity = 'offlineContext_cognitoIdentityId' // '45d7c1e0-4770-4fc8-97ca-f707c5e6b841'
const jobDescription = fs.readFileSync('./jobDescription.txt', 'utf-8')

let jobOffers = []
for (let i = 1; i <= 5; i++) {
  jobOffers.push({
    id: `job_${i}`, // RANGE
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

// profile information
jobOffers.push({
  id: 'profile', // RANGE
  cognitoID: offlineIdentity, // HASH
  causes: ['Eliminate Poverty', 'Fight hunger', 'Improve health & wellbeing'],
  location: 'London',
  technologies: ['Swift', 'Java'],
  profiles: {
    github: 'https://github.com/abc',
    linkedin: 'https://linkedin.com/abc'
  }
})

fs.writeFileSync('./jobOffersWithProfile.json', JSON.stringify(jobOffers, null, 2), 'utf-8')
