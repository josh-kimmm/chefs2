module.exports = {
  /**
   * Generate k random numbers without replacement from range [start, end] inclusively.
   * @param start range start
   * @param end range end
   * @param k number of random numbers to be generated (at most)
   * @returns {any[]} random numbers
   */
  random: function (start, end, k) {
    var n = end - start + 1;
    var array = new Array(n);
    for (var i = 0; i < n; i++) {
      array[i] = i + start;
    }
    if (n <= k) {
      return array;
    }
    var randomNums = new Array(k);
    var numPickedCnt = 0;
    while (numPickedCnt < k) {
      var index = Math.floor(Math.random() * n);
      randomNums[numPickedCnt] = array[index];

      // swap array[index] with array[n-1]
      var tmp = array[index];
      array[index] = array[n-1];
      array[n-1] = tmp;
      n--;
      numPickedCnt++;
    }
    return randomNums;
  }
};
