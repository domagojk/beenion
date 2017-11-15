# Beenion
Beenion is a project that I am builing "in my spare time".
I'm using it primaraly for testing new ideas and technologies.

## Technologies used
- TypeScript
- JavaScript
- Express
- React

## Project idea
The goal of the project is to create a system that would help authors receive feedback early on and reach the audience for their work regardless of their popularity.
An author can be a developer, musician, writer or pretty much anyone producing some creative work.
In short, I’m trying to adapt an old idea of peer reviews and scientific journals to an online medium.
[Here is a short clip](https://www.youtube.com/watch?time_continue=40) on how “Peer Review” system works for scientific journals.

Of course, the project I intent to build is not the same and it’s not limited to science articles.
I first thought about this from a “JavaScript library publication perspective” but the idea evolved and also got simplified in some areas.

Here are the main points:

- Medium consist of publications and projects

- A project (a video, book, blog post etc.) is then submitted in the publication

- Publication is managed as a hierarchy of reviewers assigned in stages

- Reviewers and authors can earn points which helps in refining this hierarchy structure (something similar to stackoverflow ranking system)

- Most famous and acknowledged reviewers have the ultimate decision if a project will be featured in the publication

- Second stage of publication reviewers is defined by the first one, third stage by the second one and so on

- Each assigned reviewer sends his review, comments and his decision on whether he accepts or declines a project submission

- If a majority of project reviews (or similar criteria) in current stage are positive, project is promoted to the next stage

- If the project is declined, an author can apply received suggestions, modify his project and resubmit it again or choose another publication

- If enough projects are accepted, publication editors can publish an issue which is then sent as a newsletter to all subscribers.
