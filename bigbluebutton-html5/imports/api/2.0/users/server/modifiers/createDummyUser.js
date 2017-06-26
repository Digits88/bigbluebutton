import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Logger from '/imports/startup/server/logger';
import Users from './../../';

export default function createDummyUser2x(meetingId, userId, authToken) {
  console.error(`create dummy user2x ${meetingId} ${userId} ${authToken}`);
  check(meetingId, String);
  check(userId, String);
  check(authToken, String);

  const User = Users2x.findOne({ meetingId, userId });
  if (User) {
    throw new Meteor.Error('existing-user', 'Tried to create a dummy user for an existing user');
  }

  const doc = {
    meetingId,
    userId,
    authToken,
    clientType: 'HTML5',
    validated: null,
  };

  const cb = (err, numChanged) => {
    if (err) {
      return Logger.error(`Creating dummy user to collection: ${err}`);
    }

    Logger.info(`Created dummy user 2x id=${userId} token=${authToken} meeting=${meetingId}`);
  };

  return Users2x.insert(doc, cb);
}