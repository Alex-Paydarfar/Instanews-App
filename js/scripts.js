$(function () {

  var url = 'https://api.nytimes.com/svc/topstories/v2/';
  var selectionName = $('.selection').val()
  var $container = $('.container')

  $('.selection').on('change', function () {
    event.preventDefault();
    
    var sectionName = $('.selection').val();
    
    console.log('hello', sectionName);
    
    var url = 'https://api.nytimes.com/svc/topstories/v2/';
    url += sectionName;
    url += '.json';
    url += '?' + $.param({
      'api-key': '3fc490bb28d84fe080a965aee4f72b45'
    });
    
    $.ajax({
      url: url,
      method: 'GET'
    })

    .done(function (data) {
      var i = 0;
      var results = data.results;
      var x = [];

      $.each(results, function (key, value) {
        var storyAbstract = value.abstract;
        console.log(storyAbstract);
        var storyUrl = value.url;
        var storyPhoto = value.multimedia[4].url;
        // var arrayPhoto = value.multimedia;
        // if (arrayPhoto.length) {
        //   x.push(data.results[i])
        //   results = x.slice(0, 12);
        //   i++;
        // } else {
        //   i++;
        // }
        console.log(results, x);
        var style = 'background-image:url(' + storyPhoto + ');';
        console.log(style);
        var storyListItem = '<li class="story-items"><a href=' + storyUrl + ' target="_blank">';
        storyListItem += '<div class="photo" style="height: 400px; ' + style + '"><p class="list-text">';
        storyListItem += storyAbstract;
        storyListItem += '</p></div></a></li>';
        $('.article-list').append(storyListItem);
      }); // close .each
    })
    .fail(function (err) {
      throw err
    });
   }); // end doc.ready
});