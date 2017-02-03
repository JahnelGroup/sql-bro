export default {
  getCompletions: function(editor, session, pos, prefix, callback) {
    var wordList = ["foo", "bar", "baz"]
    callback(null, wordList.map(word => ({
        caption: word,
        value: word,
        meta: 'static'
      })
    ));
  }
}
