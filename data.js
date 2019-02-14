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
         //> Current month, first visible. (After)
 pm: [ //                      //> After Carv.
    20, 20, 25, 25, 20, 20, 25, 30, 35, 18, 20, 23
  ],
  design: [
    50, 40, 35, 25, 35, 45, 55, 60, 80, 52, 58, 65
  ],
  engineering: [
    40, 45, 45, 35, 30, 30, 40, 55, 70, 38, 43, 47
  ],
  closed: [
    0, 5, 6, 8, 10, 20, 25, 40, 60, 90, 78, 100
    ]
};

var data_maintaining = {
pm: [ //                      //> Before Carv.
       30, 20, 10, 30, 20, 20, 25, 30, 25, 18, 20, 23
     ],
     design: [
       55, 40, 35, 25, 25, 45, 55, 60, 30, 52, 58, 65
     ],
     engineering: [
       45, 30, 20, 65, 55, 10, 45, 20, 20, 38, 43, 47
     ],
     closed: [
       25, 10, 0, 45, 0, 45, 30, 10, 10, 90, 78, 100
     ]
};


/**
 * Legacy var.
 * Avoid braking the old script.
 */
var chart_data = data_growth;
