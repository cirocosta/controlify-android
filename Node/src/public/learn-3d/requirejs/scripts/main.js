require.config({
  paths: {
    vendor: '../../'
  }
});

require(['helper/utils'], function (utils) {
  console.log(utils);
});
