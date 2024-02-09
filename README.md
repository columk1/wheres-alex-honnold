<a name="readme-top"></a>

<h3 align="center">Where's Alex Honnold?</h3>
  <p align="center">
  A hidden object puzzle for climbers. (Think Where's Wally on El Cap). Built with Vite and hosted on Netlify.
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Game Screenshot][game-screenshot]](https://wheres-honnold.netlify.app)

A simple SPA with a React front-end and Firebase back-end.

## Notes

This was mostly an exercise to see what can be done without a server. I used a few anti-patterns on the front-end as I was mostly focused on exploring Firebase. The main game component should really be split up and placed in a router. The mouse and touch events are all inline and should be extracted and organized.

For security, the coordinates of the hidden objects are stored on the back-end. The score of each game is calculated using event-driven timestamps. These are set on the server using server time. There are rules in place which don't allow anyone to write a new score to the db unless there are a few parameters met, i.e. The relevant documents and timestamps must already exist.

Further security improvements would include:

- Moving the hidden object overlay images out of the bundle to a CDN
- Moving some of the game logic to cloud functions
- Implement a real time listener to improve the accuracy of the timer

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

[game-screenshot]: screenshots/game.jpg
