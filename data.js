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
var team_capacity = 40;

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
    15, 20, 20, 18, 15, 16, 14, 14, 16, 18, 20, 23
  ],
  design: [
    42, 44, 39, 30, 27, 28, 32, 40, 46, 52, 58, 65
  ],
  engineering: [
    30, 26, 30, 26, 22, 20, 20, 25, 32, 38, 43, 47
  ],
  closed: [
    42, 44, 39, 34, 33, 36, 44, 52, 60, 66, 78, 100
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
