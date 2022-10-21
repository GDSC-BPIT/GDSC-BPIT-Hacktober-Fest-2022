# StoryWall

StoryWall is a completely web based blog management system that anyone can use to create instant virtual blogs.

### Development Environment Setup Instructions

These steps are to be followed when you are running the project for the first time.

1. Install Node 12.x following instructions [here](https://github.com/nodesource/distributions/blob/master/README.md#debinstall).
2. Clone this project
3. Change to `storywall` folder, install dependencies:

```
cd storywall
npm install
```

### Starting Development Server

In the `storywall` folder, simply run:

```
npm start
```
### Starting Live Json Server

In the `storywall` folder, simply run:

```
npx json-server --watch data/db.json --port 8000
```
