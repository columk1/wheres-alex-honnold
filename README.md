<a name="readme-top"></a>

<h3 align="center">Where's Alex Honnold?</h3>
  <p align="center">
  A hidden object puzzle for climbers. (Think Where's Wally on El Cap). Built with Vite and hosted on Netlify.
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Game Screenshot][game-screenshot]](https://wheres-honnold.netlify.app)

The game is a React front-end and Firebase back-end. Securing the game would have been much easier using Express but I wanted to explore Firebase to get a sense of what can be done without a server.

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

1. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)

```sh
nvm install 21.6.0
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/columk1/portfolio.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a database on firestore with collections 'features', 'games' and 'scores'
4. Replace config in firebase.js
5. Start the development server
   ```sh
   npm run dev
   ```
   <!-- ROADMAP -->

## Roadmap

- [ ] React Router
- [ ] Improved Accessibility
- [ ] Cloud Functions for Game Logic

<!-- CONTACT -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[game-screenshot]: screenshots/game.png
