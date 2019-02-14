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
var chart_max = 200;

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
    20, 20, 24, 17, 10, 15, 20, 25, 25, 18, 20, 23
  ],
  design: [
    50, 45, 35, 25, 25, 35, 50, 55, 65, 52, 58, 65
  ],
  engineering: [
    40, 50, 45, 30, 25, 20, 35, 50, 60, 38, 43, 47
  ],
  closed: [
    0, 5, 6, 8, 10, 20, 25, 40, 60, 75, 78, 100
  ]
};

var data_maintaining = {
  pm: [
    15, 20, 20, 18, 15, 16, 14, 14, 15, 15, 15, 15
  ],
  design: [
    42, 44, 42, 36, 38, 40, 39, 36, 34, 33, 31, 29
  ],
  engineering: [
    30, 26, 30, 26, 22, 20, 20, 25, 28, 29, 26, 23
  ],
  closed: [
    42, 44, 42, 42, 44, 49, 51, 54, 58, 66, 70, 66
  ]
};


/**
 * Legacy var.
 * Avoid braking the old script.
 */
var chart_data = data_growth;
