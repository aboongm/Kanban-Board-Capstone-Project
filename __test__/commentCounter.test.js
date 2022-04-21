import showComments from '../mocks/commentlist.js';
import Utilities from '../modules/utils.js';

describe('Comment counter function counter', () => {
  test('It must return 1 number of comment in a list', () => {
    const commentList = showComments();
    const counter = Utilities.showCommentCounter(commentList);
    expect(counter).toBe(1);
  });
});
