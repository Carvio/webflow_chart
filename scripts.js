/**
 * Chart.
 *
 * @todo: Data retrieval using ajax.
 * @todo: WIP: Message depending on graph data.
 * @todo: Fade in message.
 * @todo: Tooltip values should be relative to previous month.
 */

if ($('#chart').length) {
  var canvas = document.getElementById("chart");
  var ctx = canvas.getContext('2d');

  /**
   * Global Chart settings.
   */
  Chart.defaults.global.defaultFontColor = 'white';

  /**
   * Color presets.
   *
   * Closed / Lost  - dark grey   - ?
   * Engineering    - Turquoise   - ?
   * Design         - Magento     - ?
   * PM             - Blue        - ?
   */

  // Base colors from design.
  //var colors = {
  //  green     : 'rgb(0,255,194)',
  //  blue      : 'rgb(13,107,195)',
  //  red       : 'rgb(232,30,63)',
  //  purple    : 'rgb(128,5,144)',
  //  magenta   : 'rgb(204,0,254)',
  //  light_blue: 'rgb(0,201,248)',
  //  grey      : 'rgb(173,173,174)',
  //  yellow    : 'rgb(223,215,28)',
  //  white     : 'rgb(255,255,255)',
  //  black     : 'rgb(0,0,0)',
  //  dark      : 'rgb(50,37,69)'
  //};

  // Colors at chart start/end.
  var colors = {
    green     : 'rgb(0,245,204)',
    blue      : '#205ABB',
    red       : 'rgb(226,24,103)',
    purple    : 'rgb(99,31,157)',
    magenta   : 'rgb(209,5,221)',
    light_blue: 'rgb(0,211,238)',
    grey      : 'rgb(173,173,174)',
    yellow    : 'rgb(223,215,28)',
    white     : 'rgb(255,255,255)',
    black     : 'rgb(0,0,0)',
    dark      : 'rgb(50,37,69)'
  };

  /**
   * Color gradients.
   */
  var x0 = 0;
  var y0 = 0;
  var x1 = window.innerWidth;
  var y1 = 0;

  var grad_blue = ctx.createLinearGradient(x0, y0, x1, y1);
  grad_blue.addColorStop(0, colors.purple);
  grad_blue.addColorStop(1, colors.blue);

  var grad_magenta = ctx.createLinearGradient(x0, y0, x1, y1);
  grad_magenta.addColorStop(0, colors.red);
  grad_magenta.addColorStop(1, colors.magenta);

  var grad_green = ctx.createLinearGradient(x0, y0, x1, y1);
  grad_green.addColorStop(0, colors.light_blue);
  grad_green.addColorStop(1, colors.green);

  var gradients = {
    blue   : grad_blue,
    magenta: grad_magenta,
    green  : grad_green
  };

  /**
   * Returns chart data for a single data key.
   *
   * @param key
   * @param dataset
   * @returns {*}
   */
  function getData(key, dataset) {

    if (typeof dataset == 'undefined') {
      dataset = data_growth;
    }

    if (key == null) {
      return dataset;
    }

    // Workaround. Translate num index to key.
    if (key == 0) key = 'pm';
    if (key == 1) key = 'design';
    if (key == 2) key = 'engineering';
    if (key == 3) key = 'closed';

    return dataset[key];
  }

  /**
   * Returns "Month name, year" Chart labels.
   * Note: length >= 2 are padded with empty entries.
   *
   * @todo: This may needs to be synced with getData().
   * @todo: Optional padding of array?
   *
   * @param start     Starting month. 1 = January. (Default: current)
   * @param length    How many months to return. (Default: 1)
   * @returns {Array}
   */
  function getLabels(start, length) {
    var date = new Date();
    var ret = [];

    start = typeof start !== 'undefined' ? start : 0;
    length = typeof length !== 'undefined' ? length : 1;

    if (start == 0) {
      start = date.getMonth();
    }
    else {
      start = start -1; // Make start zero based if a value was given.
    }

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    for (var i = 0; i < length; i++) {
      ret[i] = months[start] + ', ' + date.getFullYear();
      start++;

      if (start == 12) {
        start = 0;
        date.setFullYear(date.getFullYear() + 1);
      }
    }

    if (length > 1) {
      ret.push('');
      ret.unshift('');
    }

    return ret;
  }


  /**
   * Chart Data.
   *
   * Note that borderColor is used for the tooltip marker.
   */
  var data = {
    labels: getLabels(0, 7),
    datasets: [{
      label          : 'PM',
      backgroundColor: gradients.blue,
      borderColor    : colors.blue,
      borderWidth    : 0.001,
      data           : getData('pm'),
      fill           : 'origin',
      pointRadius    : 0
    }, {
      label          : 'Design',
      backgroundColor: gradients.magenta,
      borderColor    : colors.magenta,
      borderWidth    : 0.001,
      data           : getData('design'),
      fill           : '-1',
      pointRadius    : 0
    }, {
      label          : 'Engineering',
      backgroundColor: gradients.green,
      borderColor    : colors.green,
      borderWidth    : 0.001,
      data           : getData('engineering'),
      fill           : '-1',
      pointRadius    : 0
    }, {
      label          : 'Closed / Lost',
      backgroundColor: colors.dark,
      borderColor    : colors.grey,
      borderWidth    : 0.001,
      data           : getData('closed'),
      fill           : '-1',
      pointRadius    : 0
    }]
  };

  /**
   * Custom tooltip.
   */
  var customTooltip = function(tooltip) {
    var tooltipEl = document.getElementById('chartjs-tooltip');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.innerHTML = '';
      this._chart.canvas.parentNode.appendChild(tooltipEl);
    }

    // Hide if no tooltip or title is empty.
    if (tooltip.opacity === 0 || tooltip.title == '') {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltip.yAlign) {
      tooltipEl.classList.add(tooltip.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }

    function getBody(bodyItem) {
      return bodyItem.lines;
    }

    // Set Text
    if (tooltip.body) {
      var titleLines     = tooltip.title || [];
      var bodyLines      = tooltip.body.map(getBody);
      var chart_total    = 0;
      var pos_y          = 0;
      var el_header_data = '';
      var message        = '';

      bodyLines.forEach(function(body, i) {
        pos_y              = tooltip.dataPoints[i].y - 9;
        var value          = tooltip.dataPoints[i].yLabel;
        var value_percent  = calc_percentage(value, team_capacity) + '%';
        var lbl_colors     = tooltip.labelColors[i];
        var el_marker_data = '';

        // @todo: Temporary set actual value.
        var display_value = value;

        // Calculate values.
        chart_total = chart_total + value;

        // Create the point markers.
        var marker_style = 'background:' + lbl_colors.borderColor + ';';
        var marker = '<span class="key" style="' + marker_style + '"></span>';

        el_marker_data += marker + body;
        el_marker_data += '<span class="value">' + display_value + '</span>';

        // Create marker div if it does not exist.
        var el_marker = tooltipEl.querySelector('.point.point-' + i);
        if (!el_marker) {
          el_marker = document.createElement('div');
          el_marker.classList.add('point', 'point-' + i);
          tooltipEl.appendChild(el_marker);
        }
        el_marker.innerHTML = el_marker_data;
        el_marker.style.top = pos_y + 'px';
      });

      // Set messages depending on chart values (Chris L changed "chart_total > team_capacity"  .
      if (chart_total = team_capacity) {
        message = 'Hire Now';
        message = '<div class="content">' + message + '</div>';
      }
  

      // Build header contents.
      titleLines.forEach(function(title) {
        el_header_data += '<div class="message"></div>';
        el_header_data += '<h2>Projected Growth</h2>';
        el_header_data += '<div class="label">' + title + '</div>';
      });

      // Create header if it does not exists.
      var el_header = tooltipEl.querySelector('.header');
      if (!el_header) {
        el_header = document.createElement('div');
        el_header.classList.add("header");
        tooltipEl.appendChild(el_header);
      }
      el_header.innerHTML = el_header_data;
      // Place header relatively to the last line on chart.
      el_header.style.top = (pos_y -80) + 'px';


      var el_message = el_header.querySelector('.message');
      el_message.innerHTML = message;
      el_message.style.opacity = 1;
    }

    // Over "overlay" with the mix-blend-mode.
    var el_overlay = tooltipEl.querySelector('.overlay');
    if (!el_overlay) {
      el_overlay = document.createElement('div');
      el_overlay.classList.add("overlay");
      tooltipEl.appendChild(el_overlay);
    }

    // Positioning.
    //var positionY = this._chart.canvas.offsetTop;
    var positionX = this._chart.canvas.offsetLeft;

    // Display, position, and set styles for font.
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    //tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.top = 0 + 'px';       // 33px with legends.
    tooltipEl.style.bottom = 28 + 'px';   // Makes room for xAxes labels.
    //tooltipEl.style.bottom = 11 + 'px'; // No xAxes labels.
  };

  /**
   * Shadows.
   */
  let draw = Chart.controllers.line.prototype.draw;
  Chart.controllers.line = Chart.controllers.line.extend({
    draw: function() {
      draw.apply(this, arguments);
      let ctx   = this.chart.chart.ctx;
      let _fill = ctx.fill;
      ctx.fill  = function() {
        ctx.save();
        ctx.shadowColor   = transparentize(colors.black, .5);
        ctx.shadowBlur    = 25;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = -5;
        _fill.apply(this, arguments);
        ctx.restore();
      }
    }
  });

  /**
   * Chart options.
   */
  var options = {
    responsive: true,
    maintainAspectRatio: false,
    defaultFontColor: colors.white,
    spanGaps: false,
    //elements: {
    //  line: {
    //    tension: 0.000001
    //  }
    //},
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
      mode: 'index',
      position: 'nearest',
      intersect: false,
      custom: customTooltip,
      callbacks: {
        label: function(tooltipItem, data) {
          return data.datasets[tooltipItem.datasetIndex].label || '';
        }
      }
    },
    scales: {
      yAxes: [{
        stacked: true,
        gridLines: {
          display: false,     // Hide horizontal lines.
          drawBorder: false
        },
        ticks: {
          display: false,     // Hide labels.
          // @todo: This will probably need to be adjusted along with the data.
          min: 0,
          max: chart_max,
          //stepSize: 10
        }
      }],
      xAxes: [{
        ticks: {
          //display: false,
          labelOffset: 90
        }
      }]
    },
    animation: {
      duration: 3000 // general animation time
    },
    annotation: {
      annotations: [{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: team_capacity,
        borderColor: colors.white,
        borderWidth: 1,
        label: {
          enabled: true,
          content: 'Team Capacity',
          backgroundColor: colors.yellow,
          fontColor: colors.black,
          cornerRadius: 20,
          xPadding: 10,
          yPadding: 7,
          position: 'left',
          xAdjust: 100
        }
      }, {
        type: 'box',
        xScaleID: 'x-axis-0',
        yScaleID: 'y-axis-0',
        backgroundColor: transparentize(colors.white, 0.9),
        borderColor: transparentize(colors.white, 0.9),
        borderWidth: 1, // Not possible to set to zero.
        xMax: getLabels(0).toString()
      }]
    }
  };

  /**
   * Chart instance.
   */
  window.onload = function() {

    var chart = new Chart(ctx, {
      type   : 'line',
      data   : data,
      options: options
    });

    /**
     * Chart switch.
     */
    $('.chart-toggle-wrapper').find('.switch').click(function() {
      $(this).parent().toggleClass('on off');
      var new_dataset;

      if ($(this).parent().is('.on')) {
        new_dataset = data_growth;
      }
      else {
        new_dataset = data_maintaining;
      }

      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data = getData(i, new_dataset);
      });

      chart.update();
    });

  };
}

/**
 * First visit.
 */
var cinit = getCookie('carv-init');
var ref = document.referrer;
var is_landing = $('.section-6').find('a.text-link-nav-style').length;

if (is_landing) {
  if (ref.indexOf('//app.carv.io') != -1 || ref.indexOf('//blog.carv.io') != -1) {
    cinit = true;
  }

  if (cinit == null) {
    $('body').css('overflow', 'hidden').find('.nav-menu-wrap').hide();

    $('.section-6').find('a.text-link-nav-style').click(function() {
      $('body').removeAttr('style').find('.nav-menu-wrap').show();
      setCookie('carv-init', true, 365);
    });
  }
  else {
    $('body').find('.nav-menu-wrap').show();
  }
}
else {
  $('body').find('.nav-menu-wrap').show();
}
