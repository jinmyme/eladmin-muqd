export default {
  data() {
    let checkNumber = (rule, value, callback) =>{
      var num2 = /^([1-9][\d]{0,}|0)(\.\d{1,2})?$/
      value = '' + value
      if (isNaN(value) || !(num2.test(value))) {
        callback(new Error('必须为数字值'));
      } else {
        callback();
      }
    }
    return {
      enptyVerify: {
        'required':{required: true, message: '不能为空', trigger: ['blur', 'change']},
        'phone':{type: 'phone', message: '必须为数字值', trigger: ['blur', 'change']},
        'email':{type: 'email', message: '必须为邮箱', trigger: ['blur', 'change']},
        'url':{type: 'url', message: '必须为链接', trigger: ['blur', 'change']},
        'number':{validator:checkNumber, trigger: ['blur', 'change']},
        'date':{type: 'date', message: '必须为日期格式', trigger: ['blur', 'change']},
        'identity':{type: 'identity', message: '必须为正确身份证', trigger: ['blur', 'change']},
      },
      lay_verify:[],
    }
  },
  filters: {
    enptyInput: function(value,enptyVerify,lay_verify) {
      if(value){
        let str=value.split('|');
        let verify=[];
        str.forEach(function (item,index) {
          verify.push(enptyVerify[lay_verify[item]])
        })
        return verify
      }else{
        return []
      }
    }
  },
  methods: {
  }
}
