$(document).ready(function() {
  $('pre code.lang').each(function(i, e) {hljs.highlightBlock(e)});
  $('table').addClass('table table-bordered');
});