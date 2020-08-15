# ProductiviTree

Planting happiness in our community

## Created By

- [Megan Tran](https://github.com/meganjtran)
- [Reshmi Ranjith](https://github.com/ReshmiCode)
- [Saloni Shivdasani](https://github.com/SaloniSS)
- [Vincent Vu](https://github.com/vincent-vu280)

## Links

[Demo Video](https://www.youtube.com/watch?v=A0GQYn6tABM)  
[Android App](https://play.google.com/store/apps/details?id=com.productivitree.app)  
[Pitch Presentation](https://storage.googleapis.com/productivitree/SummerHacks%20Pitch%20Presentation.pdf)  

## Submission

- SummerHacks 2020
- InternHacks 2020
  - Best Technical Problem Prize

## Problem Statement

Most people often find it difficult to stay motivated and productive, and quarantine has only served to exacerbate this issue. Now, more than ever, it’s easy to lose track of time watching youtube videos or scrolling aimlessly through social media.

Many of our peers feel lost and isolated, and this can be very damaging to mental health. With ProductiviTree, we aim to change that by incentivizing and sharing your productivity with your friends, creating an encouraging, supportive environment.

## Solution

ProductiviTree is a mobile application that combines the best parts of a social media and productivity app. Users can share ways that they stay healthy and productive during and after quarantine with their friends while also gaining points towards daily goals.

Why do we want to share our productivity with others? Well, when we have to do homework by ourselves, it can be hard to stay on task. But when we're in a study group, we support one another and keep each other accountable. In a survey of our peers, 63% stated that they are more productive when they’re with others. Our group wants to recreate this kind of effect with more things, and on a bigger scale.

On top of that, to further incentivize productivity, the user can gain points for doing tasks in the categories of self-care, community, fitness, and productivity. The accumulated points will automatically be redeemed to plant trees, so users can help the environment while helping themselves.

## Scope

So you might be wondering, what makes this different from other apps, like fitbit which tracks your fitness?

Well, our solution does so much more than just track your data. ProductiviTree focuses on the issue of productivity in isolation and creates a community to support others during this time and even after the pandemic. In our user research, 80% of respondents said they felt more motivated to get things done with some friendly competition, and 69% said they often needed an incentive to get things done. ProductiviTree aims to provide both motivation and incentive in a way to engage users. Users can see the posts of their friends to connect to and easily check up on their wellbeing and productivity in a time when we can’t meet in person safely.

On the data tracking side, we go past just tracking steps. We cover a variety of productive means such as learning a new skill or doing a hobby around the house. Each user has a daily goal they set themselves, and they can choose from a variety of activities to achieve that goal.

Of course, ProductiviTree is not meant to be a replacement for face-to-face human interaction, but instead serves as a way to connect to friends and easily check up on their wellbeing and productivity in a time when we can’t meet in person safely. Of course, users would still be able to use the app after quarantine to keep them productive.

## Technical Specification

The key features of our application combine a social network and productivity tracking. Users can create their own profile to hold their data. They log activities to receive points and can choose to share this publicly on their profile. They can follow other users to view their posts and foster accountability and a community. Our app generates daily and weekly challenges to keep users engaged and motivated to come back to the app. They earn bonus points for completing said challenges. We also have a view for a user to view their statistics to see how well they’ve been meeting their daily and long term goals, and see how they compare to other app users.

## High Level Design

We constructed the front end of our application with React Native on Expo to facilitate cross-environment development along with built-in APIs, and the backend using Node.js and Express. We utilized MongoDB to manage user data. We used React for the front end for the website. All backend communications were made using Axios.

We understand that user security is an important issue, hence to ensure user privacy and data security, we used Google Authorization for account creation and sign-in. DevOps are handled with GCP App Engine.

We do not anticipate any issues with handling the expected load of users. However, if we receive many more users, our application architecture can be easily scaled for many more users by simply sharding our databases and scaling our servers.

As a team, we spent a long time discussing each of our current strengths and weaknesses, and used this tech stack because it is a combination of technologies that we are familiar with, along with some technologies that we had less experience with. Through this project, we have branched out and learned more while still maintaining and using the skills we had prior.

## Road Blocks

Over the course of this hackathon, we came across multiple roadblocks and learned a lot while facing them. The main issues we faced were some backend issues and connectivity, but we did also have some front end issues.

- We have a complex backend with entities that have multiple relationships with other tables and even their own tables. This is the first time that we’ve dealt with database relativity and it took us a while to figure out the most optimal way to structure our database to maximize efficiency.

- For some of our screens, we had to make several API calls where the parameters for one was dependent on the other, or handling data from several APIs based on user selection to create custom states. This would at times slow down our app rendering. To fix this, we learned how to hook handling and state management works and created placeholder components.

- We realized that some of our parts for the user profile and friends profile were very similar. To optimize app size and take full advantage of React’s reusability, we decided to create reusable components and call them at the appropriate screen using conditional rendering. Now my group member Vincent will address our marketing strategy and future works for ProductiviTree.

## Marketing Strategy

Onboarding with our app is as easy as logging in through your Google account. From there, you can set your daily goal, find other users to follow, and start making your own posts!

For marketing, we can incentivize users to invite their friends by giving them points for each friend they refer with a referral link. We have created an accompanying website that includes app details, demo videos, and links to the listing on the app store.

Though the idea was inspired by our current situation with social distancing, users will still be able to use the app post-quarantine, to keep them productive, motivated, and connected to friends.

We would love to partner with environmental organizations who would plant the trees for us because we are all very passionate about creating things that make the world a better place.

## Future Work

As we continue to work on our app, we would like to add daily notifications to remind you to be productive and help the environment. We want to add more interactions for friends, such as challenging each other to do tasks and add “teams” for groups to encourage more friendly competition, and of course, by extension, more productivity.

We would love to partner with environmental organizations to help us plant trees or help the environment in any other ways, because we are all very passionate about creating things that make the world a better place.
