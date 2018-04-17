// custom Vtype for vtype:'time'
Ext.define('Override.form.field.VTypes', {
    override: 'Ext.form.field.VTypes',


    /**************     密码  *****************/

    // vtype validation function
    password: function(value) {
        return this.passwordRe.test(value);
    },
    // RegExp for the value to be tested against within the validation function
    passwordRe: /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{6,18}$/,
    // vtype Text property: The error text to display when the validation function returns false
    passwordText: '密码必须包含大小写字母以及数字，且长度在6-18之间',


    /**************    密码一致  *****************/

    repetition: function (val, field) {     //返回true，则验证通过，否则验证失败
        if (field.repetition) {               //如果表单有使用repetition配置，repetition配置是一个JSON对象，该对象提供了一个名为target的字段，该字段指定了需要进行比较的另一个组件naem。
            var cmp = field.up().getForm().findField(field.repetition.target);   //通过name的字段查找组件
            if (Ext.isEmpty(cmp)) {      //如果组件（表单）不存在，提示错误
                console.error('发生异常错误，指定的组件未找到');
                return false;
            }
            if (val == cmp.getValue()) {  //取得目标组件（表单）的值，与宿主表单的值进行比较。
                return true;
            } else {
                return false;
            }
        }
    },
    repetitionText: '两次密码不一致'
});