/**
 * Created by jonnyLee on 2016/9/6.
 */
Ext.define('Admin.overrides.form.field.ComboBox', {
    override: 'Ext.form.field.ComboBox',

    /**
     * 添加这个方法， viewModel 就可以 bind: {queryMode: '{mode}'}
     * @param mode
     */
    setQueryMode: function (mode) {
        this.queryMode = mode;
    }
});