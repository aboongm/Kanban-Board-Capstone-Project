/**
 * @jest-environment jsdom
 */

const { itemCounter } = require('../modules/counter.js');

test('Should output the total items from API displayed on homepage', () => {
  const shows = [
    {
      id: 1,
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
        original:
          'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
      },
      language: 'English',
      name: 'Under the Dome',
      officialSite: 'http://www.cbs.com/shows/under-the-dome/',
      premiered: '2013-06-24',
      rating: { average: 6.5 },
      runtime: 60,
      schedule: { time: '22:00', days: Array(1) },
      status: 'Ended',
      summary:
        "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
      type: 'Scripted',
      updated: 1631010933,
      url: 'https://www.tvmaze.com/shows/1/under-the-dome',
      webChannel: null,
      weight: 98,
    },
    {
      id: 2,
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg',
        original:
          'https://static.tvmaze.com/uploads/images/original_untouched/163/407679.jpg',
      },
      language: 'English',
      name: 'Person of Interest',
      officialSite: 'http://www.cbs.com/shows/person_of_interest/',
      premiered: '2011-09-22',
      rating: { average: 8.8 },
      runtime: 60,
      schedule: { time: '22:00', days: Array(1) },
      status: 'Ended',
      summary:
        "<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I designed the Machine to detect acts of terror but it sees everything. Violent crimes involving ordinary people. People like you. Crimes the government considered \"irrelevant\". They wouldn't act so I decided I would. But I needed a partner. Someone with the skills to intervene. Hunted by the authorities, we work in secret. You'll never find us. But victim or perpetrator, if your number is up, we'll find you.</p>",
      type: 'Scripted',
      updated: 1631565378,
      url: 'https://www.tvmaze.com/shows/2/person-of-interest',
      webChannel: null,
      weight: 98,
    },
  ];
  expect(itemCounter(shows)).toBe(2);
});
