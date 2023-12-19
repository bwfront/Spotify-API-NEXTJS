## Getting Started

###  1. Clone the Repository

`git clone https://github.com/bwfront/Spotify-API-NEXTJS/`

### 2. Load npm files

`npm install`

### 3. Create Spotify API Data

You need a Spotify Premium Subscription

  1. go to [spotify developer](https://developer.spotify.com/)
  2. create an app and copy secret and client id you will need it in the next step
  3. In your Spoitfy Dashboard edit the `Redirect URI` to http://localhost:3000/api/auth/callback/spotify

###  4. Create .env.local

Create /your_project_folder/auth/.env.local

in your .env.local file add:

`SPOTIFY_CLIENT_ID=your_client_id`
`SPOTIFY_CLIENT_SECRET=your_secret_id`

### 5. Run file

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

###  Now you can check the console if you logged in Remember its just a Template, Have fun!

Open [http://localhost:3000](http://localhost:3000) 

