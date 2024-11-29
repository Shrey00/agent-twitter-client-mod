// import { Scraper } from 'agent-twitter-client';
// import dotenv from 'dotenv';
const dotenv = require('dotenv')
const {Scraper} = require('agent-twitter-mod')
dotenv.config();

async function main() {
  const scraper = new Scraper();
  // v1 login
  await scraper.login(
    process.env.TWITTER_USERNAME,
    process.env.TWITTER_PASSWORD,
  );
  // // v2 login
  // await scraper.login(
  //   process.env.TWITTER_USERNAME,
  //   process.env.TWITTER_PASSWORD,
  //   undefined,
  //   undefined,
  //   process.env.TWITTER_API_KEY,
  //   process.env.TWITTER_API_SECRET_KEY,
  //   process.env.TWITTER_ACCESS_TOKEN,
  //   process.env.TWITTER_ACCESS_TOKEN_SECRET,
  // );
  // console.log('Logged in successfully!');
  // // Example: Posting a new tweet with a poll
  // await scraper.sendTweetV2(
  //   `When do you think we'll achieve AGI (Artificial General Intelligence)? 🤖 Cast your prediction!`,
  //   undefined,
  //   {
  //     poll: {
  //       options: [
  //         { label: '2025 🗓️' },
  //         { label: '2026 📅' },
  //         { label: '2027 🛠️' },
  //         { label: '2030+ 🚀' },
  //       ],
  //       durationMinutes: 1440,
  //     },
  //   },
  // );
  console.log(await scraper.getTweetThread('1862351024071041402'));
  async function postTweetWithImage(
    imgUrl,
    replyText,
    tweetId,
  ) {
    try {
      const img = await fetch(imgUrl);
      const arrayBuffer = await img.arrayBuffer();
      console.log(arrayBuffer);
      const imgBuffer = Buffer.from(arrayBuffer);
      console.log("BUFFER")
      console.log("TWEET_ID", tweetId)
      console.log(imgBuffer)
      const response = await scraper.sendTweetWithMedia(replyText, tweetId  );
      const responseData = await  response.json();
      console.log(responseData);
    } catch (e) {
      console.log(e);
    }
  }
  postTweetWithImage('https://i.insider.com/562a71f9dd0895a8388b4593?width=700','Another one','1862332893839683665');
  // const tweet = await scraper.getTweetV2('1856441982811529619');
  // console.log({ tweet });
  // console.log('tweet', tweet);
  // const tweets = await scraper.getTweetsV2([
  //   '1856441982811529619',
  //   '1856429655215260130',
  // ]);
  // console.log('tweets', tweets);
}

main();










