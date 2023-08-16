// 参考 https://stylelint.io/user-guide/rules
// 修改任何规则都要在 MR 进行说明

module.exports = {
  root: true,
  extends: [
    'stylelint-config-recess-order',
    'stylelint-config-standard-scss'
  ],
  rules: {
    // 允许出现空白文件，规则会被覆盖
    'no-empty-source': null,
    'no-descending-specificity': null,
    'rule-empty-line-before': null,
    'selector-pseudo-element-no-unknown': null,
  },
  ignoreFiles: ['node_modules'],
};
