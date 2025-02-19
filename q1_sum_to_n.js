//Recursive solution
var sum_to_n_a = function (n) {
  //Base case
  if (n == 0) {
    return 0;
  }

  return n + sum_to_n_a(n - 1);
};

//Iterative solution
var sum_to_n_b = function (n) {
  let count = 0;
  for (let i = 1; i <= n; i++) {
    count += i;
  }
  return count;
};

//Arithmetic series
var sum_to_n_c = function (n) {
  return (n / 2) * (n + 1);
};
