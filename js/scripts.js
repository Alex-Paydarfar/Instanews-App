$(function () {
    
  var $loader = $('.loader')
  var $navigation = $('.navigation')
  var $articlelist = $('.article-list')
  var $container = $('.container')
  var $image = $('.New-York-Times')
  $('select').selectric();
  $loader.hide();
  $('.selector').on('change', function () {
    var Input = $('.selector').val();
    $container.addClass('header-move')
    $image.addClass('shrink')
    $loader.show();
    $navigation.addClass('nav-article-load')
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + Input + '.json';
    url += '?' + $.param({
      'api-key': '3fc490bb28d84fe080a965aee4f72b45'
    });
    $articlelist.empty();
      
    $.ajax({
      url: url,
      method: 'GET',
    })
      
      .always(function () {
        $loader.hide();
      })
      .done(function (data) {
        var $data = data.results.filter(function (item) {
          return item.multimedia.length;
        }).splice(0, 12);
        $.each($data, function (item, value) {
          var fullArticle = ''
          fullArticle += '<li class = "article-item">' + '<a href='
          fullArticle += value.url + '>'
          fullArticle += '<div class ="text-container">' + '<p class = "content-text">'
          fullArticle += value.abstract
          fullArticle += '</p>'
          fullArticle += '<img class = "content-container"'
          fullArticle += 'src="' + value.multimedia[4].url + '" />'
          fullArticle += '</a>' + '</li>'
          $articlelist.append(fullArticle);
        });
      })
      
      .fail(function (err) {
      throw err
      });
  });
});