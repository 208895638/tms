var reg = {
  trim(s) {  // 清除前后空格
    return s.replace(/(^s*)|(s*$)/g, '')
  },
  testAccount: function(val) {  // 测试手机号
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    return myreg.test(val)
  },
  testPassword: function(val) { //测试密码
    var myreg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
    return myreg.test(val)
  },
  testIdCard: function(val) { // 测试身份证号
    var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return myreg.test(val)
  },
  testQQ: function(val) { // 测试qq
    var myreg = /^[1-9][0-9]{3,10}$/
    return myreg.test(val)
  },
  testZFBAccount: function(val) {  //测试支付宝账号
    var myreg = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/
    return myreg.test(val)
  },
  testName: function(val) { // 测试中文
    var myreg = /^[\u4E00-\u9FA5]{2,4}$/
    return myreg.test(val)
  },
  testNumber(val) { 
    var myreg = /\D|^0/g
    return myreg.test(val)
  },
  testMoney(val) { // 检测输入的金额
    var myreg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
    return myreg.test(val)
  }
}
export default reg
