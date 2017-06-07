$(document).ready(function () {
  let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "tsm_viss", "tecnosh"];
  let base_url = "https://wind-bow.gomix.me/twitch-api/"; // + freecodecamp + "?callback=?";

  for (let i = 0; i < channels.length; i++) {
    let streams_url = base_url + 'streams/' + channels[i] + '?callback=?';
    let channel,
      status,
      logo,
      display_name,
      url,
      game;

    $.getJSON(streams_url, function (data) {
      // get information on streams
      if (data.stream === null) {
        channel = 'offline';
        status = 'offline';
      } else if (data.stream === undefined) {
        channel = 'account closed';
        status = 'offline';
      } else {
        channel = data.stream.game;
        status = 'online';
      }

      // get information on channels
      let channels_url = base_url + 'channels/' + channels[i] + '?callback=?';
      $.getJSON(channels_url, function (data) {
        logo = data.logo;
        display_name = data.display_name.length > 15 ? data.display_name.substr(0, 15) + "..." : data.display_name;
        url = data.url;
        if (status === 'online') {
          game = data.game + ':' + data.status;
          console.log(data.game);
          //game = data.game;

        } else {
          game = 'offline';
        }

      }).done(function (data) {
        let html = "<div class='row result-list " + status + "'>" +
          "<div class='col-md-2 col-sm-2 col-xs-3 center-block logo'><img class='img-circle img-responsive center-block' src='" + logo + "' height='48px' width='48px'></img></div>" +
          "<div class='col-md-2 col-sm-2 col-xs-3 display_name'><a href='" + url + "' target='_blank'>" + display_name + "</a></div>" +
          "<div class='col-md-8 col-sm-8 col-xs-6 game'>" + game + "</div>" +
          "</div>";

        $('.results').append(html);
      });



    });
  }

  $('.all-link').click(function () {
    $('.online').removeClass('hidden');
    $('.offline').removeClass('hidden');
    $(this).parent().addClass('status-tab-selected');
    $('.online-link').parent().removeClass('status-tab-selected');
    $('.offline-link').parent().removeClass('status-tab-selected');
  });

  $('.online-link').click(function () {
    $('.online').removeClass('hidden');
    $('.offline').addClass('hidden');
    $(this).parent().addClass('status-tab-selected');
    $('.all-link').parent().removeClass('status-tab-selected');
    $('.offline-link').parent().removeClass('status-tab-selected');
  });

  $('.offline-link').click(function () {
    $('.offline').removeClass('hidden');
    $('.online').addClass('hidden');
    $(this).parent().addClass('status-tab-selected');
    $('.all-link').parent().removeClass('status-tab-selected');
    $('.online-link').parent().removeClass('status-tab-selected');
  });
});