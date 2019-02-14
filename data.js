/**
 * Data for Charts.js.
 *
 * Note that this is a work in progress.
 * Data format will likely need to be changed.
 */

/**
 * Team capacity.
 * Horizontal line indicating team capacity.
 */
var team_capacity = 100;

/**
 * Max value (the "roof") of the chart.
 * @todo: This may need to be dynamic later on.
 */
var chart_max = 300;

/**
 * Data format:
 * {fixed data key} = [
 *   {comma separated list of monthly data points, starting with current month -1}
 * ]
 *
 * Notes:
 * - Current data display starts with current month minus 1 with its label hidden,
 *   then current month as the first "visible" x-value.
 * - All data points may not be shown. Currently only the first 6 points are used.
 */
var data_growth = {
         //> Current month, first visible.
  pm: [ //                      //> Not visible, but affects curve.
    20, 20, 25, 25, 20, 20, 25, 30, 45, 18, 20, 23
  ],
  design: [
    50, 40, 35, 25, 35, 40, 55, 60, 85, 52, 58, 65
  ],
  engineering: [
    40, 45, 45, 35, 30, 25, 40, 55, 75, 38, 43, 47
  ],
  closed: [
    0, 5, 6, 8, 10, 20, 25, 40, 60, 90, 78, 100
  ]
};

var data_maintaining = {
  pm: [
    20, 20, 25, 20, 20, 30, 25, 20, 25, 18, 20, 23
  ],
  design: [
    50, 40, 35, 20, 15, 40, 35, 40, 30, 52, 58, 65
  ],
  engineering: [
    40, 45, 45, 35, 30, 20, 40, 50, 55, 38, 43, 47
  ],
  closed: [
    0, 5, 6, 8, 10, 20, 30, 40, 55, 50, 78, 100
  ]
};


/**
 * Legacy var.
 * Avoid braking the old script.
 */
var chart_data = data_growth;
