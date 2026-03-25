import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'npx1d8v7', // let me verify the projectId. Wait, let me check sanity.config.ts or sanity.cli.ts
  dataset: 'production',
  apiVersion: '2024-03-25',
  token: 'YOUR_TOKEN',
  useCdn: false
})
