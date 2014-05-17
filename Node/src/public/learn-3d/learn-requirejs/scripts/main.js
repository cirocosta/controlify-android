require.config({
  paths: {
    vendor: '../../'
  }
});

require(['helper/utils', 'helper/utils2'], function (utils, utils2) {
  console.log(utils);
  console.log(utils2);
});
