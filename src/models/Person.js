// models/Person.js
import Realm from 'realm';

class Episode extends Realm.Object {
  static schema = {
    name: 'Episode',
    properties: {
      end: 'string',
      start: 'string',
      title: 'string',
    },
  };
} // Define a separate class for Episode

class Video extends Realm.Object {
  static schema = {
    name: 'Video',
    primaryKey: '_id',
    properties: {
      // name: 'string',
      // age: 'int',

      title: 'string',
      description: 'string',
      category: 'string',
      speaker: 'string',
      episodes: {type: 'list', objectType: 'Episode'},
      course_type: 'string',
      tags: 'string',
      // price: 'int',
      thumbnail_url: 'string',
      video_url: 'string',
      video_size: 'int',
      video_duration: 'string',
      view_count: 'int',
      _id: 'string',
    },
  };
}

export {Episode, Video};
